"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { IntlProvider } from "react-intl";

import en from "../../../public/locales/en.json";
import es from "../../../public/locales/es.json";

type SupportedLanguage = "en" | "es";

const messages = {
  en,
  es,
};

const flagMap: Record<SupportedLanguage, string> = {
  en: "🇺🇸",
  es: "🇪🇸",
};

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  flag: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>("en");

  // Load saved language from localStorage on mount
  useEffect(() => {
    const storedLang = localStorage.getItem("lang") as SupportedLanguage;
    if (storedLang && messages[storedLang]) {
      setLanguageState(storedLang);
    }
  }, []);

  const setLanguage = (lang: SupportedLanguage) => {
    localStorage.setItem("lang", lang);
    setLanguageState(lang);
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    flag: flagMap[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      <IntlProvider locale={language} messages={messages[language]}>
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
