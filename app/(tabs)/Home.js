import React, { useRef, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, StyleSheet, Text, View, Animated, ScrollView } from "react-native";
import Svg, { Circle } from "react-native-svg";

export default function Home() {
  const navigation = useNavigation();

  const [progressos, setProgressos] = useState([0.2, 0.5, 0.8, 1]);
  const anims = progressos.map(() => useRef(new Animated.Value(0)).current);

  useEffect(() => {
    progressos.forEach((valor, i) => {
      Animated.timing(anims[i], {
        toValue: valor,
        duration: 800,
        useNativeDriver: false,
      }).start();
    });
  }, [progressos]);

  const AnimatedCircle = Animated.createAnimatedComponent(Circle);

  const CircleProgress = ({ progress, onPress }) => {
    const size = 90;
    const strokeWidth = 6;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const animatedStroke = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [circumference, 0],
    });

    return (
      <View style={styles.circleContainer}>
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
            stroke="#019314"
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={animatedStroke}
            strokeLinecap="round"
          />
        </Svg>
        <Pressable
          style={styles.iconInside}
          onPress={onPress}
        >
          <Ionicons name="home-outline" size={40} color="#019314" />
        </Pressable>
      </View>
    );
  };

  const BlocoTema = ({ title, progressOnPress, isFirst }) => (
    <>
      {/* Bloco Prática Comum / Extra */}
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

      {/* Quadrado verde com quatro círculos */}
      <View style={[styles.greenBox, !isFirst && styles.extraSpacing]}>
        <View style={styles.progressGrid}>
          <CircleProgress progress={anims[0]} onPress={progressOnPress} />
          <CircleProgress progress={anims[1]} onPress={progressOnPress} />
          <CircleProgress progress={anims[2]} onPress={progressOnPress} />
          <CircleProgress progress={anims[3]} onPress={progressOnPress} />
        </View>
      </View>
    </>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Cabeçalho de ícones */}
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

      {/* Primeiro bloco: Comuns */}
      <BlocoTema
        title="Práticas Comuns"
        progressOnPress={() => navigation.navigate("PraticaComum")}
        isFirst={true}
      />

      {/* Segundo bloco: Extras */}
      <BlocoTema
        title="Práticas Extras"
        progressOnPress={() => navigation.navigate("PraticaExtra")}
        isFirst={false}
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
    marginTop: 10, // diminuiu espaço acima do primeiro quadrado
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
  greenBox: {
    borderWidth: 2,
    borderColor: "#019314",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  extraSpacing: {
    marginBottom: 30,
  },
  progressGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  circleContainer: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  iconInside: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -20 }, { translateY: -20 }],
  },
});
