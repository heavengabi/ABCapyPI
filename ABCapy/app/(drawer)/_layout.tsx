import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Drawer from "expo-router/drawer";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer
          screenOptions={{
            headerShown: false,
          }}
        >
          {/* Telas que APARECEM na sidebar */}
          <Drawer.Screen
            name="faq"
            options={{
              drawerLabel: "FAQ",
              title: "FAQ",
            }}
          />
          <Drawer.Screen
            name="config"
            options={{
              drawerLabel: "Configurações",
              title: "Configurações",
            }}
          />

          {/* Telas OCULTAS da sidebar */}
          <Drawer.Screen
            name="homePage"
            options={{
              drawerItemStyle: { display: "none" },
            }}
          />
          <Drawer.Screen
            name="caa"
            options={{
              drawerItemStyle: { display: "none" },
            }}
          />
          <Drawer.Screen
            name="User"
            options={{
              drawerItemStyle: { display: "none" },
            }}
          />
          <Drawer.Screen
            name="Stories"
            options={{
              drawerItemStyle: { display: "none" },
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}