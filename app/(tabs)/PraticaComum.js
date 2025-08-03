import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PraticaComum() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prática Comum - Tema 01</Text>
      <Text style={styles.content}>Conteúdo prático que muda conforme o tema.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    textAlign: "center",
  },
});
