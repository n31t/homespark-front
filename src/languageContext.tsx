"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import i18next from "@/i18n";

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Устанавливаем начальное значение языка из localStorage или "Ru" по умолчанию
  const [language, setLanguageState] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("lang") || "Ru";
    }
    return "Ru"; // Значение по умолчанию для серверного рендеринга
  });

  // Синхронизация с localStorage и i18next при изменении языка
  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    i18next.changeLanguage(lang); // Синхронизация с i18next
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", lang); // Сохранение в localStorage
    }
  };

  // Устанавливаем язык в i18next при первой загрузке
  useEffect(() => {
    i18next.changeLanguage(language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};