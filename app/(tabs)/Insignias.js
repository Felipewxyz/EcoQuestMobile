import { StyleSheet, Text, View } from "react-native";

export default function Insignias() {
  return (
    <View style={styles.container}>
      {/* Sequência de 100 dias */}
      <Text style={styles.title}>Sequência de 100 dias</Text>
      <View style={styles.blockContainer}>
        <View style={styles.grayBlock} />
        <View style={styles.grayBlock} />
        <View style={styles.grayBlock} />
      </View>

      {/* Sequência de 200 dias */}
      <Text style={styles.title}>Sequência de 200 dias</Text>
      <View style={styles.blockContainer}>
        <View style={styles.grayBlock} />
        <View style={styles.grayBlock} />
        <View style={styles.grayBlock} />
      </View>

      {/* Sequência de 300 dias */}
      <Text style={styles.title}>Sequência de 300 dias</Text>
      <View style={styles.blockContainer}>
        <View style={styles.grayBlock} />
        <View style={styles.grayBlock} />
        <View style={styles.grayBlock} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    marginTop: 20,
    marginBottom: 10,
  },
  blockContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  grayBlock: {
    width: 80,
    height: 80,
    backgroundColor: "#C0C0C0",
    borderRadius: 10,
  },
});
