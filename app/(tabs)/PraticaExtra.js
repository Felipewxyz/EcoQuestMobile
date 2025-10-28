import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function PraticaExtra() {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
      <View style={styles.content}>
        <Text style={styles.title}>Página de Práticas Extras</Text>
        <Text style={styles.subtitle}>
          Aqui você encontrará conteúdos e atividades adicionais em breve.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});
