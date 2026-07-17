import { Button } from '@/src/components/button';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';

export default function CharacterSelection() {
  const [personagem, setPersonagem] = useState('sabida');
  
  const [acessorio, setAcessorio] = useState(null); 

  const accessories = [
    { id: 'viking', source: require('../src/assets/characterAccessories/FarmerCapy.png') },
    { id: 'fazendeiro', source: require('../src/assets/characterAccessories/VikingCapy.png') },
    { id: 'pirata', source: require('../src/assets/characterAccessories/PirateCapy.png') },
    { id: 'vazio1', source: null },
    { id: 'vazio2', source: null },
    { id: 'vazio3', source: null },
    { id: 'vazio4', source: null },
    { id: 'vazio5', source: null },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      
      <Text style={styles.titulo}>Escolha seu Personagem</Text>
      <View style={styles.linha}>
        <TouchableOpacity onPress={() => setPersonagem('aventureira')}>
          <View style={styles.circuloOpcao}>
            
            <Image source={require('../src/assets/charactersImages/AdventureCapy.png')} style={styles.imagemPersonagem} />
          </View>
          <Text style={styles.nomePersonagem}>Capivara aventureira</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setPersonagem('sabida')}>
          <View style={styles.circuloOpcao}>
            <Image source={require('../src/assets/charactersImages/StudentCapy.png')} style={styles.imagemPersonagem} />
          </View>
          <Text style={styles.nomePersonagem}>Capivara sabida</Text>
        </TouchableOpacity>
      </View>

      
      <Text style={styles.titulo}>Seu personagem</Text>
      <View style={styles.circuloCentral}>
        
        <Image 
          source={personagem === 'aventureira' 
            ? require('../src/assets/charactersImages/AdventureCapy.png') 
            : require('../src/assets/charactersImages/StudentCapy.png')
          } 
          style={styles.imagemPersonagemCentral} 
        />
      </View>

      
      <Text style={styles.titulo}>Escolha um acessório</Text>
      <View style={styles.grade}>
        {accessories.map((item) => (
          <TouchableOpacity
            key={item.id}
           
            style={[
              styles.circuloAcessorio,
              acessorio === item.id && styles.activeAccessory
            ]}
          >
            {item.source && <Image source={item.source} style={styles.accessoryImage} />}
          </TouchableOpacity>
        ))}
      </View>

     
       <View style={{ flexDirection: "column", gap: 20, marginTop: 20 }}>
              
              <Button title="Continuar" onPress={() => router.push("/ChildName")}  style={{backgroundColor: "white", borderColor: "#93CCF7", borderWidth: 3}} textStyle={{color: "#93CCF7"}} />
            </View>   
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#E2F2FD',
  },
  titulo: {
    fontSize: 18,
    marginVertical: 15,
    fontWeight: '600', 
    color: '#000',
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  circuloOpcao: {
    width: 148,
    height: 145,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 75,
    backgroundColor: '#FFF',
    overflow: 'hidden',
    borderColor: '#93CCF7',
    borderWidth: 10,
  },
  nomePersonagem: {
    textAlign: 'center',
    marginTop: 5,
    fontWeight: '500',
  },
  imagemPersonagem: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
  circuloCentral: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    justifyContent: "flex-end",
    backgroundColor: '#FFF',
    
    alignItems: 'center',
    borderWidth: 6,
    borderColor: '#A5F8C3', 
  },
  imagemPersonagemCentral: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  grade: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    maxWidth: 300,
  },
  circuloAcessorio: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#B3D7F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  accessoryImage: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
    justifyContent:"flex-end"
  },
  activeAccessory: {
    borderWidth: 3,
    borderColor: '#2575B7', 
  },
  botao: {
    backgroundColor: '#2575B7',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 30,
  },
  textoBotao: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});