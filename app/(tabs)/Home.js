import React, { useRef, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Animated,
  ScrollView,
} from "react-native";
import Svg, { Circle } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const navigation = useNavigation();
  const anim = useRef(new Animated.Value(0)).current;
  const [progressoComum, setProgressoComum] = useState(0);

  const carregarProgresso = async () => {
    try {
      const valor = await AsyncStorage.getItem("progresso_pratica_comum");
      const p = valor ? parseFloat(valor) : 0;
      setProgressoComum(p);
      Animated.timing(anim, {
        toValue: p,
        duration: 900,
        useNativeDriver: false,
      }).start();
    } catch (e) {
      console.log("Erro ao carregar progresso:", e);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      carregarProgresso();
    }, [])
  );

  const AnimatedCircle = Animated.createAnimatedComponent(Circle);

  const CircleProgress = ({ progress, onPress, size = 90, strokeColor = "#019314" }) => {
    const strokeWidth = 6;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const animatedStroke = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [circumference, 0],
    });

    return (
      <View style={[styles.circleContainer, { width: size, height: size }]}>
        <Svg width={size} height={size}>
          <Circle
            stroke="#C8C8C8"
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <AnimatedCircle
            stroke={strokeColor}
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={animatedStroke}
            strokeLinecap="round"
            transform={`rotate(90 ${size / 2} ${size / 2})`}
          />
        </Svg>
        <Pressable style={styles.iconInside} onPress={onPress}>
          <Ionicons name="leaf-outline" size={38} color={strokeColor} />
        </Pressable>
      </View>
    );
  };

  const BlocoTema = ({ title, onPress, isExtras }) => (
    <>
      <View style={styles.themeBox}>
        <View style={styles.themeTextContainer}>
          <Text style={styles.themeTitle}>TEMA 01</Text>
          <Text style={styles.themeSubtitle}>{title}</Text>
        </View>
        <View style={styles.divider} />
        <Pressable onPress={() => navigation.navigate("Temas")}>
          <Ionicons name="journal-outline" size={40} color="#019314" />
        </Pressable>
      </View>

      {/* ===== Quadrado Verde com Ícones (um por linha) ===== */}
      <View style={styles.greenBox}>
        {[0, 1, 2, 3].map((i) => (
          <View key={i} style={styles.circleRow}>
            <CircleProgress
              progress={isExtras ? new Animated.Value(1) : anim}
              onPress={onPress}
            />
          </View>
        ))}
      </View>
    </>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 60 }}>
      {/* Roda-teto */}
      <View style={styles.topIcons}>
        <View style={styles.iconItem}>
          <Image source={require("../../assets/images/gota.png")} style={styles.icon} />
          <Text style={styles.iconText}>5</Text>
        </View>
        <View style={styles.iconItem}>
          <Image source={require("../../assets/images/folha.png")} style={styles.icon} />
          <Text style={styles.iconText}>120</Text>
        </View>
        <View style={styles.iconItem}>
          <Image source={require("../../assets/images/coracao.png")} style={styles.icon} />
          <Text style={styles.iconText}>3</Text>
        </View>
      </View>

      {/* Caixa 1 (Práticas Comuns) */}
      <BlocoTema
        title="Práticas Comuns"
        onPress={() => navigation.navigate("PraticaComum")}
        isExtras={false}
      />

      {/* Caixa 2 (Práticas Extras) */}
      <BlocoTema
        title="Práticas Extras"
        onPress={() => navigation.navigate("PraticaExtra")}
        isExtras={true}
      />
    </ScrollView>
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
  icon: { width: 50, height: 50, marginRight: 6 },
  iconText: { fontSize: 18, fontWeight: "bold", color: "#000" },
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
    marginTop: 10,
  },
  themeTextContainer: { flex: 1 },
  themeTitle: { color: "#019314", fontSize: 20, fontWeight: "bold", opacity: 0.6 },
  themeSubtitle: { color: "#019314", fontSize: 16, fontWeight: "500" },
  divider: {
    width: 2,
    height: "80%",
    backgroundColor: "#019314",
    marginHorizontal: 12,
    opacity: 0.8,
  },
  greenBox: {
    borderWidth: 2,
    borderColor: "#019314",
    borderRadius: 15,
    paddingVertical: 25,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 30,
    alignItems: "center",
  },
  circleRow: {
    marginVertical: 10, // mantém o mesmo espaçamento vertical entre eles
    alignItems: "center",
    justifyContent: "center",
  },
  circleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconInside: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -19 }, { translateY: -19 }],
  },
});
