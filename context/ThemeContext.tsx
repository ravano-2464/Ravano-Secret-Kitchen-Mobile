import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme as useSystemColorScheme } from 'react-native';

export type ThemePreference = 'system' | 'light' | 'dark';

interface ThemeContextType {
    themePreference: ThemePreference;
    setThemePreference: (pref: ThemePreference) => void;
    colorScheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType>({
    themePreference: 'system',
    setThemePreference: () => {},
    colorScheme: 'light',
});

const THEME_STORAGE_KEY = 'theme_preference';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const systemColorScheme = useSystemColorScheme();
    const [themePreference, setThemePreferenceState] = useState<ThemePreference>('system');

    useEffect(() => {
        AsyncStorage.getItem(THEME_STORAGE_KEY).then((value) => {
            if (value === 'light' || value === 'dark' || value === 'system') {
                setThemePreferenceState(value);
            }
        });
    }, []);

    const setThemePreference = (pref: ThemePreference) => {
        setThemePreferenceState(pref);
        AsyncStorage.setItem(THEME_STORAGE_KEY, pref);
    };

    const colorScheme: 'light' | 'dark' =
        themePreference === 'system'
            ? (systemColorScheme ?? 'light')
            : themePreference;

    return (
        <ThemeContext.Provider value={{ themePreference, setThemePreference, colorScheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
