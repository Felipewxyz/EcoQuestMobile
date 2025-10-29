import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  findNodeHandle,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  UIManager,
  View,
  InteractionManager,
} from "react-native";
import Svg, { Circle } from "react-native-svg";

export default function Home() {
  const navigation = useNavigation();
  const route = useRoute();

  // refs para cada bloco por tema
  const temaRefs = [
    { extra: useRef(null), comum: useRef(null), extra2: useRef(null), comum2: useRef(null) },
    { extra: useRef(null), comum: useRef(null), extra2: useRef(null), comum2: useRef(null) },
    { extra: useRef(null), comum: useRef(null), extra2: useRef(null), comum2: useRef(null) },
  ];

  const scrollViewRef = useRef(null);

  // progresso separado por tipo
  const [progresso, setProgresso] = useState({
    comum: [0, 0, 0],
    extra: [0, 0, 0],
  });

  // animValues separados por tipo e tema
  const animValues = useRef({
    comum: [new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)],
    extra: [new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)],
  }).current;

  // ================= Carregar progresso =================
  useFocusEffect(
    React.useCallback(() => {
      const carregarProgresso = async () => {
        try {
          const chavesComum = ["pratica1", "pratica2", "pratica3"];
          const valoresComum = await Promise.all(
            chavesComum.map(async (key) => {
              const value = await AsyncStorage.getItem(key);
              return value ? parseFloat(value) : 0;
            })
          );

          const chavesExtra = ["extra1", "extra2", "extra3"];
          const valoresExtra = await Promise.all(
            chavesExtra.map(async (key) => {
              const value = await AsyncStorage.getItem(key);
              return value ? parseFloat(value) : 0;
            })
          );

          setProgresso({ comum: valoresComum, extra: valoresExtra });

          // animar cada barra individualmente
          valoresComum.forEach((p, i) => {
            Animated.timing(animValues.comum[i], {
              toValue: p > 1 ? p / 100 : p,
              duration: 800,
              useNativeDriver: true,
            }).start();
          });

          valoresExtra.forEach((p, i) => {
            Animated.timing(animValues.extra[i], {
              toValue: p > 1 ? p / 100 : p,
              duration: 800,
              useNativeDriver: true,
            }).start();
          });

          console.log("🔁 Progresso atualizado:", { comum: valoresComum, extra: valoresExtra });
        } catch (error) {
          console.log("Erro ao carregar progresso:", error);
        }
      };

      carregarProgresso();
    }, [])
  );

  // ================= Scroll automático =================
  useFocusEffect(
    React.useCallback(() => {
      const { scrollTo, bloco } = route.params || {};
      if (typeof scrollTo === "number" && temaRefs[scrollTo]) {
        const blocoAlvo = bloco && temaRefs[scrollTo][bloco] ? bloco : "comum";
        const refAlvo = temaRefs[scrollTo][blocoAlvo]?.current;

        if (refAlvo && scrollViewRef.current) {
          const nodeHandle = findNodeHandle(refAlvo);
          const scrollHandle = findNodeHandle(scrollViewRef.current);

          if (nodeHandle && scrollHandle) {
            InteractionManager.runAfterInteractions(() => {
              UIManager.measureLayout(
                nodeHandle,
                scrollHandle,
                () => { },
                (x, y) => {
                  scrollViewRef.current.scrollTo({ y: y - 40, animated: true });
                }
              );
            });
          }
        }
      }
    }, [route.params])
  );

  // ================= Componentes =================
  const CircleProgress = ({ index, tipo = "comum", size = 140, onPress }) => {
    const strokeWidth = 10;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    const animatedStroke = animValues[tipo][index].interpolate({
      inputRange: [0, 1],
      outputRange: [circumference, 0],
    });

    const AnimatedCircle = Animated.createAnimatedComponent(Circle);
    const percent = Math.round((progresso[tipo][index] || 0) * 100);
    const strokeColor = progresso[tipo][index] > 0 ? "#019314" : "#C8C8C8";

    return (
      <Pressable onPress={onPress} style={[styles.circleContainer, { width: size, height: size }]}>
        <Svg width={size} height={size}>
          <Circle
            stroke="#E0E0E0"
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
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </Svg>
        <View style={styles.iconInside}>
          <Text style={{ fontSize: 20, fontWeight: "700", color: "#019314" }}>{percent}%</Text>
        </View>
      </Pressable>
    );
  };

  const BlocoExtra = ({ innerRef, title, index, tipo, onPress }) => (
    <View ref={innerRef} collapsable={false}>
      <View style={styles.themeBox}>
        <View style={styles.themeTextContainer}>
          <Text style={styles.themeTitle}>{title}</Text>
          <Text style={styles.themeSubtitle}>
            {`Tema ${String(index + 1).padStart(2, "0")} - Prática ${tipo}`}
          </Text>
        </View>
        <View style={styles.divider} />
        <Pressable onPress={onPress}>
          <Ionicons name="journal-outline" size={36} color="#019314" />
        </Pressable>
      </View>
    </View>
  );

  const BlocoComum = ({ innerRef, index, tipo = "comum", onPress }) => (
    <View ref={innerRef} collapsable={false}>
      <View style={styles.greenBox}>
        <CircleProgress index={index} tipo={tipo} onPress={onPress} />
      </View>
    </View>
  );

  const temas = [
    "O Poder do Consumo Invisível",
    "A Água que Você Não Vê",
    "A Natureza Dentro de Casa",
  ];

  return (
    <ScrollView ref={scrollViewRef} style={styles.container}>
      {/* Topo */}
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

      {temas.map((t, i) => (
        <View key={i}>
          {/* Bloco Extra Comum */}
          <BlocoExtra
            innerRef={temaRefs[i].extra}
            title={t}
            index={i}
            tipo="Comum"
            onPress={() => navigation.navigate("Temas", { scrollTo: i })}
          />
          <BlocoComum
            innerRef={temaRefs[i].comum}
            index={i}
            tipo="comum"
            onPress={() => navigation.navigate("PraticaComum", { scrollTo: i })}
          />

          {/* Bloco Extra Extra */}
          <BlocoExtra
            innerRef={temaRefs[i].extra2}
            title={t}
            index={i}
            tipo="Extra"
            onPress={() => navigation.navigate("Temas", { scrollTo: i })}
          />
          <BlocoComum
            innerRef={temaRefs[i].comum2}
            index={i}
            tipo="extra"
            onPress={() =>
              navigation.navigate("PraticaExtra", { initialQuiz: i + 1, scrollTo: i })
            }
          />
        </View>
      ))}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF", paddingTop: 40, paddingHorizontal: 20 },
  topIcons: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  iconItem: { flexDirection: "row", alignItems: "center" },
  icon: { width: 50, height: 50, marginRight: 6 },
  iconText: { fontSize: 18, fontWeight: "bold", color: "#000" },
  themeBox: {
    backgroundColor: "#FFFFFF",
    borderColor: "#019314",
    borderWidth: 2,
    borderRadius: 10,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 80,
    marginTop: 10,
  },
  themeTextContainer: { flex: 1 },
  themeTitle: { color: "#019314", fontSize: 16, fontWeight: "bold", opacity: 0.85 },
  themeSubtitle: { color: "#019314", fontSize: 14, fontWeight: "500" },
  divider: { width: 2, height: "80%", backgroundColor: "#019314", marginHorizontal: 12, opacity: 0.8 },
  greenBox: {
    borderWidth: 2,
    borderColor: "#019314",
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 18,
    alignItems: "center",
  },
  circleContainer: { alignItems: "center", justifyContent: "center" },
  iconInside: { position: "absolute", top: "50%", left: "50%", transform: [{ translateX: -18 }, { translateY: -12 }] },
});
