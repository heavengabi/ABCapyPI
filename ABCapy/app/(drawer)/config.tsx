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
  Volume2,
  ChevronLeft,
  Trash2,
  Lock,
  Eye,
  EyeOff,
  LogOut,
} from "lucide-react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "@/src/utils/api";
import { useTalkBack } from "@/src/context/TalkBackContext";

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
  const { speak } = useTalkBack();

  async function handleConfirm() {
    if (!password.trim()) {
      const msg = "Por favor, digite sua senha para confirmar a exclusão.";
      speak(msg);
      Alert.alert("Atenção", msg);
      return;
    }

    try {
      setLoading(true);
      await onConfirmDelete(password);
      onClose();
    } catch (err: any) {
      const msg = err.response?.data?.message || "Senha incorreta ou erro ao deletar a conta.";
      speak(msg);
      Alert.alert("Erro", msg);
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
                  accessibilityLabel="Campo de senha para confirmação"
                />
                <TouchableOpacity
                  onPress={() => {
                    setShowPassword(!showPassword);
                    speak(showPassword ? "Senha oculta" : "Senha visível");
                  }}
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

              <View style={modalStyle.actionsRow}>
                <TouchableOpacity
                  style={[modalStyle.actionBtn, modalStyle.cancelBtn]}
                  onPress={() => {
                    speak("Exclusão cancelada");
                    onClose();
                  }}
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
  const { enabled, toggleTalkBack, speak } = useTalkBack();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  // Sair da conta
  const handleLogout = async () => {
    try {
      speak("Saindo da conta");
    } catch (e) {
      // Ignora erro de fala para garantir o logout
    }

    await AsyncStorage.multiRemove([
      "@ABCapy:token",
      "@ABCapy:user",
      "@ABCapy:child",
    ]);
    router.replace("/SignUpParent");
  };

  // Excluir conta
  const handleDeleteAccount = async (password: string) => {
    await api.delete("/users/me", {
      data: { password },
    });

    await AsyncStorage.multiRemove([
      "@ABCapy:token",
      "@ABCapy:user",
      "@ABCapy:child",
    ]);

    speak("Sua conta foi excluída com sucesso");
    Alert.alert("Conta Excluída", "Sua conta foi excluída com sucesso.");
    router.replace("/");
  };

  return (
    <SafeAreaView style={style.safeArea}>
      <ScrollView
        style={style.scrollViewBase}
        contentContainerStyle={style.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Cabeçalho */}
        <View style={style.headerContainer}>
          <TouchableOpacity
            style={style.backButton}
            onPress={() => {
              speak("Voltar");
              router.replace("/homePage");
            }}
            accessibilityLabel="Botão voltar"
          >
            <ChevronLeft size={28} color="#000" />
          </TouchableOpacity>
          <View style={style.headerTitleContainer}>
            <Text style={style.title}>Configurações</Text>
          </View>
        </View>

        {/* Card: TalkBack / Leitor de Tela */}
        <View style={style.cardContainer}>
          <View style={style.cardHeader}>
            <View style={style.iconBadge}>
              <Volume2 size={18} color="#2B7BB9" />
            </View>
            <View>
              <Text style={style.cardTitle}>TalkBack (Leitor de Tela)</Text>
              <Text style={style.cardSubtitle}>Ouvir elementos ao tocar na tela</Text>
            </View>
          </View>

          <View style={style.switchRow}>
            <Text style={style.switchText}>
              {enabled ? "Ativado" : "Desativado"}
            </Text>
            <Switch
              value={enabled}
              onValueChange={(val) => {
                toggleTalkBack(val);
                if (val) {
                  speak("TalkBack ativado");
                }
              }}
              trackColor={{ false: "#B2DBFC", true: "#0284C7" }}
              thumbColor="#FFFFFF"
              accessibilityLabel="Ativar ou desativar TalkBack"
            />
          </View>
        </View>

        <TouchableOpacity
          style={style.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <LogOut size={18} color="#0284C7" style={{ marginRight: 8 }} />
          <Text style={style.logoutText}>sair da conta</Text>
        </TouchableOpacity>

        {/* Botão Deletar Conta */}
        <TouchableOpacity
          style={style.deleteAccountButton}
          onPress={() => {
            speak("Excluir conta");
            setIsDeleteModalVisible(true);
          }}
          activeOpacity={0.8}
        >
          <Trash2 size={18} color="#EF4444" style={{ marginRight: 8 }} />
          <Text style={style.deleteAccountText}>deletar conta</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal de Confirmação */}
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
  logoutButton: {
    width: "100%",
    maxWidth: 340,
    height: 52,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    flexDirection: "row",
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