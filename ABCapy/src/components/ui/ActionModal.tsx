import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { Text, View, TouchableOpacity, StyleSheet } from "react-native"


export function ActionModal(){
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text>Teste</Text>
            </View>
        </SafeAreaView>
    

            
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});