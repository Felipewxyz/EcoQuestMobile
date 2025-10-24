import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Svg, { Circle } from "react-native-svg";

export default function Home() {
  const navigation = useNavigation();

  const animComum = useRef(new Animated.Value(0)).current;
  const animExtra = useRef(new Animated.Value(0)).current;

  const [progressoComum, setProgressoComum] = useState(0);
  const [progressoExtra, setProgressoExtra] = useState(0);

  // --- Função para carregar o progresso de cada tipo ---
  const carregarProgresso = async () => {
    try {
      const valorComum = await AsyncStorage.getItem("progresso_pratica_comum");
      const valorExtra = await AsyncStorage.getItem("progresso_pratica_extra");

      const pComum = valorComum ? parseFloat(valorComum) : 0;
      const pExtra = valorExtra ? parseFloat(valorExtra) : 0;

      setProgressoComum(pComum);
      setProgressoExtra(pExtra);

      // só anima se tiver progresso real (> 0)
      if (pComum > 0) {
        Animated.timing(animComum, {
          toValue: pComum,
          duration: 900,
          useNativeDriver: false,
        }).start();
      } else {
        animComum.setValue(0);
      }

      if (pExtra > 0) {
        Animated.timing(animExtra, {
          toValue: pExtra,
          duration: 900,
          useNativeDriver: false,
        }).start();
      } else {
        animExtra.setValue(0);
      }
    } catch (e) {
      console.log("Erro ao carregar progresso:", e);
    }
  };

  // Atualiza sempre que voltar para a Home
  useFocusEffect(
    React.useCallback(() => {
      carregarProgresso();
    }, [])
  );

  // --- Componente de Barra Circular ---
  const CircleProgress = ({ animatedValue, size = 90, strokeColor = "#019314" }) => {
    const strokeWidth = 6;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const [percent, setPercent] = useState(0);

    useEffect(() => {
      const id = animatedValue.addListener(({ value }) => {
        setPercent(Math.max(0, Math.min(100, Math.round(value * 100))));
      });
      return () => animatedValue.removeListener(id);
    }, [animatedValue]);

    const animatedStroke = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [circumference, 0],
    });

    const AnimatedCircle = Animated.createAnimatedComponent(Circle);

    return (
      <View style={[styles.circleContainer, { width: size, height: size }]}>
        <Svg width={size} height={size}>
          {/* fundo cinza */}
          <Circle
            stroke="#C8C8C8"
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
          />
          {/* barra da esquerda pra direita */}
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
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </Svg>

        {/* porcentagem central */}
        <View style={styles.iconInside}>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: strokeColor }}>
            {percent}%
          </Text>
        </View>
      </View>
    );
  };

  // --- Bloco de cada tema ---
  const BlocoTema = ({ title, onPress, tipo }) => (
    <>
      {/* Caixa 1.1 e 2.1 */}
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

      {/* Caixa 1.2 e 2.2 */}
      <View style={styles.greenBox}>
        <View style={styles.iconGrid}>
          {[0, 1, 2, 3].map((i) => (
            <View key={i} style={styles.circleItem}>
              <Pressable onPress={onPress}>
                <CircleProgress
                  animatedValue={tipo === "extra" ? animExtra : animComum}
                />
              </Pressable>
            </View>
          ))}
        </View>
      </View>
    </>
  );

  // --- Renderização principal ---
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

      {/* Caixa 1 - Práticas Comuns */}
      <BlocoTema
        title="Práticas Comuns"
        onPress={() => navigation.navigate("PraticaComum")}
        tipo="comum"
      />

      {/* Caixa 2 - Práticas Extras */}
      <BlocoTema
        title="Práticas Extras"
        onPress={() => navigation.navigate("PraticaExtra")}
        tipo="extra"
      />

      {/* Roda-pé */}
      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

// --- Estilos ---
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
    marginBottom: 10,
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
    marginBottom: 20,
    alignItems: "center",
  },
  iconGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  circleItem: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  circleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconInside: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -16 }, { translateY: -16 }],
  },
});
