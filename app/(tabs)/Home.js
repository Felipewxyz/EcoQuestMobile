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
} from "react-native";
import Svg, { Circle } from "react-native-svg";

export default function Home() {
  const navigation = useNavigation();
  const route = useRoute();

  const tema1Ref = useRef(null);
  const tema2Ref = useRef(null);
  const tema3Ref = useRef(null);

  const scrollViewRef = useRef(null);

  const animComum = useRef(new Animated.Value(0)).current;
  const animExtra = useRef(new Animated.Value(0)).current;

  const [progressoComum, setProgressoComum] = useState(0);
  const [progressoExtra, setProgressoExtra] = useState(0);

  // Carregar progresso salvo
  const carregarProgresso = async () => {
    try {
      const valorComum = await AsyncStorage.getItem("progresso_pratica_comum");
      const valorExtra = await AsyncStorage.getItem("progresso_pratica_extra");
      const pComum = valorComum ? parseFloat(valorComum) : 0;
      const pExtra = valorExtra ? parseFloat(valorExtra) : 0;

      setProgressoComum(pComum);
      setProgressoExtra(pExtra);

      animComum.setValue(pComum);
      animExtra.setValue(pExtra);
    } catch (e) {
      console.log("Erro ao carregar progresso:", e);
    }
  };

  // Scroll automático para o tema selecionado
  useFocusEffect(
    React.useCallback(() => {
      carregarProgresso();

      const scrollTo = route.params?.scrollTo;

      if (scrollTo && scrollViewRef.current) {
        setTimeout(() => {
          let ref;
          if (scrollTo === "tema1") ref = tema1Ref;
          if (scrollTo === "tema2") ref = tema2Ref;
          if (scrollTo === "tema3") ref = tema3Ref;

          if (ref?.current) {
            const nodeHandle = findNodeHandle(ref.current);
            const scrollHandle =
              findNodeHandle(scrollViewRef.current) ||
              scrollViewRef.current?.getInnerViewNode?.();

            if (nodeHandle && scrollHandle) {
              UIManager.measureLayout(
                nodeHandle,
                scrollHandle,
                () => { },
                (x, y, width, height) => {
                  scrollViewRef.current?.scrollTo({ y: y - 20, animated: true });
                }
              );
            }
          }
        }, 400);
      }
    }, [route.params])
  );

  // Barra circular
  // Barra circular
  const CircleProgress = ({ animatedValue, size = 160, strokeColor = "#019314" }) => {
    const strokeWidth = 10; // 🔹 Aumentei a espessura
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
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </Svg>

        <View style={styles.iconInside}>
          <Text style={{ fontSize: 22, fontWeight: "bold", color: strokeColor }}>
            {percent}%
          </Text>
        </View>
      </View>
    );
  };

  // Linha divisória
  const LinhaDivisoria = () => (
    <View
      style={{
        height: 1.5,
        backgroundColor: "#019314",
        opacity: 0.2,
        marginVertical: 8,
        borderRadius: 10,
      }}
    />
  );

  // Bloco de tema
  const BlocoTema = ({ temaTitle, subtitulo, tipo, onPress, temaTitleStyle, innerRef }) => (
    <View ref={innerRef} collapsable={false}>
      <View style={styles.themeBox}>
        <View style={styles.themeTextContainer}>
          <Text style={[styles.themeTitle, temaTitleStyle]}>{temaTitle}</Text>
          <Text style={styles.themeSubtitle}>{subtitulo}</Text>
        </View>
        <View style={styles.divider} />
        <Pressable onPress={() => navigation.navigate("Temas")}>
          <Ionicons name="journal-outline" size={40} color="#019314" />
        </Pressable>
      </View>

      <View style={styles.greenBox}>
        <View style={styles.singleCircleContainer}>
          <Pressable onPress={onPress}>
            <CircleProgress
              animatedValue={tipo === "extra" ? animExtra : animComum}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
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

      {/* TEMA 1 */}
      <BlocoTema
        innerRef={tema1Ref}
        temaTitle="O Poder do Consumo Invisível"
        subtitulo="Tema 1 - Práticas Comuns"
        tipo="comum"
        onPress={() => navigation.navigate("PraticaComum")}
        temaTitleStyle={{ fontSize: 16 }}
      />
      <BlocoTema
        temaTitle="O Poder do Consumo Invisível"
        subtitulo="Tema 1 - Práticas Extras"
        tipo="extra"
        onPress={() => navigation.navigate("PraticaExtra")}
        temaTitleStyle={{ fontSize: 16 }}
      />

      <LinhaDivisoria />

      {/* TEMA 2 */}
      <BlocoTema
        innerRef={tema2Ref}
        temaTitle="A Água que Você Não Vê"
        subtitulo="Tema 2 - Práticas Comuns"
        tipo="comum"
        onPress={() => navigation.navigate("PraticaComum")}
        temaTitleStyle={{ fontSize: 16 }}
      />
      <BlocoTema
        temaTitle="A Água que Você Não Vê"
        subtitulo="Tema 2 - Práticas Extras"
        tipo="extra"
        onPress={() => navigation.navigate("PraticaExtra")}
        temaTitleStyle={{ fontSize: 16 }}
      />

      <LinhaDivisoria />

      {/* TEMA 3 */}
      <BlocoTema
        innerRef={tema3Ref}
        temaTitle="A Natureza Dentro de Casa"
        subtitulo="Tema 3 - Práticas Comuns"
        tipo="comum"
        onPress={() => navigation.navigate("PraticaComum")}
        temaTitleStyle={{ fontSize: 16 }}
      />
      <BlocoTema
        temaTitle="A Natureza Dentro de Casa"
        subtitulo="Tema 3 - Práticas Extras"
        tipo="extra"
        onPress={() => navigation.navigate("PraticaExtra")}
        temaTitleStyle={{ fontSize: 16 }}
      />

      <View style={{ height: 40 }} />
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
  singleCircleContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 25,
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
