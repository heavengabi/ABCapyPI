import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Palette,
  Type,
  Volume2,
  ChevronLeft,
  Check,
  Trash2,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "@/src/utils/api";

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

interface DeleteAccountModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirmDelete: (password: string) => Promise<void>;
}

function DeleteAccountModal({
  visible,
  onClose,
  onConfirmDelete,
}: DeleteAccountModalProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (!visible) {
      setPassword("");
      setShowPassword(false);
    }
  }, [visible]);

  async function handleConfirm() {
    if (!password.trim()) {
      Alert.alert("Atenção", "Por favor, digite sua senha para confirmar a exclusão.");
      return;
    }

    try {
      setLoading(true);
      await onConfirmDelete(password);
      onClose();
    } catch (err: any) {
      Alert.alert(
        "Erro",
        err.response?.data?.message || "Senha incorreta ou erro ao deletar a conta."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={modalStyle.overlay}>
          <TouchableWithoutFeedback>
            <View style={modalStyle.sheetContainer}>
              

              

           
              <Text style={modalStyle.title}>excluir conta</Text>
              <Text style={modalStyle.subtitle}>
                esta ação é permanente! digite sua senha para confirmar:
              </Text>

              {/* Input com ícone de cadeado e alternância de visualização */}
              <View style={modalStyle.inputShadowWrapper}>
                <Lock size={18} color="#94A3B8" style={{ marginLeft: 12 }} />
                <TextInput
                  style={modalStyle.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Digite sua senha"
                  placeholderTextColor="#A0AEC0"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={{ padding: 10 }}
                  hitSlop={10}
                >
                  {showPassword ? (
                    <EyeOff size={18} color="#94A3B8" />
                  ) : (
                    <Eye size={18} color="#94A3B8" />
                  )}
                </TouchableOpacity>
              </View>

              {/* Botões de Ação */}
              <View style={modalStyle.actionsRow}>
                <TouchableOpacity
                  style={[modalStyle.actionBtn, modalStyle.cancelBtn]}
                  onPress={onClose}
                  disabled={loading}
                >
                  <Text style={modalStyle.cancelBtnText}>cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[modalStyle.actionBtn, modalStyle.deleteBtn]}
                  onPress={handleConfirm}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="#EF4444" />
                  ) : (
                    <Text style={modalStyle.deleteBtnText}>excluir</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export default function ConfigPage() {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedFont, setSelectedFont] = useState(0);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  // Requisição de exclusão de conta
  const handleDeleteAccount = async (password: string) => {
    // Rota comum para exclusão com envio de senha no corpo
    await api.delete("/users/me", {
      data: { password },
    });

    // Limpa tokens e dados em cache
    await AsyncStorage.multiRemove([
      "@ABCapy:token",
      "@ABCapy:user",
      "@ABCapy:child",
    ]);

    Alert.alert("Conta Excluída", "Sua conta foi excluída com sucesso.");
    router.replace("/"); // Redireciona para a tela inicial / login
  };

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

        {/* Card: Tema de Cores */}
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

        {/* Card: Tamanho da Fonte */}
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

        {/* Card: Narração de Voz */}
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

        {/* Card: Prévia */}
        <View style={style.cardContainer}>
          <Text style={[style.cardTitle, { textAlign: "center", marginBottom: 12 }]}>
            prévia do texto
          </Text>
          <Text style={style.previewText}>
            Olha! esse texto é um exemplo para ver as mudanças.
          </Text>
        </View>

        {/* Botão Sair da Conta */}
        <TouchableOpacity style={style.logoutButton}>
          <Text style={style.logoutText}>sair da conta</Text>
        </TouchableOpacity>

        {/* Botão Deletar Conta */}
        <TouchableOpacity
          style={style.deleteAccountButton}
          onPress={() => setIsDeleteModalVisible(true)}
          activeOpacity={0.8}
        >
          <Trash2 size={18} color="#EF4444" style={{ marginRight: 8 }} />
          <Text style={style.deleteAccountText}>deletar conta</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal Deslizante de Confirmação */}
      <DeleteAccountModal
        visible={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
        onConfirmDelete={handleDeleteAccount}
      />
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
    fontFamily: "Poppins_600SemiBold",
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
    fontFamily: "Poppins_400Regular",
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

  deleteAccountButton: {
    width: "100%",
    maxWidth: 340,
    height: 52,
    backgroundColor: "#FFF5F5",
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#FECACA",
    shadowColor: "#EF4444",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
  },
  deleteAccountText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#EF4444",
  },
});

const modalStyle = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    justifyContent: "flex-end",
  },
  sheetContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    
  
    paddingHorizontal: 24,
    paddingTop: 26,
    paddingBottom: 40,
    alignItems: "center",
    position: "relative",
  },
  iconBadge: {
    position: "absolute",
    left: 20,
    top: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FEE2E2",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#EF4444",
    textAlign: "center",
    marginTop: 6,
  },
  subtitle: {
    fontSize: 13,
    color: "#99A8B6",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 20,
    paddingHorizontal: 24,
  },
  inputShadowWrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: "#F8FAFC",
    borderWidth: 1.5,
    borderColor: "#CBD5E1",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 24,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#334155",
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 16,
  },
  actionBtn: {
    flex: 1,
    backgroundColor: "#F3F7FA",
    borderRadius: 18,
    paddingVertical: 13,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5ECF0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cancelBtn: {},
  cancelBtnText: {
    color: "#297AB8",
    fontSize: 16,
    fontWeight: "bold",
  },
  deleteBtn: {
    backgroundColor: "#FEF2F2",
    borderColor: "#FECACA",
  },
  deleteBtnText: {
    color: "#EF4444",
    fontSize: 16,
    fontWeight: "bold",
  },
});