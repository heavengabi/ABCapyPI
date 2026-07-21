import React from "react";
import {  ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ConfigPage(){
    return (
        <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
            <View>

            <Text>Configurações</Text>
            <Text> Personalize sua experiencia </Text>


            </View>
            <View>
                <View>
                    
                </View>
            </View>
            
            
        </ScrollView>
        </SafeAreaView>
    )
}