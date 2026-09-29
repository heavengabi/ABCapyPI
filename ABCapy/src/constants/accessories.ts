export const CATEGORIES = [
  { id: "none", name: "nenhum" },
  { id: "hat", name: "chapéus", icon: "🎩" },
  { id: "glasses", name: "óculos", icon: "👓" },
];

export const ACCESSORIES = [
  { id: "farmer", category: "hat", price: 50, thumb: require("../assets/characterAccessories/FarmerCapy.png") },
  { id: "pirate", category: "hat", price: 50, thumb: require("../assets/characterAccessories/PirateCapy.png") },
];

const adventure = require("../assets/charactersImages/AdventureCapy.png");
const student = require("../assets/charactersImages/StudentCapy.png");

// Quando gerar as imagens, troque o `adventure`/`student` pelo require da nova.
export const CAPY_IMAGES: Record<string, Record<string, any>> = {
  aventureira: { base: adventure, farmer: adventure, pirate: adventure },
  sabida: { base: student, farmer: student, pirate: student },
};

export const getCapyImage = (capy?: string, accessory?: string | null) => {
  const set = CAPY_IMAGES[capy ?? ""] ?? CAPY_IMAGES.sabida;
  return (accessory && set[accessory]) || set.base;
};