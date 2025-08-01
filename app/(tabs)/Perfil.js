import { StyleSheet, Text, View } from "react-native";

export default function Perfil() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Página Perfil</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
  }
});