import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Palette,
  Type,
  Volume2,
  ChevronLeft,
  Check,
} from "lucide-react-native";
import { router } from "expo-router";

const colors = [
  { color: "#8ECBFC", name: "azul" },
  { color: "#FF8E89", name: "Rosa" },
  { color: "#9FE178", name: "verde" },
  { color: "#FFE14D", name: "amarelo" },
];

const fontSizes = [
  { label: "Normal", value: 16 },
  { label: "Grande", value: 20 },
  { label: "Muito grande", value: 24 },
];

export default function ConfigPage() {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedFont, setSelectedFont] = useState(0);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);

  return (
    <SafeAreaView style={style.safeArea}>
      <ScrollView
        style={style.scrollViewBase}
        contentContainerStyle={style.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        
        <View style={style.headerContainer}>
          <TouchableOpacity
            style={style.backButton}
            onPress={() => router.push("/(drawer)/homePage")}
          >
            <ChevronLeft size={28} color="#000" />
          </TouchableOpacity>
          <View style={style.headerTitleContainer}>
            <Text style={style.title}>Configurações</Text>
            <Text style={style.subtitleHeader}>cores de fundo</Text>
          </View>
        </View>

      
        <View style={style.cardContainer}>
          <View style={style.cardHeader}>
            <View style={style.iconBadge}>
              <Palette size={18} color="#2B7BB9" />
            </View>
            <View>
              <Text style={style.cardTitle}>Tema de cores</Text>
              <Text style={style.cardSubtitle}>customize sua experiência</Text>
            </View>
          </View>

          <View style={style.gridColors}>
            {colors.map((item, index) => {
              const isSelected = selectedColor === index;
              return (
                <TouchableOpacity
                  key={index}
                  style={style.cardColor}
                  onPress={() => setSelectedColor(index)}
                  activeOpacity={0.8}
                >
                  <View style={[style.colorCircle, { backgroundColor: item.color }]} />
                  <Text style={style.colorText}>{item.name}</Text>
                  
                  {isSelected && (
                    <View style={style.checkBadge}>
                      <Check size={12} color="#000" />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        
        <View style={style.cardContainer}>
          <View style={style.cardHeader}>
            <View style={style.iconBadge}>
              <Type size={18} color="#2B7BB9" />
            </View>
            <View>
              <Text style={style.cardTitle}>Tamanho da Fonte</Text>
              <Text style={style.cardSubtitle}>ajuste o tamanho do texto</Text>
            </View>
          </View>

          <View style={{ gap: 10, width: "100%", marginTop: 10 }}>
            {fontSizes.map((item, index) => {
              const isSelected = selectedFont === index;
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    style.fontOptionButton,
                    isSelected && style.fontOptionSelected,
                  ]}
                  onPress={() => setSelectedFont(index)}
                >
                  <Text style={style.fontOptionText}>{item.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        
        <View style={style.cardContainer}>
          <View style={style.cardHeader}>
            <View style={style.iconBadge}>
              <Volume2 size={18} color="#2B7BB9" />
            </View>
            <View>
              <Text style={style.cardTitle}>Narração de voz</Text>
              <Text style={style.cardSubtitle}>Ouvir o que está na tela</Text>
            </View>
          </View>

          <View style={style.switchRow}>
            <Text style={style.switchText}>
              {isVoiceEnabled ? "Ativado" : "Desativado"}
            </Text>
            <Switch
              value={isVoiceEnabled}
              onValueChange={setIsVoiceEnabled}
              trackColor={{ false: "#B2DBFC", true: "#0284C7" }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        
        <View style={style.cardContainer}>
          <Text style={[style.cardTitle, { textAlign: "center", marginBottom: 12 }]}>
            prévia do texto
          </Text>
          <Text style={style.previewText}>
            Olha! esse texto é um exemplo para ver as mudanças.
          </Text>
        </View>


        <TouchableOpacity style={style.logoutButton}>
          <Text style={style.logoutText}>sair da conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#DDF0FF",
  },
  scrollViewBase: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: "center",
    gap: 16,
  },
  
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 0,
    backgroundColor: "#FFFFFF",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitleContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontFamily: "Poppins_700Bold",
    color: "#000000",
  },
  subtitleHeader: {
    fontSize: 14,
    color: "#8AA2B8",
    fontFamily:"Poppins_600SemiBold"
  },
  
  cardContainer: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: "#C5E5FF",
    borderRadius: 24,
    padding: 16,
    
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#A8D8FF",
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
    color: "#000000",
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#6B859E",
    fontFamily:"Poppins_400Regular"
  },
  
  gridColors: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  cardColor: {
    backgroundColor: "#FFFFFF",
    width: "47%",
    height: 90,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  colorCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginBottom: 6,
  },
  colorText: {
    fontSize: 13,
    color: "#333",
    fontWeight: "500",
  },
  checkBadge: {
    position: "absolute",
    right: 8,
    bottom: 8,
    backgroundColor: "#A3E635",
    borderRadius: 10,
    padding: 3,
  },

  fontOptionButton: {
    backgroundColor: "#BCDFFF",
    height: 48,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  fontOptionSelected: {
    backgroundColor: "#A3D3FF",
    borderWidth: 1,
    borderColor: "#0284C7",
  },
  fontOptionText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1E293B",
  },
 
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#A1D4FF",
    height: 48,
    borderRadius: 24,
    paddingHorizontal: 16,
  },
  switchText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1E293B",
  },

  previewText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0284C7",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  
  logoutButton: {
    width: "100%",
    maxWidth: 340,
    height: 52,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0284C7",
  },
});