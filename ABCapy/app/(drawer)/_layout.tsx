import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Drawer from "expo-router/drawer";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
 

  return (

    <SafeAreaProvider>
        
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        
        screenOptions={{
          headerShown: false, 
        
        }}
      />
    </GestureHandlerRootView>



    </SafeAreaProvider>
  );
}