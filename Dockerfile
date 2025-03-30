FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock / pnpm-lock.yaml / bun.lockb)
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* bun.lockb* ./

# Install dependencies
RUN npm install --frozen-lockfile --prefer-offline

# Copy the rest of the application
COPY . .

# Build the Next.js application
RUN npm run build

# Use a lightweight Node.js runtime for production
FROM node:18-alpine AS runner

WORKDIR /app

# Copy the built files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Install only production dependencies
RUN npm install --production --frozen-lockfile --prefer-offline

# Set the environment variable for production
ENV NODE_ENV=production

# Expose the default Next.js port
EXPOSE 3000

# Command to run the Next.js application
CMD ["npm", "run", "start"]