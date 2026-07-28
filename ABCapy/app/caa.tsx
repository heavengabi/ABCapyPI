import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
// Dados dos cartões da grade
// Atualização do array CARDS com os nomes exatos das imagens
const CARDS = [
  { id: '1', title: 'Sair', image: require('../src/assets/caaCardsImages/sair.png') },
  { id: '2', title: 'Eu', image: require('../src/assets/caaCardsImages/eu.png') },
  { id: '3', title: 'Você', image: require('../src/assets/caaCardsImages/eu.png') }, // Ajuste caso tenha a imagem do 'tu/você'
  { id: '4', title: 'Quero', image: require('../src/assets/caaCardsImages/quero.png') },
  { id: '5', title: 'Parar', image: require('../src/assets/caaCardsImages/parar.png') },
  { id: '6', title: 'Comer', image: require('../src/assets/caaCardsImages/comer.png') },
  { id: '7', title: 'Obrigado', image: require('../src/assets/caaCardsImages/obrigado.png') },
  { id: '8', title: 'Desculpa', image: require('../src/assets/caaCardsImages/pedirDesculpa.png') },
  { id: '9', title: 'Beber', image: require('../src/assets/caaCardsImages/beber.png') },
  { id: '10', title: 'Repetir', image: require('../src/assets/caaCardsImages/ouvir.png') },
  { id: '11', title: 'Dormir', image: require('../src/assets/caaCardsImages/dormir.png') },
  { id: '12', title: 'Banheiro', image: require('../src/assets/caaCardsImages/sanitários.png') },
  { id: '13', title: 'Sim', image: require('../src/assets/caaCardsImages/sim.png') },
  { id: '14', title: 'Escola', image: require('../src/assets/caaCardsImages/escola.png') },
  { id: '15', isAddButton: true }, // Cartão com ícone de "+"
];

export default function CAAScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* 1. Cabeçalho Superior */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu-outline" size={32} color="#2C3E50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Monte sua frase</Text>
      </View>

      {/* 2. Área da Mensagem (Caixa de texto e Ações) */}
      <View style={styles.phraseContainer}>
        <View style={styles.phraseBox}>
          <Text style={styles.placeholderText}>
            Toque nos cartões abaixo para construir sua mensagem
          </Text>
        </View>

        {/* Botões de Apagar e Ouvir */}
        <View style={styles.actionButtonsRow}>
          <TouchableOpacity style={styles.circleButton}>
            <Ionicons name="trash-outline" size={24} color="#3498DB" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.circleButton}>
            <Ionicons name="volume-medium-outline" size={26} color="#3498DB" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 3. Painel de Cartões (Fundo Branco com Borda Arredondada) */}
      <View style={styles.cardsContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.grid}>
            {CARDS.map((item) => (
              <View key={item.id} style={styles.cardWrapper}>
                {item.isAddButton ? (
                  <TouchableOpacity style={[styles.card, styles.addCard]}>
                    <Ionicons name="add" size={36} color="#2C3E50" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.card}>
                    {/* Substitua o uri/source pela sua imagem local ou remota */}
                    <Image
                      source={item.image}
                      style={styles.cardImage}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                )}
                {item.title && <Text style={styles.cardText}>{item.title}</Text>}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* 4. Menu de Navegação Inferior (Bottom Bar) */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <FontAwesome5 name="globe" size={24} color="#5D8AA8" />
          <Text style={[styles.navText, styles.navTextActive]}>início</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <FontAwesome5 name="chess-rook" size={22} color="#7F8C8D" />
          <Text style={styles.navText}>história</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="#7F8C8D" />
          <Text style={styles.navText}>perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');
const CARD_MARGIN = 8;
// Calcula a largura para 3 colunas perfeitas
const CARD_WIDTH = (width - 40 - CARD_MARGIN * 6) / 3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF6FF', // Azul claro de fundo
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    alignItems: 'center',
  },
  menuButton: {
    alignSelf: 'flex-start',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2980B9',
    marginTop: 5,
  },
  phraseContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  phraseBox: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    // Sombras
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  placeholderText: {
    color: '#BDC3C7',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
  },
  actionButtonsRow: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 20,
  },
  circleButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#CDE8FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardsContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 1.5,
    borderColor: '#A8D5BA', // Borda verde bem suave visível no protótipo
    borderBottomWidth: 0,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  cardWrapper: {
    width: CARD_WIDTH,
    margin: CARD_MARGIN,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    height: CARD_WIDTH,
    backgroundColor: '#D9D9D9', // Cinza do cartão
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  addCard: {
    backgroundColor: '#D9D9D9',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardText: {
    marginTop: 6,
    fontSize: 12,
    color: '#333333',
    textAlign: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ECF0F1',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 4,
  },
  navTextActive: {
    color: '#5D8AA8',
    fontWeight: 'bold',
  },
});