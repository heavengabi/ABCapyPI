import React from "react";
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/src/components/ui/button";
const colors = [
    { color: "#93CCF7", name: "Azul" },
    { color: "#FF847A", name: "Vermelho" },
    { color: "#8DD26E", name: "Verde" },
    { color: "#FFDD1F", name: "Amarelo" }
];
const fontSizes = [
    { label: "Normal", value: 16 },
    { label: "Grande", value: 20 },
    { label: "Muito grande", value: 24 }
];

export default function ConfigPage() {
    return (
        <SafeAreaView style={style.safeArea}>
            {/* O SEGREDO ESTÁ AQUI: style padrão NÃO tem alinhamento, apenas o contentContainerStyle */}
            <ScrollView 
                style={style.scrollViewBase} 
                contentContainerStyle={style.scrollContent}
            >
                <View style={style.headerContainer}>
                    <Text style={style.title}>Configurações</Text>
                    <Text style={style.subtitle}>Personalize sua experiência</Text>
                </View>

                <View style={style.container}>
                    <View style={{ gap: 20, width: "100%" }}>
                        <Text style={{ textAlign: "center", fontWeight: "bold" }}>Tema de cores</Text>
                        <View style={style.gridColors}>
                            {colors.map((item, index) => (
                                <TouchableOpacity key={index} style={style.cardColor}>
                                    <View style={{ backgroundColor: item.color, borderRadius: 20, width: 30, height: 30, marginBottom: 8 }} />
                                    <Text style={{ fontSize: 14 }}>{item.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
                 <View style={style.container}>
                            <Text style={{ textAlign: "center", fontWeight: "bold" }}>Tamanho da fonte</Text>
                            
        {fontSizes.map((item, index) => (
            <View key={index} style={style.buttonOption}>
                {/* Aqui você pode aplicar o tamanho dinamicamente se quiser dar um preview real */}
                <Text style={ { fontSize: item.value }}>
                    {item.label}
                </Text>
            </View>
        ))}
    </View>
                 <View style={style.container3}>
                    <View style={{flexDirection:"row", gap:20}}>
                    icon    
                    <View>
                            <Text style={{ textAlign: "center", fontWeight: "bold" }}>Tamanho da fonte</Text>
                    </View>
                    </View>
                            <Text style={style.subtitle}>Narração por voz</Text>
                            
        
    </View>
                 <View style={style.container4}>
                    <View style={{flexDirection:"row", gap:20}}>
                       
                    <View>
                            <Text style={{ textAlign: "center", fontWeight: 400 }}>Previa do texto</Text>
                    </View>
                    </View>
                            <Text style={{fontSize: 14, fontWeight: "600", textAlign:"center"}} >Olha! esse texto é um exemplo para ver as mudanças.  </Text>
        
    </View>
                            <Button title="Sair da conta" onPress={() => { console.log("Teste")}}/>
               
            </ScrollView>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    safeArea: {
        flex: 1, 
        backgroundColor: "#f5f5f5"
    },
    scrollViewBase: {
        flex: 1 // O estilo base do ScrollView SÓ controla o tamanho do container de rolagem
    },
    scrollContent: {
        flexGrow: 1,               // Permite que o container interno se estique para centralizar
        justifyContent: "center",  // AGORA SIM: Alinhamento vertical apenas aqui
        alignItems: "center",      // AGORA SIM: Alinhamento horizontal apenas aqui
        paddingVertical: 40,
        gap: 20
    },
    headerContainer: {
        marginBottom: 30,
        alignItems: "center"
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center"
    },
    subtitle: {
        fontSize: 14,
        color: "#666",
        textAlign: "center",
        marginTop: 4
    },
    container: {
        width: 309,
        height: 280,
        backgroundColor: "#CDE9FF",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        gap:20
    },
    container3:{
        width: 309,
        height: 133,
        backgroundColor: "#CDE9FF",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        
    },
    container4: {
        width: 309,
        height: 121,
         backgroundColor: "#CDE9FF",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
    }, 
    gridColors: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 15
    },
    cardColor: {
        backgroundColor: "#ffffff", 
        width: 117, 
        height: 88, 
        borderRadius: 20, 
        justifyContent: "center", 
        alignItems: "center"
    },
    optionsContainer: {
    gap: 12, 
    backgroundColor: "#CDE9FF",
    },
    buttonOption: {
        backgroundColor: "#ffffff", 
        width: 245,
        height: 51,
        padding: 10,
        borderRadius:20,
        justifyContent: "center",
        alignItems: "flex-start"
    
    },
});
