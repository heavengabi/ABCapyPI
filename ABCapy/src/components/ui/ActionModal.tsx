import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { Text, View, TouchableOpacity, StyleSheet } from "react-native"


export function ActionModal({handleClose}){
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <TouchableOpacity style={{flex:1, zIndex: 9, } } onPress={handleClose}>
                    <View style={styles.content}>
                        <TouchableOpacity style={{padding: 12, backgroundColor: "#C5E5FF", borderRadius: 8, }} onPress={handleClose}>
                            <Text style={{color: "#297AB8", fontWeight: "bold"}}>Editar</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
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
    content: {
        marginVertical: 20,
        marginLeft:10,
        
    
    },
});