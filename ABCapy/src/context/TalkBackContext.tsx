import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import * as Speech from "expo-speech";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TALKBACK_STORAGE_KEY = "@ABCapy:talkback_enabled";

interface TalkBackContextData {
  enabled: boolean;
  toggleTalkBack: (value?: boolean) => void;
  speak: (text: string) => void;
  speakForce: (text: string) => void;
  stop: () => void;
}

const TalkBackContext = createContext<TalkBackContextData>({} as TalkBackContextData);

export const TalkBackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [enabled, setEnabled] = useState(false);
  const enabledRef = useRef(enabled);

  useEffect(() => {
    (async () => {
      try {
        const savedState = await AsyncStorage.getItem(TALKBACK_STORAGE_KEY);
        if (savedState !== null) {
          const parsed = JSON.parse(savedState);
          setEnabled(parsed);
          enabledRef.current = parsed;
        }
      } catch (e) {}
    })();
  }, []);

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  const toggleTalkBack = async (value?: boolean) => {
    const nextState = typeof value === "boolean" ? value : !enabled;
    setEnabled(nextState);
    enabledRef.current = nextState;

    if (!nextState) {
      Speech.stop();
    }

    try {
      await AsyncStorage.setItem(TALKBACK_STORAGE_KEY, JSON.stringify(nextState));
    } catch (e) {}
  };

  const stop = () => {
    Speech.stop();
  };

  const speak = (text: string) => {
    if (!enabledRef.current || !text) return;
    Speech.stop(); // Interrompe qualquer fala anterior antes de iniciar a nova
    Speech.speak(text, { language: "pt-BR" });
  };

  const speakForce = (text: string) => {
    if (!text) return;
    Speech.stop();
    Speech.speak(text, { language: "pt-BR" });
  };

  return (
    <TalkBackContext.Provider value={{ enabled, toggleTalkBack, speak, speakForce, stop }}>
      {children}
    </TalkBackContext.Provider>
  );
};

export const useTalkBack = () => useContext(TalkBackContext);