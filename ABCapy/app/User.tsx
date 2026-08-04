import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pencil, Lock } from "lucide-react-native";
import { ActionModal } from "@/src/components/ui/ActionModal";
import Footer from "@/src/components/Footer/Footer";

const StarsNumber: number = 3;
const UserName: string = "Paçoco";
const CompletedActivities: number = 15;
const TotalStars: number = 39;

export default function UserPage() {
    const [visibleModal, setVisibleModal] = useState(false);
  return (
    <SafeAreaView edges={["top"]} style={style.safeArea}>
      <ScrollView
        contentContainerStyle={style.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        
        <View style={style.headerStars}>
          <Image
            source={require("../src/assets/images/solar_star-bold-duotone.png")}
            style={{ width: 24, height: 24 }}
          />
          <Text style={style.starsText}>{StarsNumber}</Text>
        </View>

       
        <Text style={style.pageTitle}>Perfil</Text>

       
        <View style={style.avatarWrapper}>
          <View style={style.circuloOpcao}>
            <Image
              source={require("../src/assets/charactersImages/StudentCapy.png")}
              style={style.imagemPersonagem}
            />
          </View>
          
          <View style={style.badgeAcessorio}>
            <Image
              source={require("../src/assets/characterAccessories/FarmerCapy.png")}
              style={{ width: 52, height: 32, resizeMode:"cover"}}
            />
          </View>
        </View>

    
        <View style={style.userNameRow}>
          <Text style={style.userNameText}>{UserName}</Text>
          <TouchableOpacity style={style.editButton} onPress={() => setVisibleModal(true)}>
            <Pencil color="#0284C7" size={16} />
          </TouchableOpacity>
        </View>

        <View style={style.progressSection}>
          <View style={style.progressBarContainer}>
            <View style={style.progressBarBackground}>
              <View style={[style.progressBarFill, { width: "70%" }]} />
            </View>

           
            <View style={style.rewardContainer}>
              <Image
                source={require("../src/assets/characterAccessories/PirateCapy.png")}
                style={[style.rewardImage, { tintColor: "rgba(80, 80, 80, 0.6)" }]}
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


          <View style={style.podiumPlaceholder}>
           
           
          </View>

        
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

     

        <View style={style.finalCard}>
          <Text style={style.finalCardLabel}>estrelas conquistadas</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Text style={style.finalCardValue}>{TotalStars}</Text>
            <Image
              source={require("../src/assets/images/solar_star-bold-duotone.png")}
              style={{ width: 22, height: 22 }}
            />
          </View>
        </View>
      </ScrollView>
      <Modal
      visible={visibleModal}
      transparent={true}
      onRequestClose={() => setVisibleModal(false)}
      >
        <ActionModal/>
      </Modal>
      <Footer/>
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
    paddingBottom: 40,
    alignItems: "center",
  },
  
  headerStars: {
    alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 10,
  },
  starsText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  pageTitle: {
    color: "#297AB8",
    fontSize: 34,
    fontWeight: "800",
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
    overflow:"hidden"

  },
  
  userNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 25,
  },
  userNameText: {
    fontSize: 24,
    fontWeight: "bold",
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
  rewardImage: {
    width: 42,
    height: 42,
    resizeMode: "cover",
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
    fontWeight: "bold",
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
    fontWeight: "bold",
    color: "#000",
  },
  statLabel: {
    fontSize: 12,
    color: "#297AB8",
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
  },
  finalCardValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
});