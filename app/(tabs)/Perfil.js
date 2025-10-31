import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Perfil() {
  const router = useRouter();
  const [bannerData, setBannerData] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const carregarBanner = async () => {
        try {
          const data = await AsyncStorage.getItem("bannerSelecionado");
          if (data) {
            setBannerData(JSON.parse(data));
          }
        } catch (error) {
          console.log("Erro ao carregar banner:", error);
        }
      };

      carregarBanner();
    }, [])
  );


  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* ⚙️ Ícone de Configurações */}
      <Pressable
        style={({ pressed }) => [
          styles.configIcon,
          pressed && { transform: [{ scale: 0.9 }], opacity: 0.7 },
        ]}
        onPress={() => router.push("/(tabs)/Configuracoes")}
      >
        <Ionicons name="settings-outline" size={38} color="#000" />
      </Pressable>

      {/* 🔹 Banner dinâmico */}
      {bannerData?.type === "banner" ? (
        <Image
          source={bannerData.value}
          style={styles.banner}
          resizeMode="cover"
        />
      ) : (
        <View
          style={[
            styles.banner,
            { backgroundColor: bannerData?.value || "#B4E197" },
          ]}
        />
      )}

      {/* 🔹 Seção verde escura */}
      <View style={styles.greenSection}>
        <View style={styles.profileCircle}></View>

        <View style={styles.infoBox}>
          <Text style={styles.name}>Brendinha</Text>
          <Text style={styles.username}>@Brendinha_06</Text>

          <View style={styles.levelRow}>
            <View style={styles.levelContainer}>
              <Text style={styles.levelText}>Level 162</Text>
            </View>
            <MaterialCommunityIcons
              name="shield"
              size={30}
              color="#E0B94B"
              style={{ marginLeft: 8 }}
            />
          </View>
        </View>
      </View>

      {/* 🔹 Parte branca com estatísticas */}
      <View style={styles.whiteSection}>
        <View style={styles.statsBox}>
          {/* 1 - Máx de dias */}
          <View style={styles.statRow}>
            <Image
              source={require("../../assets/images/gota.png")}
              style={styles.iconImage}
            />
            <View style={styles.statTextBox}>
              <Text style={styles.statNumber}>397</Text>
              <Text style={styles.statLabel}>máx. de dias seguidos</Text>
            </View>
          </View>

          {/* 2 - EcoPoints */}
          <View style={styles.statRow}>
            <Image
              source={require("../../assets/images/folha.png")}
              style={styles.iconImage}
            />
            <View style={styles.statTextBox}>
              <Text style={styles.statNumber}>279</Text>
              <Text style={styles.statLabel}>total de EcoPoints</Text>
            </View>
          </View>

          {/* 3 - FloraCoins */}
          <View style={styles.statRow}>
            <Image
              source={require("../../assets/images/flor.png")}
              style={styles.iconImage}
            />
            <View style={styles.statTextBox}>
              <Text style={styles.statNumber}>113</Text>
              <Text style={styles.statLabel}>total de FloraCoins</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  configIcon: {
    position: "absolute",
    top: 25,
    left: 25,
    zIndex: 3,
  },
  banner: {
    width: "100%",
    height: 300,
    backgroundColor: "#B4E197", // padrão se nada for escolhido
  },
  greenSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7BC47F",
    height: 110,
    paddingLeft: 200,
    paddingRight: 20,
    marginTop: -70,
  },
  profileCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#C4C4C4",
    borderWidth: 3,
    borderColor: "#FFFFFF",
    position: "absolute",
    top: -75,
    left: 20,
    zIndex: 5,
  },
  infoBox: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  username: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  levelRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  levelContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  levelText: {
    fontSize: 12,
    fontWeight: "600",
  },

  whiteSection: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    paddingVertical: 30,
  },
  statsBox: {
    backgroundColor: "#F2F2F2",
    borderRadius: 15,
    paddingVertical: 45,
    paddingHorizontal: 25,
    width: "80%",
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  statTextBox: {
    marginLeft: 8,
    justifyContent: "center",
  },
  statNumber: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#000",
  },
  statLabel: {
    fontSize: 15,
    color: "#555",
  },
  iconImage: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
});
