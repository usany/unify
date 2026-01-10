'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'ko' | 'en';

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children, initialLanguage }: { children: ReactNode; initialLanguage: Language }) {
    const [language, setLanguageState] = useState<Language>(initialLanguage);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        document.cookie = `language=${lang}; path=/; max-age=31536000`; // 1 year
    };

    const toggleLanguage = () => {
        const newLang = language === 'ko' ? 'en' : 'ko';
        setLanguage(newLang);
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
