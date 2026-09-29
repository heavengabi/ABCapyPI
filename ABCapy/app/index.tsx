import React, { useEffect, useRef } from "react";
import { Button } from "@/src/components/ui/Button";
import { View, StyleSheet, ImageBackground, Animated, Easing } from "react-native";
import LogoImage from "../src/assets/images/logo-abcapy.svg";
import BackgroundImage from "../src/assets/images/bg-login.png";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function Login() {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const buttonsOpacity = useRef(new Animated.Value(0)).current;
  const buttonsTranslateY = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.sequence([
      // 1) Logo: fade + zoom
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 6,
          useNativeDriver: true,
        }),
      ]),
      // 2) Botões: fade + sobem
      Animated.parallel([
        Animated.timing(buttonsOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(buttonsTranslateY, {
          toValue: 0,
          duration: 500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground style={{ flex: 1 }} source={BackgroundImage}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Animated.View
            style={{
              opacity: logoOpacity,
              transform: [{ scale: logoScale }],
            }}
          >
            <LogoImage style={styles.logo} width={300} height={300} />
          </Animated.View>

          <Animated.View
            style={{
              flexDirection: "column",
              gap: 20,
              marginTop: 120,
              opacity: buttonsOpacity,
              transform: [{ translateY: buttonsTranslateY }],
            }}
          >
            <Button title="CADASTRAR" onPress={() => router.push("/Register")} />
            <Button
              title="LOGIN"
              onPress={() => router.push("/SignUpParent")}
              style={{ backgroundColor: "white", borderColor: "#93CCF7", borderWidth: 3 }}
              textStyle={{ color: "#93CCF7" }}
            />
          </Animated.View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logo: {
    marginBottom: 20,
  },
});