import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pencil, Lock, X, User } from "lucide-react-native";
import { useNavigation, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import api from "../../src/utils/api";
import Footer from "@/src/components/Footer/Footer";

/* ------------------------------ Assets/Dados ------------------------------ */

const CACHE_KEY = "@ABCapy:child";
const NAME_SUGGESTIONS = ["Capy", "Paçoca", "Pipoca"];

const menuIcon = require("../../src/assets/images/homeImages/menu.png");
const starIcon = require("../../src/assets/images/solar_star-bold-duotone.png");

// Ícones dos Acessórios (miniaturas da loja)
const pirateImg = require("../../src/assets/characterAccessories/PirateCapy.png");
const farmerImg = require("../../src/assets/characterAccessories/FarmerCapy.png");

// Imagens base dos personagens
const adventureImg = require("../../src/assets/charactersImages/AdventureCapy.png");
const studentImg = require("../../src/assets/charactersImages/StudentCapy.png");

// Capivara com Acessórios (1.png = Pirata | 2.png = Fazendeiro)
const adventurePirateImg = require("../../src/assets/characterAccessories/capyUsingAcessories/1.png");
const adventureFarmerImg = require("../../src/assets/characterAccessories/capyUsingAcessories/2.png");

const CATEGORIES = [
  { id: "none", name: "nenhum" },
  { id: "hat", name: "chapéus", icon: "🎩" },
  { id: "glasses", name: "óculos", icon: "👓" },
];

// Mapeamento com os IDs correspondentes do banco de dados (1 = Fazendeiro, 2 = Pirata)
const ACCESSORIES = [
  { id: "farmer", backendId: 1, category: "hat", price: 0, thumb: farmerImg },
  { id: "pirate", backendId: 2, category: "hat", price: 50, thumb: pirateImg },
];

// Mapeamento correto das imagens da Capivara
const CAPY_IMAGES: Record<string, Record<string, any>> = {
  aventureira: {
    base: adventureImg,
    farmer: adventureFarmerImg, // 2.png
    pirate: adventurePirateImg, // 1.png
  },
  sabida: {
    base: studentImg,
    farmer: adventureFarmerImg,
    pirate: adventurePirateImg,
  },
};

const getCapyImage = (capy?: string, accessory?: string | null) => {
  const set = CAPY_IMAGES[capy ?? ""] ?? CAPY_IMAGES.aventureira;
  return (accessory && set[accessory]) || set.base;
};

interface Child {
  childName: string;
  capy: string;
  stars: number;
  accessory?: string | null;
}

interface InventoryItem {
  id: number; // ChildAccessory.id
  equipped: boolean;
  accessory: {
    id: number;
    name: string;
    type?: string;
    price: number;
  };
}

/* ----------------------------- Modal de Acessórios ----------------------------- */

interface AccessoryModalProps {
  visible: boolean;
  userName: string;
  userStars: number;
  currentAccessory: string | null;
  inventory: InventoryItem[];
  onClose: () => void;
  onRefreshInventory: () => Promise<void>;
  onUpdateChildState: () => Promise<void>;
}

function AccessoryModal({
  visible,
  userName,
  userStars,
  currentAccessory,
  inventory,
  onClose,
  onRefreshInventory,
  onUpdateChildState,
}: AccessoryModalProps) {
  const [category, setCategory] = useState("hat");
  const [selectedId, setSelectedId] = useState<string | null>(currentAccessory);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) setSelectedId(currentAccessory);
  }, [visible, currentAccessory]);

  const items = useMemo(
    () => ACCESSORIES.filter((a) => a.category === category),
    [category],
  );
  const selectedAccessory = ACCESSORIES.find((a) => a.id === selectedId);
  const price = selectedAccessory?.price ?? 0;

  // Procura se o item selecionado já pertence ao inventário do usuário
  const purchasedItem = useMemo(() => {
    if (!selectedAccessory) return null;
    return inventory.find(
      (inv) => inv.accessory.id === selectedAccessory.backendId,
    );
  }, [inventory, selectedAccessory]);

  // Encontra qual item do inventário está equipado no momento
  const currentlyEquippedInventoryItem = useMemo(() => {
    return inventory.find((inv) => inv.equipped);
  }, [inventory]);

  const isPurchased = !!purchasedItem || price === 0;

  const pickCategory = (id: string) => {
    setCategory(id);
    if (id === "none") setSelectedId(null);
  };

  const confirm = async () => {
    try {
      setLoading(true);

      // CASO 1: Usuário escolheu "Nenhum" (Desequipar o item atual no backend)
      if (!selectedId) {
        if (currentlyEquippedInventoryItem) {
          await api.patch(
            `/inventory/${currentlyEquippedInventoryItem.id}/equip`,
          );
        }
        await onRefreshInventory();
        await onUpdateChildState();
        onClose();
        return;
      }

      // CASO 2: O item já foi comprado (Equipar/Alterar)
      if (purchasedItem) {
        if (!purchasedItem.equipped) {
          await api.patch(`/inventory/${purchasedItem.id}/equip`);
        }
      } else {
        // CASO 3: O item precisa ser comprado
        if (userStars < price) {
          Alert.alert(
            "Estrelas Insuficientes",
            `Você precisa de ${price} estrelas para comprar este item.`,
          );
          return;
        }

        if (selectedAccessory) {
          await api.post("/inventory/buy", {
            accessoryId: selectedAccessory.backendId,
          });
        }
      }

      await onRefreshInventory();
      await onUpdateChildState();
      onClose();
    } catch (err: any) {
      console.error("Erro ao processar acessório:", err.response?.data);
      Alert.alert(
        "Erro no Servidor",
        err.response?.data?.message ||
          "Não foi possível realizar a ação no momento.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={accStyle.overlay} onPress={onClose}>
        <Pressable style={accStyle.container}>
          <TouchableOpacity
            style={accStyle.close}
            onPress={onClose}
            hitSlop={10}
          >
            <X size={20} color="#000" />
          </TouchableOpacity>

          <Text style={accStyle.title}>Acessórios</Text>
          <Text style={accStyle.subtitle}>Personalize {userName}</Text>

          <View style={accStyle.categories}>
            {CATEGORIES.map((c) => (
              <TouchableOpacity
                key={c.id}
                onPress={() => pickCategory(c.id)}
                style={[
                  accStyle.tab,
                  category === c.id && accStyle.tabSelected,
                ]}
              >
                <Text
                  style={[
                    accStyle.tabText,
                    category === c.id && accStyle.tabTextSelected,
                  ]}
                >
                  {c.icon ? `${c.icon} ` : ""}
                  {c.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={accStyle.grid}>
            {items.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => setSelectedId(item.id)}
                style={[
                  accStyle.card,
                  selectedId === item.id && accStyle.cardSelected,
                ]}
              >
                <Image
                  source={item.thumb}
                  style={accStyle.cardImage}
                  contentFit="contain"
                />
              </TouchableOpacity>
            ))}
          </View>

          {selectedId != null && !isPurchased && (
            <View style={accStyle.price}>
              <Image source={starIcon} style={accStyle.starIcon} />
              <Text style={accStyle.priceText}>{price}</Text>
            </View>
          )}

          <TouchableOpacity
            style={accStyle.confirm}
            onPress={confirm}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#297AB8" />
            ) : (
              <Text style={accStyle.confirmText}>
                {selectedId === null
                  ? "confirmar"
                  : isPurchased
                    ? "equipar"
                    : "comprar"}
              </Text>
            )}
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

/* ------------------------------- Modal de Nome ------------------------------- */

interface EditNameModalProps {
  visible: boolean;
  currentName: string;
  onClose: () => void;
  onSave: (newName: string) => Promise<void>;
}

function EditNameModal({
  visible,
  currentName,
  onClose,
  onSave,
}: EditNameModalProps) {
  const [name, setName] = useState(currentName);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName(currentName);
  }, [currentName, visible]);

  const confirm = async () => {
    const trimmed = name.trim();
    if (!trimmed) {
      Alert.alert("Atenção", "O nome não pode ficar em branco.");
      return;
    }
    try {
      setLoading(true);
      await onSave(trimmed);
      onClose();
    } catch (err: any) {
      Alert.alert(
        "Erro",
        err.response?.data?.message || "Não foi possível atualizar o nome.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={nameStyle.overlay} onPress={onClose}>
        <Pressable style={nameStyle.sheet}>
          <View style={nameStyle.avatarBadge}>
            <User size={22} color="#297AB8" />
          </View>

          <Text style={nameStyle.title}>mudar dados</Text>
          <Text style={nameStyle.subtitle}>como você quer ser chamado?</Text>

          <View style={nameStyle.inputWrapper}>
            <TextInput
              style={nameStyle.input}
              value={name}
              onChangeText={setName}
              placeholder="Nome"
              placeholderTextColor="#A0AEC0"
              maxLength={20}
              textAlign="center"
            />
          </View>
          <Text style={nameStyle.counter}>{name.length}/20 caracteres</Text>

          <Text style={nameStyle.suggestionsLabel}>Sugestões</Text>
          <View style={nameStyle.suggestionsRow}>
            {NAME_SUGGESTIONS.map((item) => (
              <TouchableOpacity
                key={item}
                style={nameStyle.chip}
                onPress={() => setName(item)}
                activeOpacity={0.7}
              >
                <Text style={nameStyle.chipText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={nameStyle.actions}>
            <TouchableOpacity
              style={nameStyle.actionBtn}
              onPress={onClose}
              disabled={loading}
            >
              <Text style={nameStyle.actionText}>cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={nameStyle.actionBtn}
              onPress={confirm}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#297AB8" />
              ) : (
                <Text style={nameStyle.actionText}>confirmar</Text>
              )}
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

/* ---------------------------------- Página ---------------------------------- */

export default function UserPage() {
  const [child, setChild] = useState<Child | null>(null);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [showAccessories, setShowAccessories] = useState(false);
  const [showName, setShowName] = useState(false);
  const navigation = useNavigation<any>();

  // Busca inventário
  const fetchInventory = async () => {
    try {
      const { data } = await api.get("/inventory/me");
      if (data) setInventory(data);
    } catch (e) {
      console.error("Erro ao carregar inventário:", e);
    }
  };

  // Busca perfil atualizado
  const fetchChildProfile = async () => {
    try {
      const { data } = await api.get("/children/me");
      if (data) {
        setChild(data);
        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(data));
      }
    } catch (e) {
      console.error("Erro ao carregar perfil da criança:", e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const cache = await AsyncStorage.getItem(CACHE_KEY);
        if (cache) setChild(JSON.parse(cache));

        await fetchChildProfile();
        await fetchInventory();
      })();
    }, []),
  );

  const updateChild = async (patch: Partial<Child>) => {
    const { data } = await api.put("/children/me", patch);
    const next = { ...child, ...data, ...patch } as Child;
    setChild(next);
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(next));
  };

  // Identifica o acessório equipado
  const equippedAccessory = useMemo(() => {
    const equippedItem = inventory.find((item) => item.equipped);
    if (!equippedItem) return null;
    const match = ACCESSORIES.find(
      (a) => a.backendId === equippedItem.accessory.id,
    );
    return match?.id ?? null;
  }, [inventory]);

  const name = child?.childName || "Amiguinho";
  const stars = child?.stars ?? 0;
  const badge = ACCESSORIES.find((a) => a.id === equippedAccessory)?.thumb;

  return (
    <SafeAreaView edges={["top", "bottom"]} style={style.safeArea}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={style.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={style.topBar}>
          <Pressable
            onPress={() => navigation.dispatch({ type: "OPEN_DRAWER" })}
            hitSlop={10}
          >
            <Image
              source={menuIcon}
              style={style.menuIcon}
              contentFit="contain"
            />
          </Pressable>

          <View style={style.headerStars}>
            <Image source={starIcon} style={{ width: 24, height: 24 }} />
            <Text style={style.starsText}>{stars}</Text>
          </View>
        </View>

        <Text style={style.pageTitle}>Perfil</Text>

        <TouchableOpacity
          style={style.avatarWrapper}
          activeOpacity={0.8}
          onPress={() => setShowAccessories(true)}
        >
          <View style={style.circuloOpcao}>
            <Image
              source={getCapyImage(child?.capy, equippedAccessory)}
              style={style.imagemPersonagem}
              contentFit="contain"
            />
          </View>

          {badge && (
            <View style={style.badgeAcessorio}>
              <Image
                source={badge}
                style={{ width: 52, height: 32 }}
                contentFit="cover"
              />
            </View>
          )}
        </TouchableOpacity>

        <View style={style.userNameRow}>
          <Text style={style.userNameText}>{name}</Text>
          <TouchableOpacity
            style={style.editButton}
            onPress={() => setShowName(true)}
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
                  { width: `${Math.min(stars * 10, 100)}%` },
                ]}
              />
            </View>

            <View style={style.rewardContainer}>
              <Image
                source={pirateImg}
                style={style.rewardImageLocked}
                contentFit="cover"
              />
              <Lock size={18} color="#000" style={style.lockIcon} />
            </View>
          </View>

          <Text style={style.progressSubtext}>
            Faltam {10 - (stars % 10)} estrelas para a próxima recompensa
          </Text>
        </View>

        <View style={style.gamesCard}>
          <View style={style.gamesTitleBadge}>
            <Text style={style.gamesTitleText}>jogos mais jogados</Text>
          </View>

          <View style={style.podiumPlaceholder} />

          <View style={style.statsRow}>
            <View style={style.statBox}>
              <Text style={style.statNumber}>0</Text>
              <Text style={style.statLabel}>total de jogadas</Text>
            </View>

            <View style={style.statBox}>
              <Text style={style.statNumber}>0</Text>
              <Text style={style.statLabel}>Jogos experimentados</Text>
            </View>
          </View>
        </View>

        <View style={style.finalCard}>
          <Text style={style.finalCardLabel}>estrelas conquistadas</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Text style={style.finalCardValue}>{stars}</Text>
            <Image source={starIcon} style={{ width: 22, height: 22 }} />
          </View>
        </View>
      </ScrollView>

      <AccessoryModal
        visible={showAccessories}
        userName={name}
        userStars={stars}
        currentAccessory={equippedAccessory}
        inventory={inventory}
        onClose={() => setShowAccessories(false)}
        onRefreshInventory={fetchInventory}
        onUpdateChildState={fetchChildProfile}
      />

      <EditNameModal
        visible={showName}
        currentName={name}
        onClose={() => setShowName(false)}
        onSave={(childName) => updateChild({ childName })}
      />

      <Footer />
    </SafeAreaView>
  );
}

/* --------------------------------- Estilos --------------------------------- */

const style = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
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
  menuIcon: { width: 31, height: 31 },
  headerStars: { flexDirection: "row", alignItems: "center", gap: 4 },
  starsText: { fontSize: 18, fontWeight: "bold", color: "#000" },
  pageTitle: {
    color: "#297AB8",
    fontSize: 34,
    fontFamily: "Poppins_700Bold",
    marginTop: 10,
    marginBottom: 20,
  },
  avatarWrapper: { position: "relative", marginBottom: 15 },
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
  imagemPersonagem: { width: "85%", height: "85%" },
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
    fontFamily: "Poppins_600SemiBold",
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
  progressSection: { width: "100%", alignItems: "center", marginBottom: 25 },
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
    tintColor: "rgba(80, 80, 80, 0.6)",
  },
  lockIcon: { position: "absolute" },
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
    fontFamily: "Poppins_700Bold",
  },
  podiumPlaceholder: { height: 120, width: "100%" },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
  },
  statBox: { alignItems: "center" },
  statNumber: { fontSize: 18, fontFamily: "Poppins_700Bold", color: "#000" },
  statLabel: {
    fontSize: 12,
    color: "#297AB8",
    fontFamily: "Poppins_400Regular",
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
    fontFamily: "Poppins_400Regular",
  },
  finalCardValue: {
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    color: "#000",
  },
});

const accStyle = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 34,
    alignItems: "center",
  },
  close: { position: "absolute", right: 20, top: 20, zIndex: 10 },
  title: { fontSize: 20, fontWeight: "800", color: "#297AB8" },
  subtitle: { fontSize: 13, color: "#A0AEC0", marginBottom: 20 },
  categories: { flexDirection: "row", gap: 8, marginBottom: 20 },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
  },
  tabSelected: {
    backgroundColor: "#FFF",
    borderWidth: 2,
    borderColor: "#93CCF7",
  },
  tabText: { fontSize: 14, color: "#4A5568", fontWeight: "500" },
  tabTextSelected: { color: "#297AB8", fontWeight: "bold" },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    gap: 12,
    minHeight: 80,
    marginBottom: 16,
  },
  card: {
    width: "22%",
    aspectRatio: 1,
    backgroundColor: "#F3F4F6",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  cardSelected: { backgroundColor: "#EBF8FF", borderColor: "#93CCF7" },
  cardImage: { width: "75%", height: "75%" },
  price: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 16,
  },
  starIcon: { width: 22, height: 22 },
  priceText: { fontSize: 18, fontWeight: "bold", color: "#000" },
  confirm: {
    backgroundColor: "#F3F4F6",
    width: "60%",
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
  },
  confirmText: { color: "#297AB8", fontWeight: "bold", fontSize: 16 },
});

const nameStyle = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    borderWidth: 4,
    borderBottomWidth: 0,
    borderColor: "#88D48E",
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
    alignItems: "center",
  },
  avatarBadge: {
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
  title: { fontSize: 20, fontWeight: "bold", color: "#297AB8", marginTop: 6 },
  subtitle: { fontSize: 14, color: "#99A8B6", marginTop: 6, marginBottom: 16 },
  inputWrapper: {
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
  counter: { fontSize: 13, color: "#99A8B6", marginTop: 6, marginBottom: 26 },
  suggestionsLabel: {
    alignSelf: "flex-start",
    fontSize: 15,
    fontWeight: "bold",
    color: "#297AB8",
    marginBottom: 10,
  },
  suggestionsRow: {
    flexDirection: "row",
    width: "100%",
    gap: 12,
    marginBottom: 32,
  },
  chip: {
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
  chipText: { color: "#4A5568", fontSize: 14, fontWeight: "600" },
  actions: { flexDirection: "row", width: "100%", gap: 16 },
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
  actionText: { color: "#297AB8", fontSize: 16, fontWeight: "bold" },
});
