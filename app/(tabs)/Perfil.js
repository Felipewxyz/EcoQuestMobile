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
import { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Perfil() {
  const router = useRouter();
  const [bannerData, setBannerData] = useState(null);
  const [frameData, setFrameData] = useState(null); // moldura/borda selecionada

  useFocusEffect(
    useCallback(() => {
      const carregarConfig = async () => {
        try {
          const banner = await AsyncStorage.getItem("bannerSelecionado");
          const moldura = await AsyncStorage.getItem("molduraSelecionada");

          if (banner) setBannerData(JSON.parse(banner));
          if (moldura) setFrameData(JSON.parse(moldura));
          else setFrameData(null);
        } catch (error) {
          console.log("Erro ao carregar configurações:", error);
        }
      };

      carregarConfig();
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
        {/* Container do perfil com moldura para fora */}
        <View style={styles.profileWrapper}>
          {/* Moldura decorativa para fora da foto */}
          {frameData?.type === "moldura" && frameData.value && (
            <Image
              source={frameData.value}
              style={styles.frameOutside}
              resizeMode="contain"
            />
          )}

          {/* Foto de perfil com borda colorida (se houver) */}
          <View
            style={[
              styles.profileCircle,
              frameData?.type === "borda" && {
                borderColor: frameData.value,
                borderWidth: 5,
              },
            ]}
          >
            <Image
              source={require("../../assets/images/perfilplaceholder.png")}
              style={styles.profileImage}
            />
          </View>
        </View>

        {/* Info do perfil */}
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
    backgroundColor: "#B4E197",
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

  // Novo container para foto + moldura
  profileWrapper: {
    position: "absolute",
    top: -90,
    left: 10,
    width: 180,
    height: 180,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
  },

  profileCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#C4C4C4",
    borderWidth: 3,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    overflow: "hidden", // para a foto não sair do círculo
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  frameOutside: {
    position: "absolute",
    width: 200,
    height: 200,
    top: -30,
    zIndex: 3,
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
