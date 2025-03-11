import axios from 'axios';

export async function refreshToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return null;

  try {
    const response = await axios.post('http://localhost:3838/api/v1/auth/refresh-token', { token: refreshToken });
    const { accessToken, refreshToken: newRefreshToken } = response.data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', newRefreshToken);
    return accessToken;
  } catch (error) {
    console.error('Failed to refresh token', error);
    return null;
  }
}