import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PraticaExtra() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prática Extra - Tema 01</Text>
      <Text style={styles.content}>Quiz ou desafio relacionado ao tema.</Text>
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
