import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ThemeColorKey = "azul" | "verde";

export const THEME_COLORS: Record<ThemeColorKey, { primary: string; background: string }> = {
  azul: { primary: "#297AB8", background: "#DDF0FF" },
  verde: { primary: "#3F9142", background: "#E4F7E1" },
};

export const FONT_SIZES = [
  { label: "Normal", value: 16 },
  { label: "Grande", value: 20 },
  
];

interface ThemeContextData {
  themeColor: ThemeColorKey;
  fontSize: number;
  setThemeColor: (color: ThemeColorKey) => void;
  setFontSize: (size: number) => void;
  loading: boolean;
}

const ThemeContext = createContext<ThemeContextData | undefined>(undefined);

const STORAGE_KEY_COLOR = "@ABCapy:themeColor";
const STORAGE_KEY_FONT = "@ABCapy:fontSize";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeColor, setThemeColorState] = useState<ThemeColorKey>("azul");
  const [fontSize, setFontSizeState] = useState<number>(16);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPreferences() {
      try {
        const [savedColor, savedFont] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEY_COLOR),
          AsyncStorage.getItem(STORAGE_KEY_FONT),
        ]);

        if (savedColor === "azul" || savedColor === "verde") {
          setThemeColorState(savedColor);
        }
        if (savedFont) {
          setFontSizeState(Number(savedFont));
        }
      } catch (e) {
        console.error("Erro ao carregar preferências de tema:", e);
      } finally {
        setLoading(false);
      }
    }

    loadPreferences();
  }, []);

  const setThemeColor = async (color: ThemeColorKey) => {
    setThemeColorState(color);
    await AsyncStorage.setItem(STORAGE_KEY_COLOR, color);
  };

  const setFontSize = async (size: number) => {
    setFontSizeState(size);
    await AsyncStorage.setItem(STORAGE_KEY_FONT, String(size));
  };

  return (
    <ThemeContext.Provider value={{ themeColor, fontSize, setThemeColor, setFontSize, loading }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme precisa ser usado dentro de um ThemeProvider");
  }
  return context;
}