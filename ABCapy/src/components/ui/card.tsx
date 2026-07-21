import React from "react";
import { View, StyleSheet } from "react-native";

// 1. Componente Principal (Base do Card)
export default function Card({ children, style }) {
    return <View style={[styles.card, style]}>{children}</View>;
}

// 2. Subcomponente de Cabeçalho
function CardHeader({ children, style }) {
    return <View style={[styles.header, style]}>{children}</View>;
}

// 3. Subcomponente de Conteúdo
function CardContent({ children, style }) {
    return <View style={[styles.content, style]}>{children}</View>;
}

// 4. Subcomponente de Rodapé
function CardFooter({ children, style }) {
    return <View style={[styles.footer, style]}>{children}</View>;
}

// Vincula os subcomponentes ao componente principal para facilitar o import
Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;

const styles = StyleSheet.create({
    card: {
        width: 309,
        backgroundColor: "#CDE9FF", // O azul do seu layout
        borderRadius: 20,
        padding: 16,
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2, // Sombra para Android
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0, 0, 0, 0.05)", // Linha sutil separadora
    },
    content: {
        paddingVertical: 16,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: "rgba(0, 0, 0, 0.05)",
    },
});
