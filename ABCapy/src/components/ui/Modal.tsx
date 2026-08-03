import React, { useState } from 'react';
import { View, Text, Switch, Modal, Button, StyleSheet } from 'react_native';

export function ComponenteModal(props) {
  const [visivel, setVisivel] = useState(false);

  // Atualização funcional recomendada
  const toggleModal = () => setVisivel((prev) => !prev);

  return (
    <View style={styles.container}>
      <Text>Carro: {props.nome}</Text>
      
      {/* Botão para abrir o modal */}
      <Button title="Abrir Opções" onPress={toggleModal} />

      {/* Componente Modal de fato */}
      <Modal
        visible={visivel}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleModal} // Obrigatório para o botão 'Voltar' do Android
      >
        <View style={styles.overlay}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Configurações do Veículo</Text>
            
            <View style={styles.row}>
              <Text>Ligado:</Text>
              <Switch
                trackColor={{ false: '#777', true: '#8bf' }}
                thumbColor={visivel ? '#00f' : '#444'}
                value={visivel}
                onValueChange={toggleModal}
              />
            </View>

            <Button title="Fechar Modal" onPress={toggleModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semitransparente escuro
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    elevation: 5, // Sombra no Android
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});