import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Conquistas() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🏆 Página de Conquistas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 26,
    color: "#1E90FF",
    fontWeight: "900",
  },
});
