import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  TouchableWithoutFeedback,
  Pressable,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pencil, Lock, X, User } from "lucide-react-native";
import { useNavigation, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Image} from "expo-image";
import api from "@/src/utils/api";
import Footer from "@/src/components/Footer/Footer";

const StarsNumber: number = 3;

const UserName: string = "Paçoco";
const TotalStars: number = 39;

const CATEGORIES = [
  { id: "1", name: "nenhum" },
  { id: "2", name: "chapéus", icon: "🎩" },
  { id: "3", name: "óculos", icon: "👓" },
];

const ITEMS = [
  { id: "101", image: require("../../src/assets/characterAccessories/FarmerCapy.png") },
  { id: "102", image: require("../../src/assets/characterAccessories/FarmerCapy.png") },
  { id: "103", image: require("../../src/assets/characterAccessories/PirateCapy.png") },
  { id: "104", image: require("../../src/assets/characterAccessories/FarmerCapy.png") },
];

const NAME_SUGGESTIONS = ["Capy", "Paçoca", "Pipoca"];

interface ActionModalProps {
  handleClose: () => void;
}

<<<<<<< HEAD
function ActionModalContent({ handleClose }: ActionModalProps) {
=======
// Modal de Personalização de Acessórios
function ActionModalContent({ handleClose, userName }: ActionModalProps) {
>>>>>>> 59ca9df17321e0cdad1e2e7cfa1107ec45fc13f5
  const [selectedCategory, setSelectedCategory] = useState("2");
  const [selectedItem, setSelectedItem] = useState("103");

  return (
    <View style={modalStyle.modalContainer}>
      <TouchableOpacity style={modalStyle.closeButton} onPress={handleClose} hitSlop={10}>
        <X size={20} color="#000" />
      </TouchableOpacity>

      <Text style={modalStyle.title}>Acessórios</Text>
      <Text style={modalStyle.subtitle}>Personalize {UserName}</Text>

     
      <View style={modalStyle.categoriesRow}>
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <TouchableOpacity
              key={cat.id}
              onPress={() => setSelectedCategory(cat.id)}
              style={[
                modalStyle.categoryTab,
                isSelected && modalStyle.categoryTabSelected,
              ]}
            >
              {cat.icon && <Text style={{ marginRight: 6 }}>{cat.icon}</Text>}
              <Text
                style={[
                  modalStyle.categoryText,
                  isSelected && modalStyle.categoryTextSelected,
                ]}
              >
                {cat.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Grid de Itens */}
      <View style={modalStyle.gridContainer}>
        {ITEMS.map((item) => {
          const isSelected = selectedItem === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => setSelectedItem(item.id)}
              style={[
                modalStyle.itemCard,
                isSelected && modalStyle.itemCardSelected,
              ]}
            >
              <Image source={item.image} style={modalStyle.itemImage} />
            </TouchableOpacity>
          );
        })}
      </View>

      
      <View style={modalStyle.footer}>
        <View style={modalStyle.starPriceRow}>
          <Image
            source={require("../../src/assets/images/solar_star-bold-duotone.png")}
            style={{ width: 22, height: 22 }}
          />
          <Text style={modalStyle.starPriceText}>50</Text>
        </View>

        <TouchableOpacity
          style={modalStyle.confirmButton}
          onPress={handleClose}
        >
          <Text style={modalStyle.confirmButtonText}>confirmar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Modal de Alteração de Nome
interface EditNameModalProps {
  visible: boolean;
  currentName: string;
  onClose: () => void;
  onSave: (newName: string) => Promise<void>;
}

function EditNameModal({ visible, currentName, onClose, onSave }: EditNameModalProps) {
  const [name, setName] = useState(currentName);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    setName(currentName);
  }, [currentName, visible]);

  async function handleConfirm() {
    if (!name.trim()) {
      Alert.alert("Atenção", "O nome não pode ficar em branco.");
      return;
    }

    try {
      setLoading(true);
      await onSave(name.trim());
      onClose();
    } catch (err: any) {
      Alert.alert(
        "Erro",
        err.response?.data?.message || "Não foi possível atualizar o nome."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={nameModalStyle.overlay}>
          <TouchableWithoutFeedback>
            <View style={nameModalStyle.sheetContainer}>
             
              {/* Ícone circular do perfil */}
              <View style={nameModalStyle.userAvatarBadge}>
                <User size={22} color="#297AB8" />
              </View>

              {/* Cabeçalho */}
              <Text style={nameModalStyle.title}>mudar dados</Text>
              <Text style={nameModalStyle.subtitle}>como voce quer ser chamado?</Text>

              {/* Campo de Texto */}
              <View style={nameModalStyle.inputShadowWrapper}>
                <TextInput
                  style={nameModalStyle.input}
                  value={name}
                  onChangeText={(val) => {
                    if (val.length <= 20) setName(val);
                  }}
                  placeholder="Nome"
                  placeholderTextColor="#A0AEC0"
                  maxLength={20}
                  textAlign="center"
                />
              </View>

              <Text style={nameModalStyle.counterText}>{name.length}/20 caracteres</Text>

              {/* Sugestões de nomes */}
              <Text style={nameModalStyle.suggestionsLabel}>Sujestões</Text>
              <View style={nameModalStyle.suggestionsRow}>
                {NAME_SUGGESTIONS.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={nameModalStyle.suggestionChip}
                    onPress={() => setName(item)}
                    activeOpacity={0.7}
                  >
                    <Text style={nameModalStyle.suggestionText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Botões de Ação */}
              <View style={nameModalStyle.actionsRow}>
                <TouchableOpacity
                  style={[nameModalStyle.actionBtn, nameModalStyle.cancelBtn]}
                  onPress={onClose}
                  disabled={loading}
                >
                  <Text style={nameModalStyle.actionBtnText}>cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[nameModalStyle.actionBtn, nameModalStyle.confirmBtn]}
                  onPress={handleConfirm}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="#297AB8" />
                  ) : (
                    <Text style={nameModalStyle.actionBtnText}>confirmar</Text>
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

export default function UserPage() {
  const [visibleModal, setVisibleModal] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [childData, setChildData] = useState<{
    childName: string;
    capy: string;
    stars: number;
  } | null>(null);

  const navigation = useNavigation<any>();

  useFocusEffect(
    React.useCallback(() => {
      async function carregar() {
        try {
          const cache = await AsyncStorage.getItem("@ABCapy:child");
          if (cache) {
            setChildData(JSON.parse(cache));
          }

          const res = await api.get("/children/me");
          if (res.data) {
            setChildData(res.data);
            await AsyncStorage.setItem("@ABCapy:child", JSON.stringify(res.data));
          }
        } catch (e) {
          console.error("Erro ao carregar dados do usuário:", e);
        }
      }

      carregar();
    }, [])
  );

  // Requisição PUT integrada com o back-end e atualização do cache local
  const handleUpdateName = async (newName: string) => {
    const res = await api.put("/children/me", { childName: newName });
    const updatedData = { ...childData, ...res.data, childName: newName };

    setChildData(updatedData);
    await AsyncStorage.setItem("@ABCapy:child", JSON.stringify(updatedData));
  };

  const openMenu = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} style={style.safeArea}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={style.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Superior reorganizado */}
        <View style={style.topBar}>
          <Pressable onPress={openMenu} hitSlop={10}>
            <Image source={menu} style={style.menuIcon} />
          </Pressable>

          <View style={style.headerStars}>
            <Image
              source={require("../../src/assets/images/solar_star-bold-duotone.png")}
              style={{ width: 24, height: 24 }}
            />
            <Text style={style.starsText}>{StarsNumber}</Text>
          </View>
        </View>

        <Text style={style.pageTitle}>Perfil</Text>

        {/* Tocar no avatar abre a troca de acessórios */}
        <TouchableOpacity
          style={style.avatarWrapper}
          activeOpacity={0.8}
          onPress={() => setVisibleModal(true)}
        >
          <View style={style.circuloOpcao}>
            <Image
              source={require("../../src/assets/charactersImages/StudentCapy.png")}
              style={style.imagemPersonagem}
            />
          </View>

          <View style={style.badgeAcessorio}>
            <Image
              source={require("../../src/assets/characterAccessories/FarmerCapy.png")}
              style={{ width: 52, height: 32, resizeMode: "cover" }}
            />
          </View>
        </TouchableOpacity>

        {/* Linha do nome com lápis abrindo o modal de edição */}
        <View style={style.userNameRow}>
          <Text style={style.userNameText}>{UserName}</Text>
          <TouchableOpacity
            style={style.editButton}
            onPress={() => setIsEditingName(true)}
            hitSlop={10}
          >
            <Pencil color="#0284C7" size={16} />
          </TouchableOpacity>
        </View>

        
        <View style={style.progressSection}>
          <View style={style.progressBarContainer}>
            <View style={style.progressBarBackground}>
              <View
                style={[
                  style.progressBarFill,
                  { width: `${Math.min(displayStars * 10, 100)}%` },
                ]}
              />
            </View>

            <View style={style.rewardContainer}>
              <Image
                source={require("../../src/assets/characterAccessories/PirateCapy.png")}
                style={style.rewardImageLocked}
              />
              <Lock size={18} color="#000" style={style.lockIcon} />
            </View>
          </View>

          <Text style={style.progressSubtext}>
            Faltam 3 estrelas para a próxima recompensa
          </Text>
        </View>

       
        <View style={style.gamesCard}>
          <View style={style.gamesTitleBadge}>
            <Text style={style.gamesTitleText}>jogos mais jogados</Text>
          </View>

          <View style={style.podiumPlaceholder} />

          <View style={style.statsRow}>
            <View style={style.statBox}>
              <Text style={style.statNumber}>27</Text>
              <Text style={style.statLabel}>total de jogadas</Text>
            </View>

            <View style={style.statBox}>
              <Text style={style.statNumber}>3</Text>
              <Text style={style.statLabel}>Jogos experimentados</Text>
            </View>
          </View>
        </View>

        {/* Estrelas Conquistadas */}
        <View style={style.finalCard}>
          <Text style={style.finalCardLabel}>estrelas conquistadas</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Text style={style.finalCardValue}>{TotalStars}</Text>
            <Image
              source={require("../../src/assets/images/solar_star-bold-duotone.png")}
              style={{ width: 22, height: 22 }}
            />
          </View>
        </View>
      </ScrollView>

      {/* Modal de Acessórios */}
      <Modal
        visible={visibleModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setVisibleModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setVisibleModal(false)}>
          <View style={style.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={{ width: "100%" }}>
                <ActionModalContent
                  handleClose={() => setVisibleModal(false)}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Modal de Edição de Nome */}
      <EditNameModal
        visible={isEditingName}
        currentName={displayName}
        onClose={() => setIsEditingName(false)}
        onSave={handleUpdateName}
      />

      <Footer />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    alignItems: "center",
  },
  topBar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  menuIcon: {
    width: 31,
    height: 31,
    resizeMode: "contain",
  },
  headerStars: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  starsText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  pageTitle: {
    color: "#297AB8",
    fontSize: 34,
    fontFamily:"Poppins_700Bold",
    marginTop: 10,
    marginBottom: 20,
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: 15,
  },
  circuloOpcao: {
    width: 140,
    height: 140,
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 70,
    backgroundColor: "#FFF",
    borderColor: "#93CCF7",
    borderWidth: 8,
    overflow: "hidden",
  },
  imagemPersonagem: {
    width: "85%",
    height: "85%",
    resizeMode: "contain",
  },
  badgeAcessorio: {
    position: "absolute",
    bottom: 0,
    right: 4,
    backgroundColor: "#93CCF733",
    width: 46,
    height: 46,
    borderRadius: 100,
    justifyContent: "flex-end",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFF",
    overflow: "hidden",
  },
  userNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 25,
  },
  userNameText: {
    fontSize: 24,
    fontFamily:"Poppins_600SemiBold",
    color: "#297AB8",
  },
  editButton: {
    backgroundColor: "#C5E5FF",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  progressSection: {
    width: "100%",
    alignItems: "center",
    marginBottom: 25,
  },
  progressBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    width: "100%",
    justifyContent: "center",
  },
  progressBarBackground: {
    height: 20,
    flex: 1,
    maxWidth: 240,
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#297AB8",
    borderRadius: 10,
  },
  rewardContainer: {
    width: 60,
    height: 60,
    borderRadius: 35,
    backgroundColor: "#DDF0FF",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  rewardImageLocked: {
    width: 42,
    height: 42,
    resizeMode: "cover",
    tintColor: "rgba(80, 80, 80, 0.6)",
  },
  lockIcon: {
    position: "absolute",
  },
  progressSubtext: {
    color: "#297AB8",
    fontSize: 12,
    marginTop: 8,
    textAlign: "center",
  },
  gamesCard: {
    width: "100%",
    backgroundColor: "#E3F2FD",
    borderRadius: 24,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  gamesTitleBadge: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
  },
  gamesTitleText: {
    color: "#297AB8",
    fontSize: 16,
    fontFamily:"Poppins_700Bold"
  },
  podiumPlaceholder: {
    height: 120,
    width: "100%",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
  },
  statBox: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontFamily:"Poppins_700Bold",
    color: "#000",
  },
  statLabel: {
    fontSize: 12,
    color: "#297AB8",
    fontFamily:"Poppins_400Regular",
    marginTop: 2,
  },
  finalCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  finalCardLabel: {
    fontSize: 14,
    color: "#297AB8",
    marginBottom: 4,
    fontFamily:"Poppins_400Regular"
  },
  finalCardValue: {
    fontSize: 20,
    fontFamily:"Poppins_700Bold",
    color: "#000",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
  },
});

const modalStyle = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 34,
    alignItems: "center",
    width: "100%",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    right: 20,
    top: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#297AB8",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 13,
    color: "#A0AEC0",
    marginBottom: 20,
  },
  categoriesRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
    width: "100%",
    justifyContent: "center",
  },
  categoryTab: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
  },
  categoryTabSelected: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#93CCF7",
  },
  categoryText: {
    fontSize: 14,
    color: "#4A5568",
    fontWeight: "500",
  },
  categoryTextSelected: {
    color: "#297AB8",
    fontWeight: "bold",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    width: "100%",
    gap: 12,
    marginBottom: 16,
  },
  itemCard: {
    width: "22%",
    aspectRatio: 1,
    backgroundColor: "#F3F4F6",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  itemCardSelected: {
    backgroundColor: "#EBF8FF",
    borderColor: "#93CCF7",
  },
  itemImage: {
    width: "75%",
    height: "75%",
    resizeMode: "contain",
  },
  footer: {
    width: "100%",
    alignItems: "center",
    marginTop: 8,
  },
  starPriceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 16,
  },
  starPriceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  confirmButton: {
    backgroundColor: "#F3F4F6",
    width: "60%",
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#297AB8",
    fontWeight: "bold",
    fontSize: 16,
  },
});
<<<<<<< HEAD
=======

const nameModalStyle = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    justifyContent: "flex-end",
  },
  sheetContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    borderWidth: 4,
    borderBottomWidth: 0,
    borderColor: "#88D48E",
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
    alignItems: "center",
    position: "relative",
  },
  leavesContainer: {
    position: "absolute",
    top: -18,
    left: 45,
    right: 45,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leafIcon: {
    fontSize: 22,
    transform: [{ rotate: "15deg" }],
  },
  userAvatarBadge: {
    position: "absolute",
    left: 20,
    top: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#E2F2FD",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#297AB8",
    textAlign: "center",
    marginTop: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#99A8B6",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 16,
  },
  inputShadowWrapper: {
    width: "80%",
    borderRadius: 16,
    backgroundColor: "#F2F6F8",
    borderWidth: 1.5,
    borderColor: "#B4DBF7",
    shadowColor: "#297AB8",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 5,
    elevation: 3,
  },
  input: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#607485",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  counterText: {
    fontSize: 13,
    color: "#99A8B6",
    marginTop: 6,
    marginBottom: 26,
  },
  suggestionsLabel: {
    alignSelf: "flex-start",
    fontSize: 15,
    fontWeight: "bold",
    color: "#297AB8",
    marginBottom: 10,
  },
  suggestionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 12,
    marginBottom: 32,
  },
  suggestionChip: {
    flex: 1,
    height: 46,
    backgroundColor: "#F2F6F8",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  suggestionText: {
    color: "#4A5568",
    fontSize: 14,
    fontWeight: "600",
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
    paddingVertical: 12,
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
  confirmBtn: {},
  actionBtnText: {
    color: "#297AB8",
    fontSize: 16,
    fontWeight: "bold",
  },
});
>>>>>>> 59ca9df17321e0cdad1e2e7cfa1107ec45fc13f5
