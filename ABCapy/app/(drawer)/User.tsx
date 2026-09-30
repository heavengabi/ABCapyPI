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
import { Pencil, Lock, X, User, Trophy, Award, Sparkles } from "lucide-react-native";
import { useNavigation, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import api from "../../src/utils/api";
import Footer from "@/src/components/Footer/Footer";
import { useTalkBack } from "@/src/context/TalkBackContext";

const CACHE_KEY = "@ABCapy:child";
const NAME_SUGGESTIONS = ["Capy", "Paçoca", "Pipoca"];

const menuIcon = require("../../src/assets/images/homeImages/menu.png");
const starIcon = require("../../src/assets/images/solar_star-bold-duotone.png");

// Thumbnails da loja
const pirateImg = require("../../src/assets/characterAccessories/PirateCapy.png");
const farmerImg = require("../../src/assets/characterAccessories/FarmerCapy.png");
const gradCapThumb = require("../../src/assets/characterAccessories/GradeCapy.png");
const glassesThumb = require("../../src/assets/characterAccessories/CapyGlasses.png");
const beretThumb = require("../../src/assets/characterAccessories/ArtistCapy.png");
const adventurerHatThumb = require("../../src/assets/characterAccessories/AdventureCapy.png");

// Mídias base das capivaras
const adventureImg = require("../../src/assets/charactersImages/AdventureCapy.png");
const studentImg = require("../../src/assets/charactersImages/StudentCapy.png");

// Capivaras usando acessórios (1 a 6)
const adventurePirateImg = require("../../src/assets/characterAccessories/capyUsingAcessories/1.png");
const adventureFarmerImg = require("../../src/assets/characterAccessories/capyUsingAcessories/2.png");
const studentGraduationImg = require("../../src/assets/characterAccessories/capyUsingAcessories/3.png");
const studentGlassesImg = require("../../src/assets/characterAccessories/capyUsingAcessories/4.png");
const studentBeretImg = require("../../src/assets/characterAccessories/capyUsingAcessories/5.png");
const adventureHatImg = require("../../src/assets/characterAccessories/capyUsingAcessories/6.png");

const CATEGORIES = [
  { id: "none", name: "nenhum" },
  { id: "hat", name: "chapéus", icon: "🎩" },
  { id: "glasses", name: "óculos", icon: "👓" },
];

const ACCESSORIES = [
  // Acessórios da Aventureira
  { id: "farmer", backendId: 1, category: "hat", name: "Chapéu de Fazendeiro", price: 0, requiredStars: 0, thumb: farmerImg, allowedCapy: "aventureira" },
  { id: "pirate", backendId: 2, category: "hat", name: "Chapéu de Pirata", price: 50, requiredStars: 0, thumb: pirateImg, allowedCapy: "aventureira" },
  { id: "adventurer_hat", backendId: 6, category: "hat", name: "Chapéu de Aventureiro", price: 0, requiredStars: 10, thumb: adventurerHatThumb, allowedCapy: "aventureira" },

  // Acessórios da Sabida
  { id: "graduation", backendId: 3, category: "hat", name: "Chapéu de Formando", price: 0, requiredStars: 0, thumb: gradCapThumb, allowedCapy: "sabida" },
  { id: "glasses", backendId: 4, category: "glasses", name: "Óculos", price: 80, requiredStars: 0, thumb: glassesThumb, allowedCapy: "sabida" },
  { id: "beret", backendId: 5, category: "hat", name: "Boina de Intelectual", price: 0, requiredStars: 10, thumb: beretThumb, allowedCapy: "sabida" },
];

const CAPY_IMAGES: Record<string, Record<string, any>> = {
  aventureira: {
    base: adventureImg,
    farmer: adventureFarmerImg,
    pirate: adventurePirateImg,
    adventurer_hat: adventureHatImg,
  },
  sabida: {
    base: studentImg,
    graduation: studentGraduationImg,
    glasses: studentGlassesImg,
    beret: studentBeretImg,
  },
};

const getCapyImage = (capy?: string, accessory?: string | null) => {
  const set = CAPY_IMAGES[capy ?? ""] ?? CAPY_IMAGES.aventureira;
  return (accessory && set[accessory]) || set.base;
};

interface Child {
  childName: string;
  capy: string;
  stars: number;         // Saldo real de moedas no banco
  totalStars?: number;   // Total histórico acumulado
  accessory?: string | null;
}

interface InventoryItem {
  id: number;
  equipped: boolean;
  accessory: { id: number; name: string; price: number };
}

function AccessoryModal({
  visible,
  userName,
  userStars,
  userTotalStars,
  userCapy,
  currentAccessory,
  inventory,
  onClose,
  onRefreshInventory,
  onUpdateChildState,
}: any) {
  const { speak } = useTalkBack();
  const [category, setCategory] = useState("hat");
  const [selectedId, setSelectedId] = useState<string | null>(currentAccessory);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      setSelectedId(currentAccessory);
      speak(`Modal de acessórios aberto. Escolha um acessório para ${userName}`);
    }
  }, [visible, currentAccessory]);

  const items = useMemo(() => ACCESSORIES.filter((a) => a.category === category), [category]);
  const selectedAccessory = ACCESSORIES.find((a) => a.id === selectedId);
  const price = selectedAccessory?.price ?? 0;
  const requiredStars = selectedAccessory?.requiredStars ?? 0;

  const isAllowedForCurrentCapy = useMemo(() => {
    if (!selectedAccessory) return true;
    return selectedAccessory.allowedCapy === (userCapy ?? "aventureira");
  }, [selectedAccessory, userCapy]);

  const hasEnoughStarsForUnlock = userTotalStars >= requiredStars;

  const purchasedItem = useMemo(() => {
    if (!selectedAccessory) return null;
    return inventory.find((inv: InventoryItem) => inv.accessory.id === selectedAccessory.backendId);
  }, [inventory, selectedAccessory]);

  const currentlyEquippedItem = useMemo(() => inventory.find((inv: InventoryItem) => inv.equipped), [inventory]);
  const isPurchased = !!purchasedItem || (price === 0 && requiredStars === 0);

  const confirm = async () => {
    if (!isAllowedForCurrentCapy && selectedId !== null) {
      const capyName = userCapy === "sabida" ? "Capivara Sabida" : "Capivara Aventureira";
      const errorMsg = `Este acessório é exclusivo do outro personagem e não pode ser usado na ${capyName}.`;
      speak(errorMsg);
      Alert.alert("Acessório Indisponível", errorMsg);
      return;
    }

    if (!hasEnoughStarsForUnlock && selectedId !== null) {
      const errorMsg = `Você precisa acumular ${requiredStars} estrelas no total para desbloquear este acessório misterioso!`;
      speak(errorMsg);
      Alert.alert("Recompensa Bloqueada", errorMsg);
      return;
    }

    try {
      setLoading(true);

      if (!selectedId) {
        speak("Removendo acessórios");
        if (currentlyEquippedItem) {
          await api.patch(`/inventory/${currentlyEquippedItem.id}/equip`);
        }
      } else if (purchasedItem) {
        speak(`Equipando ${selectedAccessory?.name}`);
        if (!purchasedItem.equipped) {
          await api.patch(`/inventory/${purchasedItem.id}/equip`);
        }
      } else {
        if (userStars < price) {
          const msg = `Estrelas insuficientes. Você precisa de ${price} estrelas de saldo.`;
          speak(msg);
          Alert.alert("Estrelas Insuficientes", msg);
          return;
        }

        if (selectedAccessory) {
          speak(`Comprando e equipando ${selectedAccessory.name}`);
          const { data: boughtItem } = await api.post("/inventory/buy", {
            accessoryId: selectedAccessory.backendId,
          });

          if (boughtItem && !boughtItem.equipped) {
            await api.patch(`/inventory/${boughtItem.id}/equip`);
          }
        }
      }

      await onRefreshInventory();
      await onUpdateChildState();
      onClose();
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Não foi possível realizar a ação.";
      speak(errorMsg);
      Alert.alert("Erro", errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={accStyle.overlay} onPress={onClose}>
        <Pressable style={accStyle.container}>
          <TouchableOpacity
            style={accStyle.close}
            onPress={() => {
              speak("Fechar acessórios");
              onClose();
            }}
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
                onPress={() => {
                  setCategory(c.id);
                  if (c.id === "none") {
                    setSelectedId(null);
                    speak("Categoria nenhum acessório selecionada");
                  } else {
                    speak(`Categoria ${c.name} selecionada`);
                  }
                }}
                style={[accStyle.tab, category === c.id && accStyle.tabSelected]}
              >
                <Text style={[accStyle.tabText, category === c.id && accStyle.tabTextSelected]}>
                  {c.icon ? `${c.icon} ` : ""}{c.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={accStyle.grid}>
            {items.map((item) => {
              const isAllowed = item.allowedCapy === (userCapy ?? "aventureira");
              const isUnlockedByStars = userTotalStars >= item.requiredStars;
              const isBlocked = !isAllowed || !isUnlockedByStars;
              const isRewardItem = item.requiredStars === 10;

              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    setSelectedId(item.id);
                    if (!isAllowed) {
                      speak(`${item.name}. Indisponível para este personagem.`);
                    } else if (!isUnlockedByStars) {
                      speak(`Acessório misterioso de recompensa. Requer 10 estrelas conquistadas para desbloquear.`);
                    } else {
                      speak(`${item.name}. Preço: ${item.price} estrelas`);
                    }
                  }}
                  style={[
                    accStyle.card,
                    selectedId === item.id && accStyle.cardSelected,
                    isBlocked && accStyle.cardDisabled,
                  ]}
                >
                  <Image
                    source={item.thumb}
                    style={[
                      accStyle.cardImage,
                      isRewardItem && !isUnlockedByStars && accStyle.mysteryImageLocked,
                      !isRewardItem && isBlocked && { opacity: 0.3 },
                    ]}
                    contentFit="contain"
                  />

                  {isBlocked && (
                    <View style={accStyle.lockBadge}>
                      <Lock size={12} color="#FFF" />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {selectedId != null && !isPurchased && isAllowedForCurrentCapy && hasEnoughStarsForUnlock && (
            <View style={accStyle.price}>
              <Image source={starIcon} style={{ width: 22, height: 22 }} />
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>{price}</Text>
            </View>
          )}

          <TouchableOpacity
            style={[
              accStyle.confirm,
              (!isAllowedForCurrentCapy || !hasEnoughStarsForUnlock) && selectedId !== null && accStyle.confirmDisabled,
            ]}
            onPress={confirm}
            disabled={loading || ((!isAllowedForCurrentCapy || !hasEnoughStarsForUnlock) && selectedId !== null)}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#297AB8" />
            ) : (
              <Text
                style={[
                  accStyle.confirmText,
                  (!isAllowedForCurrentCapy || !hasEnoughStarsForUnlock) && selectedId !== null && { color: "#A0AEC0" },
                ]}
              >
                {selectedId === null
                  ? "confirmar"
                  : !isAllowedForCurrentCapy
                  ? "indisponível"
                  : !hasEnoughStarsForUnlock
                  ? "bloqueado (10 ★)"
                  : isPurchased
                  ? "equipar"
                  : "comprar e equipar"}
              </Text>
            )}
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function EditNameModal({ visible, currentName, onClose, onSave }: any) {
  const { speak } = useTalkBack();
  const [name, setName] = useState(currentName);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      setName(currentName);
      speak("Modal de alteração de nome aberto.");
    }
  }, [currentName, visible]);

  const confirm = async () => {
    if (!name.trim()) {
      speak("O nome não pode ficar em branco.");
      return Alert.alert("Atenção", "O nome não pode ficar em branco.");
    }
    try {
      setLoading(true);
      speak(`Salvando nome ${name.trim()}`);
      await onSave(name.trim());
      onClose();
    } catch (err: any) {
      speak("Erro ao atualizar nome.");
      Alert.alert("Erro", err.response?.data?.message || "Erro ao atualizar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={nameStyle.overlay} onPress={onClose}>
        <Pressable style={nameStyle.sheet}>
          <View style={nameStyle.headerRow}>
            <View style={nameStyle.avatarBadge}>
              <User size={22} color="#297AB8" />
            </View>
            <View style={nameStyle.headerTextContainer}>
              <Text style={nameStyle.title}>mudar dados</Text>
              <Text style={nameStyle.subtitle}>como você quer ser chamado?</Text>
            </View>
          </View>

          <View style={nameStyle.inputWrapper}>
            <TextInput
              style={nameStyle.input}
              value={name}
              onChangeText={setName}
              maxLength={20}
              textAlign="center"
              placeholder="Digite seu nome"
              placeholderTextColor="#A0AEC0"
            />
          </View>

          <Text style={nameStyle.suggestionsLabel}>sugestões de nomes:</Text>

          <View style={nameStyle.suggestionsRow}>
            {NAME_SUGGESTIONS.map((item) => (
              <TouchableOpacity
                key={item}
                style={nameStyle.chip}
                onPress={() => {
                  setName(item);
                  speak(`Sugestão ${item} selecionada`);
                }}
                activeOpacity={0.7}
              >
                <Text style={nameStyle.chipText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={nameStyle.actionsRow}>
            <TouchableOpacity
              style={[nameStyle.actionBtn, nameStyle.cancelBtn]}
              onPress={() => {
                speak("Cancelar alteração de nome");
                onClose();
              }}
              disabled={loading}
              activeOpacity={0.7}
            >
              <Text style={nameStyle.cancelText}>cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[nameStyle.actionBtn, nameStyle.confirmBtn]}
              onPress={confirm}
              disabled={loading}
              activeOpacity={0.7}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#FFF" />
              ) : (
                <Text style={nameStyle.confirmText}>confirmar</Text>
              )}
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export default function UserPage() {
  const { speak } = useTalkBack();
  const [child, setChild] = useState<Child | null>(null);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [showAccessories, setShowAccessories] = useState(false);
  const [showName, setShowName] = useState(false);
  const navigation = useNavigation<any>();

  const fetchInventory = async () => {
    try {
      const { data } = await api.get("/inventory/me");
      if (data) setInventory(data);
    } catch (e) {}
  };

  const fetchChildProfile = async () => {
    try {
      const { data } = await api.get("/children/me");
      if (data) {
        setChild(data);
        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(data));
      }
    } catch (e) {}
  };

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const cache = await AsyncStorage.getItem(CACHE_KEY);
        let currentChild = cache ? JSON.parse(cache) : null;
        if (currentChild) setChild(currentChild);

        await fetchChildProfile();
        await fetchInventory();

        const childName = currentChild?.childName || "Amiguinho";
        const childStars = currentChild?.stars ?? 0;
        speak(`Página de perfil de ${childName}. Você tem ${childStars} estrelas.`);
      })();
    }, [])
  );

  const updateChild = async (patch: Partial<Child>) => {
    const { data } = await api.put("/children/me", patch);
    const next = { ...child, ...data, ...patch } as Child;
    setChild(next);
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(next));
  };

  const equippedAccessory = useMemo(() => {
    const item = inventory.find((i) => i.equipped);
    if (!item) return null;
    return ACCESSORIES.find((a) => a.backendId === item.accessory.id)?.id ?? null;
  }, [inventory]);

  const name = child?.childName || "Amiguinho";
  const stars = child?.stars ?? 0;                            // Saldo do banco (gastável)
  const totalStars = child?.totalStars ?? child?.stars ?? 0;  // Estrelas conquistadas (histórico imutável)

  const getLevelInfo = (starsAmount: number) => {
    if (starsAmount >= 200) return { level: "Nível 5", label: "Mestre Capy", color: "#8B5CF6" };
    if (starsAmount >= 100) return { level: "Nível 4", label: "Sábio", color: "#EC4899" };
    if (starsAmount >= 50)  return { level: "Nível 3", label: "Aventureiro", color: "#3B82F6" };
    if (starsAmount >= 20)  return { level: "Nível 2", label: "Estudioso", color: "#10B981" };
    return { level: "Nível 1", label: "Explorador", color: "#e3cc1c" };
  };

  const currentLevel = getLevelInfo(totalStars);
  const equippedName = ACCESSORIES.find((a) => a.id === equippedAccessory)?.name || "nenhum acessório";
  const badge = ACCESSORIES.find((a) => a.id === equippedAccessory)?.thumb;

  // Lógica dinâmica para a recompensa de 10 estrelas baseada na Capivara atual
  const isSabida = child?.capy === "sabida";
  const rewardName = isSabida ? "Boina de Intelectual" : "Chapéu de Aventureiro";
  const rewardThumb = isSabida ? beretThumb : adventurerHatThumb;
  const isRewardUnlocked = totalStars >= 10;

  return (
    <SafeAreaView edges={["top", "bottom"]} style={{ flex: 1, backgroundColor: "#FFF" }}>
      <ScrollView contentContainerStyle={style.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={style.topBar}>
          <Pressable
            onPress={() => {
              speak("Abrir menu de navegação");
              navigation.dispatch({ type: "OPEN_DRAWER" });
            }}
          >
            <Image source={menuIcon} style={{ width: 31, height: 31 }} contentFit="contain" />
          </Pressable>
          
          <Pressable
            style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            onPress={() => speak(`Você possui ${stars} estrelas disponíveis`)}
          >
            <Image source={starIcon} style={{ width: 24, height: 24 }} />
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{stars}</Text>
          </Pressable>
        </View>

        <Text style={style.pageTitle}>Perfil</Text>

        <TouchableOpacity
          style={{ marginBottom: 15 }}
          activeOpacity={0.8}
          onPress={() => {
            speak(`Sua capivara está usando ${equippedName}. Toque para personalizar.`);
            setShowAccessories(true);
          }}
        >
          <View style={style.circuloOpcao}>
            <Image source={getCapyImage(child?.capy, equippedAccessory)} style={{ width: "85%", height: "85%" }} contentFit="contain" />
          </View>
          {badge && (
            <View style={style.badgeAcessorio}>
              <Image source={badge} style={{ width: 52, height: 32 }} contentFit="cover" />
            </View>
          )}
        </TouchableOpacity>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 25 }}>
          <Text style={{ fontSize: 24, fontFamily: "Poppins_600SemiBold", color: "#297AB8" }}>{name}</Text>
          <TouchableOpacity
            style={style.editButton}
            onPress={() => {
              speak("Editar nome do perfil");
              setShowName(true);
            }}
          >
            <Pencil color="#0284C7" size={16} />
          </TouchableOpacity>
        </View>

        {/* CAMINHO DE RECOMPENSA (Dinâmico para Sabida ou Aventureira) */}
        <Pressable
          style={{ width: "100%", alignItems: "center", marginBottom: 25 }}
          onPress={() =>
            isRewardUnlocked
              ? speak(`Recompensa desbloqueada! ${rewardName} disponível nos seus acessórios.`)
              : speak(`Progresso de recompensas. Faltam ${10 - totalStars} estrelas para desbloquear o ${rewardName}.`)
          }
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View style={style.progressBarBackground}>
              <View style={[style.progressBarFill, { width: `${Math.min((totalStars / 10) * 100, 100)}%` }]} />
            </View>
            <View style={style.rewardContainer}>
              <Image source={rewardThumb} style={[style.rewardImage, !isRewardUnlocked && style.rewardImageLocked]} contentFit="cover" />
              {!isRewardUnlocked && <Lock size={18} color="#000" style={{ position: "absolute" }} />}
            </View>
          </View>
          <Text style={{ color: "#297AB8", fontSize: 12, marginTop: 8 }}>
            {isRewardUnlocked
              ? "Recompensa desbloqueada!"
              : `Faltam ${10 - totalStars} estrelas para o ${rewardName}`}
          </Text>
        </Pressable>

        <Pressable 
          style={style.achievementsCard}
          onPress={() => speak(`Suas conquistas. Você está no ${currentLevel.level}, ${currentLevel.label}, com ${totalStars} estrelas acumuladas.`)}
        >
          <View style={style.achievementsBadge}>
            <Trophy size={18} color="#297AB8" style={{ marginRight: 6 }} />
            <Text style={{ color: "#297AB8", fontFamily: "Poppins_700Bold", fontSize: 15 }}>minhas conquistas</Text>
          </View>

          <View style={style.achievementRow}>
            <View style={style.achievementItem}>
              <View style={[style.iconCircle]}>
                <Sparkles size={22} color={currentLevel.color} />
              </View>
              <Text style={style.achievementNumber}>{currentLevel.level}</Text>
              <Text style={style.achievementLabel}>{currentLevel.label}</Text>
            </View>

            <View style={style.achievementItem}>
              <View style={[style.iconCircle]}>
                <Award size={22} color="#297AB8" />
              </View>
              <Text style={style.achievementNumber}>{inventory.length}</Text>
              <Text style={style.achievementLabel}>Itens Comprados</Text>
            </View>
          </View>
        </Pressable>

        <Pressable style={style.finalCard} onPress={() => speak(`Total de ${totalStars} estrelas conquistadas`)}>
          <Text style={{ fontSize: 14, color: "#297AB8", marginBottom: 4 }}>estrelas conquistadas</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Text style={{ fontSize: 20, fontFamily: "Poppins_700Bold" }}>{totalStars}</Text>
            <Image source={starIcon} style={{ width: 22, height: 22 }} />
          </View>
        </Pressable>
      </ScrollView>

      <AccessoryModal
        visible={showAccessories}
        userName={name}
        userStars={stars}
        userTotalStars={totalStars}
        userCapy={child?.capy}
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
        onSave={(childName: string) => updateChild({ childName })}
      />

      <Footer />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  scrollContent: { paddingHorizontal: 20, paddingBottom: 100, alignItems: "center" },
  topBar: { width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 },
  pageTitle: { color: "#297AB8", fontSize: 34, fontFamily: "Poppins_700Bold", marginVertical: 10 },
  circuloOpcao: { width: 140, height: 140, justifyContent: "flex-end", alignItems: "center", borderRadius: 70, backgroundColor: "#FFF", borderColor: "#93CCF7", borderWidth: 8, overflow: "hidden" },
  badgeAcessorio: { position: "absolute", bottom: 0, right: 4, backgroundColor: "#93CCF733", width: 46, height: 46, borderRadius: 23, justifyContent: "flex-end", alignItems: "center", borderWidth: 2, borderColor: "#FFF", overflow: "hidden" },
  editButton: { backgroundColor: "#C5E5FF", width: 30, height: 30, borderRadius: 15, justifyContent: "center", alignItems: "center" },
  progressBarBackground: { height: 20, flex: 1, maxWidth: 240, backgroundColor: "#E0E0E0", borderRadius: 10, overflow: "hidden" },
  progressBarFill: { height: "100%", backgroundColor: "#297AB8", borderRadius: 10 },
  rewardContainer: { width: 60, height: 60, borderRadius: 30, backgroundColor: "#DDF0FF", justifyContent: "center", alignItems: "center" },
  rewardImage: { width: 42, height: 42 },
  rewardImageLocked: { tintColor: "rgba(80,80,80,0.6)" },
  achievementsCard: { width: "100%", backgroundColor: "#E3F2FD", borderRadius: 24, padding: 16, alignItems: "center", marginBottom: 16 },
  achievementsBadge: { flexDirection: "row", alignItems: "center", backgroundColor: "#FFF", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 16, marginBottom: 16, elevation: 2 },
  achievementRow: { flexDirection: "row", justifyContent: "space-around", width: "100%" },
  achievementItem: { alignItems: "center" },
  iconCircle: { width: 44, height: 44, borderRadius: 22, justifyContent: "center", alignItems: "center", marginBottom: 6 },
  achievementNumber: { fontSize: 16, fontFamily: "Poppins_700Bold", color: "#2C3E50" },
  achievementLabel: { fontSize: 12, color: "#297AB8", marginTop: 2 },
  finalCard: { width: "100%", backgroundColor: "#FFF", borderRadius: 18, paddingVertical: 14, alignItems: "center", marginBottom: 12, elevation: 2 },
});

const accStyle = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-end" },
  container: { backgroundColor: "#FFF", borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, paddingBottom: 34, alignItems: "center" },
  close: { position: "absolute", right: 20, top: 20, zIndex: 10 },
  title: { fontSize: 20, fontWeight: "800", color: "#297AB8" },
  subtitle: { fontSize: 13, color: "#A0AEC0", marginBottom: 20 },
  categories: { flexDirection: "row", gap: 8, marginBottom: 20 },
  tab: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 12, backgroundColor: "#F3F4F6" },
  tabSelected: { backgroundColor: "#FFF", borderWidth: 2, borderColor: "#93CCF7" },
  tabText: { fontSize: 14, color: "#4A5568", fontWeight: "500" },
  tabTextSelected: { color: "#297AB8", fontWeight: "bold" },
  grid: { flexDirection: "row", flexWrap: "wrap", width: "100%", gap: 12, minHeight: 80, marginBottom: 16 },
  card: { width: "22%", aspectRatio: 1, backgroundColor: "#F3F4F6", borderRadius: 16, justifyContent: "center", alignItems: "center", borderWidth: 2, borderColor: "transparent", position: "relative" },
  cardSelected: { backgroundColor: "#EBF8FF", borderColor: "#93CCF7" },
  cardDisabled: { backgroundColor: "#EDF2F7", borderColor: "#CBD5E0" },
  cardImage: { width: "75%", height: "75%" },
  mysteryImageLocked: {
    tintColor: "rgba(44, 62, 80, 0.75)",
    opacity: 0.6,
  },
  lockBadge: { position: "absolute", top: 4, right: 4, backgroundColor: "#718096", borderRadius: 8, padding: 3 },
  price: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 16 },
  confirm: { backgroundColor: "#F3F4F6", width: "60%", paddingVertical: 12, borderRadius: 14, alignItems: "center" },
  confirmDisabled: { backgroundColor: "#EDF2F7" },
  confirmText: { color: "#297AB8", fontWeight: "bold", fontSize: 16 },
});

const nameStyle = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderWidth: 3,
    borderBottomWidth: 0,
    borderColor: "#88D48E",
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 36,
    alignItems: "center",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
    gap: 14,
  },
  avatarBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E2F2FD",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#297AB8",
  },
  subtitle: {
    fontSize: 13,
    color: "#718096",
    marginTop: 2,
  },
  inputWrapper: {
    width: "100%",
    borderRadius: 16,
    backgroundColor: "#F8FAFC",
    borderWidth: 1.5,
    borderColor: "#B4DBF7",
    marginBottom: 20,
    elevation: 1,
  },
  input: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D3748",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  suggestionsLabel: {
    alignSelf: "flex-start",
    fontSize: 12,
    fontWeight: "600",
    color: "#A0AEC0",
    marginBottom: 10,
    marginLeft: 2,
  },
  suggestionsRow: {
    flexDirection: "row",
    width: "100%",
    gap: 10,
    marginBottom: 28,
  },
  chip: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    justifyContent: "center",
    alignItems: "center",
  },
  chipText: {
    color: "#4A5568",
    fontWeight: "600",
    fontSize: 14,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 14,
    width: "100%",
  },
  actionBtn: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelBtn: {
    backgroundColor: "#F1F5F9",
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },
  cancelText: {
    color: "#64748B",
    fontSize: 15,
    fontWeight: "bold",
  },
  confirmBtn: {
    backgroundColor: "#297AB8",
  },
  confirmText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "bold",
  },
});