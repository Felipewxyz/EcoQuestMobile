import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useRef, useState, useEffect } from "react";
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
  const [percentComum, setPercentComum] = useState(0);
  const [percentExtra, setPercentExtra] = useState(0);

  const carregarProgresso = async () => {
    try {
      // Zera tudo antes de carregar
      animComum.setValue(0);
      animExtra.setValue(0);
      setPercentComum(0);
      setPercentExtra(0);

      const valorComum = await AsyncStorage.getItem("progresso_pratica_comum");
      const valorExtra = await AsyncStorage.getItem("progresso_pratica_extra");

      const pComum = valorComum ? parseFloat(valorComum) : 0;
      const pExtra = valorExtra ? parseFloat(valorExtra) : 0;

      // Anima o progresso e a porcentagem
      Animated.timing(animComum, {
        toValue: pComum,
        duration: 1000,
        useNativeDriver: false,
      }).start();

      Animated.timing(animExtra, {
        toValue: pExtra,
        duration: 1000,
        useNativeDriver: false,
      }).start();

      // Faz a contagem animada da porcentagem
      let inicio = 0;
      const intervalo = setInterval(() => {
        inicio += 1;
        if (inicio >= Math.round(pComum * 100)) {
          inicio = Math.round(pComum * 100);
          clearInterval(intervalo);
        }
        setPercentComum(inicio);
      }, 10);

      let inicioExtra = 0;
      const intervaloExtra = setInterval(() => {
        inicioExtra += 1;
        if (inicioExtra >= Math.round(pExtra * 100)) {
          inicioExtra = Math.round(pExtra * 100);
          clearInterval(intervaloExtra);
        }
        setPercentExtra(inicioExtra);
      }, 10);
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

  const animatedValue = useRef(new Animated.Value(0)).current;
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    // Se for null/undefined, zera
    const validProgress = isNaN(progress) || progress < 0 ? 0 : progress;

    Animated.timing(animatedValue, {
      toValue: validProgress,
      duration: 900,
      useNativeDriver: false,
    }).start();

    const interval = setInterval(() => {
      animatedValue.addListener(({ value }) => {
        const newPercent = Math.round(value * 100);
        setPercent(isNaN(newPercent) ? 0 : newPercent);
      });
    }, 100);

    return () => {
      animatedValue.removeAllListeners();
      clearInterval(interval);
    };
  }, [progress]);

  const animatedStroke = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  const AnimatedCircle = Animated.createAnimatedComponent(Circle);

  return (
    <Pressable onPress={onPress}>
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
            // Começa às 6h e vai no sentido horário
            transform={`rotate(90 ${size / 2} ${size / 2}) scale(1, -1) translate(0, -${size})`}
          />
        </Svg>
        <View style={styles.iconInside}>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: strokeColor }}>
            {percent}%
          </Text>
        </View>
      </View>
    </Pressable>
  );
};



  const BlocoTema = ({ title, onPress, isExtras }) => (
    <>
      {/* ===== Caixa X.1 ===== */}
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

      {/* ===== Caixa X.2 ===== */}
      <View style={styles.greenBox}>
        <View style={styles.iconGrid}>
          {[0, 1, 2, 3].map((i) => (
            <View key={i} style={styles.circleItem}>
              <CircleProgress
                progress={isExtras ? animExtra : animComum}
                percent={isExtras ? percentExtra : percentComum}
                onPress={onPress}
              />
            </View>
          ))}
        </View>
      </View>
    </>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 60 }}>
      {/* ===== Roda-teto ===== */}
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

      {/* ===== Caixa 1 (Práticas Comuns) ===== */}
      <BlocoTema
        title="Práticas Comuns"
        onPress={() => navigation.navigate("PraticaComum")}
        isExtras={false}
      />

      {/* ===== Caixa 2 (Práticas Extras) ===== */}
      <BlocoTema
        title="Práticas Extras"
        onPress={() => navigation.navigate("PraticaExtra")}
        isExtras={true}
      />

      {/* ===== Roda-pé ===== */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>EcoQuest 🌿 • Cuidar do planeta é evoluir</Text>
      </View>
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
    transform: [{ translateX: -17 }, { translateY: -12 }],
  },
  percentText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#019314",
  },
  footer: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
  },
  footerText: {
    color: "#019314",
    fontSize: 14,
    opacity: 0.7,
  },
});
