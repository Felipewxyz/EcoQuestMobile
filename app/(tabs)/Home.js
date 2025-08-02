import React from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();

  // Dados fictícios para exibição
  const diasSeguidos = 5;
  const ecoPoints = 120;
  const vidas = 3;

  return (
    <View style={styles.container}>
      {/* "rodateto" */}
      <View style={styles.topIcons}>
        <View style={styles.iconItem}>
          <Image source={require("../../assets/images/gota.png")} style={styles.icon} />
          <Text style={styles.iconText}>{diasSeguidos}</Text>
        </View>
        <View style={styles.iconItem}>
          <Image source={require("../../assets/images/folha.png")} style={styles.icon} />
          <Text style={styles.iconText}>{ecoPoints}</Text>
        </View>
        <View style={styles.iconItem}>
          <Image source={require("../../assets/images/coracao.png")} style={styles.icon} />
          <Text style={styles.iconText}>{vidas}</Text>
        </View>
      </View>

      {/* caixa do tema que leva pra pag de pratica */}
      <View style={styles.themeBox}>
        <View style={styles.themeTextContainer}>
          <Text style={styles.themeTitle}>TEMA 01</Text>
          <Text style={styles.themeSubtitle}>Práticas Comuns</Text>
        </View>
        <View style={styles.divider} />
        <Pressable onPress={() => navigation.navigate("Pratica")}>
          <Ionicons name="journal-outline" size={40} color="#019314" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  topIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  iconItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 6,
  },
  iconText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
  themeBox: {
    backgroundColor: "#FFFFFF",
    borderColor: "#019314",
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 80,
  },
  themeTextContainer: {
    flex: 1,
  },
  themeTitle: {
    color: "#019314",
    fontSize: 20,
    fontWeight: "bold",
    opacity: 0.6,
  },
  themeSubtitle: {
    color: "#019314",
    fontSize: 16,
    fontWeight: "500",
  },
  divider: {
    width: 2,
    height: "80%",
    backgroundColor: "#019314",
    marginHorizontal: 12,
    opacity: 0.8,
  },
});
