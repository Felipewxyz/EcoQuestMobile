import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Temas() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha um tema:</Text>
      <Pressable style={styles.button} onPress={() => navigation.navigate("Home")}>
        <Text style={styles.buttonText}>Tema 01</Text>
      </Pressable>
      {/* Você pode adicionar mais temas aqui depois */}
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
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#019314",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
});
