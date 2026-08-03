import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Usaremos MaterialCommunityIcons e Ionicons
import { MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// --- Componentes Placeholder para Imagens Complexas do Design ---

const FloatingShapes = () => (
  <View style={styles.shapesContainer}>
    {/* Círculo Amarelo Topo Esquerda */}
    <View style={[styles.shapeCircle, { backgroundColor: '#FFEB3B', top: -40, left: -40, width: 120, height: 120 }]} />
    {/* Forma Verde Esquerda Middle */}
    <View style={[styles.shapePill, { backgroundColor: '#C8E6C9', top: 180, left: -50, transform: [{ rotate: '-15deg' }] }]} />
    {/* Círculo Verde Direita Bottom */}
    <View style={[styles.shapeCircle, { backgroundColor: '#C8E6C9', bottom: 150, right: -60, width: 150, height: 150 }]} />
  </View>
);

const CapybaraAvatar = () => (
  <View style={styles.avatarOuterBorder}>
    <View style={styles.avatarInnerContainer}>
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2569/2569032.png' }} // Placeholder: Use sua imagem de capivara aqui
        style={styles.avatarImage}
      />
    </View>
    {/* Ícone de Mochila */}
    <View style={styles.backpackBadge}>
      <FontAwesome5 name="shopping-bag" size={14} color="white" />
    </View>
  </View>
);

const ChefBadge = () => (
  <View style={styles.chefBadgeContainer}>
    <Image
      source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1865/1865269.png' }} // Placeholder: Chapéu de Chef
      style={styles.chefIcon}
    />
    <View style={styles.lockIconOverlay}>
      <Ionicons name="lock-closed" size={12} color="#555" />
    </View>
  </View>
);

const GameVessel = ({ type, icon, label, style, badgeIcon }) => {
  const vessels = {
    orange: { color: '#FF9800', vesselIcon: 'pot' },
    greenTall: { color: '#4CAF50', vesselIcon: 'cup' },
    greenShort: { color: '#8BC34A', vesselIcon: 'bowl-mix' }
  };
  const config = vessels[type];

  return (
    <View style={[styles.gameVesselContainer, style]}>
      {/* Ícones de Cima (Cartas/Estrelas) - Placeholder */}
      <View style={styles.gameTopIcons}>
        {icon}
      </View>

      {/* O "Vaso" */}
      <View style={[styles.vesselShape, { backgroundColor: config.color }]}>
        <MaterialCommunityIcons name={config.vesselIcon} size={50} color={'rgba(255,255,255,0.3)'} style={styles.vesselInnerIcon} />
        {badgeIcon && (
          <View style={styles.gameBadge}>{badgeIcon}</View>
        )}
      </View>
      <Text style={styles.gameLabel}>{label}</Text>
    </View>
  );
};


// --- Tela Principal ---

export default function UserProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <FloatingShapes />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Perfil</Text>
        <View style={styles.scoreContainer}>
          <Ionicons name="star" size={24} color="#FFD700" />
          <Text style={styles.scoreText}>3</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Seção Avatar */}
        <View style={styles.avatarSection}>
          <CapybaraAvatar />
          <View style={styles.nameContainer}>
            <Text style={styles.userName}>Paçoco</Text>
            <TouchableOpacity style={styles.editButton}>
              <MaterialCommunityIcons name="pencil-circle" size={24} color="#81D4FA" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Barra de Progresso */}
        <View style={styles.progressSection}>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: '70%' }]} />
            </View>
            <Text style={styles.progressText}>Faltam 3 estrelas para a próxima recompensa</Text>
          </View>
          <ChefBadge />
        </View>

        {/* Container Principal Azul Claro */}
        <View style={styles.mainStatsContainer}>
          <View style={styles.mostPlayedHeader}>
            <Text style={styles.mostPlayedTitle}>jogos mais jogados</Text>
          </View>

          {/* Gráfico de Jogos */}
          <View style={styles.gamesChartContainer}>
            {/* Jogo da Memória */}
            <GameVessel
              type="orange"
              label="jogo da memória"
              icon={<MaterialCommunityIcons name="cards-outline" size={40} color="#FFD54F" />}
            />
            {/* Siga a Ordem */}
            <GameVessel
              type="greenTall"
              label="siga a ordem"
              icon={<MaterialCommunityIcons name="format-list-numbered" size={40} color="#AED581" />}
              badgeIcon={<Text style={styles.badgeNumber}>1</Text>}
            />
            {/* Jogo do Igual */}
            <GameVessel
              type="greenShort"
              label="jogo do igual"
              icon={<MaterialCommunityIcons name="star-four-points" size={40} color="#FFEA00" />}
              style={{ marginTop: 20 }} // Ajuste de altura
            />
          </View>

          {/* Estatísticas Numéricas */}
          <View style={styles.numericStatsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>27</Text>
              <Text style={styles.statLabel}>total de jogadas</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Jogos experimentados</Text>
            </View>
          </View>
        </View>

        {/* Botões de Resumo Inferiores */}
        <View style={styles.summaryButtonsContainer}>
          <View style={styles.summaryButton}>
            <Text style={styles.summaryButtonLabel}>Atividades completadas</Text>
            <Text style={styles.summaryButtonValue}>15</Text>
          </View>
          <View style={styles.summaryButton}>
            <Text style={styles.summaryButtonLabel}>estrelas conquistadas</Text>
            <View style={styles.starValueRow}>
              <Text style={styles.summaryButtonValue}>39 </Text>
              <Ionicons name="star" size={18} color="#FFD700" />
            </View>
          </View>
        </View>

        {/* Padding final para scroll */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Tab Bar Simulada */}
      <View style={styles.tabBar}>
        <TabItem icon="earth" label="início" color="#999" />
        <TabItem icon="castle" label="história" color="#999" />
        <TabItem icon="account" label="perfil" color="#81D4FA" active />
      </View>
    </SafeAreaView>
  );
}

// Componente Auxiliar para itens da Tab Bar
const TabItem = ({ icon, label, color, active }) => (
  <View style={styles.tabItem}>
    <MaterialCommunityIcons name={icon} size={active ? 28 : 24} color={color} />
    <Text style={[styles.tabLabel, { color: color, fontWeight: active ? 'bold' : 'normal' }]}>{label}</Text>
  </View>
);


// --- Estilos ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F9FC', // Fundo clarinho
  },
  // Formas flutuantes de fundo
  shapesContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
    overflow: 'hidden',
  },
  shapeCircle: {
    position: 'absolute',
    borderRadius: 999,
  },
  shapePill: {
    position: 'absolute',
    width: 150,
    height: 60,
    borderRadius: 30,
  },
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'center', // Centraliza o título
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3869A6', // Azul do título
  },
  scoreContainer: {
    position: 'absolute',
    right: 20,
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: -2,
  },
  // Conteúdo do Scroll
  scrollContent: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  // Seção Avatar
  avatarSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  avatarOuterBorder: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 8,
    borderColor: '#AEEA00', // Verde limão
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    // Sombra leve
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarInnerContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: '#F0F0F0',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  backpackBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#8D6E63', // Castanho da mochila
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#42A5F5',
  },
  editButton: {
    marginLeft: 5,
  },
  // Barra de Progresso
  progressSection: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressBarContainer: {
    flex: 1,
    marginRight: 10,
  },
  progressBarBackground: {
    height: 14,
    backgroundColor: 'white',
    borderRadius: 7,
    width: '100%',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#DDD',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#1E88E5', // Azul escuro
    borderRadius: 7,
  },
  progressText: {
    fontSize: 11,
    color: '#3869A6',
    marginTop: 4,
    textAlign: 'center',
  },
  chefBadgeContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
  },
  chefIcon: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
  },
  lockIconOverlay: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 2,
  },
  // Container Principal Azul Claro
  mainStatsContainer: {
    width: '100%',
    backgroundColor: '#E3F2FD', // Azul bem claro
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    // Sombra leve
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  mostPlayedHeader: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 1,
  },
  mostPlayedTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3869A6',
  },
  gamesChartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 180, // Altura fixa para o gráfico
    marginBottom: 20,
  },
  // Componente GameVessel
  gameVesselContainer: {
    width: (width - 80) / 3, // Divide o espaço em 3
    alignItems: 'center',
    justifyContent: 'flex-end', // Alinha vasos na base
  },
  gameTopIcons: {
    marginBottom: 5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vesselShape: {
    width: '100%',
    height: 90, // Altura base do vaso
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // Para o badge não sair
  },
  vesselInnerIcon: {
    position: 'absolute',
  },
  gameBadge: {
    position: 'absolute',
    top: 5,
    left: 5,
    backgroundColor: '#AEEA00', // Verde badge
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeNumber: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 14,
  },
  gameLabel: {
    fontSize: 11,
    color: '#3869A6',
    textAlign: 'center',
    marginTop: 5,
    height: 30, // Espaço para 2 linhas
  },
  // Estatísticas Numéricas
  numericStatsRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: 'rgba(56, 105, 166, 0.1)',
    paddingTop: 15,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#3869A6',
    textAlign: 'center',
  },
  // Botões de Resumo Inferiores
  summaryButtonsContainer: {
    width: '100%',
    gap: 10, // Espaçamento entre botões (requer RN moderno ou view auxiliar)
  },
  summaryButton: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 18,
    alignItems: 'center',
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  summaryButtonLabel: {
    fontSize: 14,
    color: '#3869A6',
    marginBottom: 5,
  },
  summaryButtonValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  starValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Tab Bar
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'space-around',
  },
  tabItem: {
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 3,
  }
});