import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import { X, Star } from 'lucide-react-native'; // Usando ícones lucide

// DADOS FICTÍCIOS (Substitua por dados reais ou de API)
const categories = [
  { id: '1', name: 'nenhum', type: 'none' },
  { id: '2', name: 'chapéus', type: 'hat', icon: require('@/src/assets/images/hat-icon.png') }, // Ex: ícone de chapéu
  { id: '3', name: 'óculos', type: 'glasses', icon: require('@/src/assets/images/glasses-icon.png') }, // Ex: ícone de óculos
];

const hatItems = [
  { id: '101', name: 'Viking Hat', image: require('@/src/assets/images/viking-capy.png') },
  { id: '102', name: 'Sombrero', image: require('@/src/assets/images/sombrero-capy.png') },
  { id: '103', name: 'Pirate Hat', image: require('@/src/assets/images/pirate-capy.png') },
  { id: '104', name: 'Chef Hat', image: require('@/src/assets/images/chef-capy.png') },
];

export const ActionModal = ({ handleClose }) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[1]); // Começa com 'chapéus' selecionado
  const [selectedHatId, setSelectedHatId] = useState(null); // ID do chapéu selecionado

  // Renderiza cada botão de categoria
  const renderCategoryItem = ({ item }) => {
    const isSelected = item.id === selectedCategory.id;
    return (
      <TouchableOpacity
        style={[
          styles.categoryButton,
          isSelected && styles.selectedCategoryButton,
        ]}
        onPress={() => setSelectedCategory(item)}
      >
        {item.icon && (
          <Image source={item.icon} style={styles.categoryIcon} />
        )}
        <Text
          style={[
            styles.categoryText,
            isSelected && styles.selectedCategoryText,
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  // Renderiza cada item da categoria selecionada (no exemplo, chapéus)
  const renderItem = ({ item }) => {
    const isSelected = item.id === selectedHatId;
    return (
      <TouchableOpacity
        style={[
          styles.itemButton,
          isSelected && styles.selectedItemButton,
        ]}
        onPress={() => setSelectedHatId(item.id)}
      >
        <Image source={item.image} style={styles.itemImage} />
        {/* Se quiser adicionar o custo de estrelas por item, pode adicionar aqui */}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Acessórios</Text>
          <Text style={styles.headerSubtitle}>Personalize Paçoco</Text>
        </View>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <X color="#333" size={24} />
        </TouchableOpacity>
      </View>

      {/* Categorias (Scroll Horizontal) */}
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Itens da Categoria Selecionada (Scroll Vertical) */}
      <View style={styles.itemsContainer}>
        {selectedCategory.type === 'hat' && (
          <FlatList
            data={hatItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={2} // Exibe em 2 colunas
            columnWrapperStyle={styles.itemColumnWrapper}
            contentContainerStyle={styles.itemsList}
            showsVerticalScrollIndicator={false}
          />
        )}
        {/* Adicione outras condicionais para óculos, etc., se tiver os dados */}
      </View>

      {/* Seção de Estrelas (Custo de exemplo) e Botão de Confirmar */}
      <View style={styles.footerContainer}>
        {/* Estrelas de exemplo (50 na imagem) */}
        <View style={styles.costContainer}>
            <Star color="#F59E0B" size={20} />
            <Text style={styles.costText}>50</Text>
        </View>

        {/* Botão Confirmar */}
        <TouchableOpacity style={styles.confirmButton} onPress={handleClose}>
          <Text style={styles.confirmButtonText}>confirmar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF', // Fundo branco do modal
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    minHeight: 400, // Altura mínima para garantir espaço
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5, // Sombra para Android
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0284C7', // Azul do título
    textAlign: 'center', // Centralizado na imagem
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666', // Cinza claro
    textAlign: 'center',
    marginTop: 4,
  },
  closeButton: {
    position: 'absolute',
    right: -10, // Ajuste para posicionar conforme a imagem
    top: -10,
    padding: 10,
  },
  categoriesContainer: {
    marginBottom: 15,
  },
  categoriesList: {
    paddingVertical: 5,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6', // Cinza claro
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    // Sombra sutil para os botões de categoria
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedCategoryButton: {
    backgroundColor: '#C5E5FF', // Azul claro selecionado
  },
  categoryIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#1D4ED8', // Azul mais escuro selecionado
  },
  itemsContainer: {
    flex: 1, // Ocupa o espaço restante
    marginBottom: 20,
  },
  itemsList: {
    paddingBottom: 20,
  },
  itemColumnWrapper: {
    justifyContent: 'space-around', // Distribui colunas uniformemente
  },
  itemButton: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    width: '45%', // Largura para as 2 colunas
    aspectRatio: 1, // Quadrado
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F3F4F6', // Borda padrão
    // Sombra sutil para os itens
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
  },
  selectedItemButton: {
    borderColor: '#93CCF7', // Borda azul selecionado
    backgroundColor: '#DDF0FF', // Fundo azul claro selecionado
  },
  itemImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  footerContainer: {
    alignItems: 'center',
    marginTop: 'auto', // Empurra para o final
    paddingTop: 10,
  },
  costContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  costText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 6,
  },
  confirmButton: {
    backgroundColor: '#F3F4F6', // Cinza claro do botão
    borderRadius: 15,
    paddingHorizontal: 25,
    paddingVertical: 12,
    width: '80%', // Largura do botão confirmar
    // Sombra para o botão confirmar
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  confirmButtonText: {
    fontSize: 18,
    color: '#0284C7', // Azul do texto do botão
    fontWeight: 'bold',
    textAlign: 'center',
  },
}); 