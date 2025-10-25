import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BlurView } from "expo-blur";

const screenWidth = Dimensions.get("window").width;

export default function Conquistas() {
  const router = useRouter();
  const pathname = usePathname();
  const [year, setYear] = useState(2025);
  const animValue = useRef(new Animated.Value(0)).current;

  // Lista de 12 imagens (uma por mês)
  const imagesList = [
    require("../../assets/images/AnoNovoPlanetaNovo.png"), // Jan
    require("../../assets/images/EcoFolia.png"),           // Fev
    require("../../assets/images/GuardiaDaAgua.png"),      // Mar
    require("../../assets/images/HeroiDaTerra.png"),       // Abr
    require("../../assets/images/MaeNatureza.png"),        // Mai
    require("../../assets/images/ArraiaQuest.png"),        // Jun
    require("../../assets/images/FeriasEcologicas.png"),   // Jul
    require("../../assets/images/CavaleiroDoVento.png"),   // Ago
    require("../../assets/images/JardineiraDoPlaneta.png"),// Set
    require("../../assets/images/AssombracaoDoLixo.png"),  // Out
    require("../../assets/images/CaminhanteDoBem.png"),    // Nov
    require("../../assets/images/CaminhanteDoBem.png"),    // Dez
  ];

  const months = [
    "Jan.",
    "Fev.",
    "Mar.",
    "Abr.",
    "Mai.",
    "Jun.",
    "Jul.",
    "Ago.",
    "Set.",
    "Out.",
    "Nov.",
    "Dez.",
  ];

  const animateYearChange = (newYear) => {
    Animated.sequence([
      Animated.timing(animValue, {
        toValue: 1,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(animValue, {
        toValue: 0,
        duration: 200,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => setYear(newYear));
  };

  const handlePreviousYear = () => {
    if (year === 2025) animateYearChange(2024);
  };

  const handleNextYear = () => {
    if (year === 2024) animateYearChange(2025);
  };

  const translateY = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  const opacity = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const isQuests = pathname?.toLowerCase().includes("quests");
  const isConquistas = pathname?.toLowerCase().includes("conquistas");

  const firstDigits = Math.floor(year / 10);
  const lastDigit = year % 10;

  // meses bloqueados: Abril (3), Julho (6), Dezembro (11)
  const lockedMonths = [3, 6, 11];

  return (
    <View style={styles.container}>
      {/* Header azul com botões e ano */}
      <View style={styles.headerContainer}>
        <View style={styles.tabButtonsContainer}>
          {/* Botão Quests */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              onPress={() => !isQuests && router.push("/Quests")}
              style={styles.tabTouchable}
            >
              <Text
                style={[
                  styles.tabText,
                  isQuests ? styles.tabTextSelected : styles.tabTextUnselected,
                ]}
              >
                Quests
              </Text>
            </TouchableOpacity>
            <View
              style={[
                styles.tabBar,
                isQuests ? styles.tabBarActive : styles.tabBarInactive,
              ]}
            />
          </View>

          {/* Botão Conquistas */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              onPress={() => !isConquistas && router.push("/Conquistas")}
              style={styles.tabTouchable}
            >
              <Text
                style={[
                  styles.tabText,
                  isConquistas
                    ? styles.tabTextSelected
                    : styles.tabTextUnselected,
                ]}
              >
                Conquistas
              </Text>
            </TouchableOpacity>
            <View
              style={[
                styles.tabBar,
                isConquistas ? styles.tabBarActive : styles.tabBarInactive,
              ]}
            />
          </View>
        </View>

        {/* Ano animado */}
        <View style={styles.yearContainer}>
          <TouchableOpacity onPress={handlePreviousYear} disabled={year === 2024}>
            <Ionicons
              name="chevron-back"
              size={42}
              color="#FFF"
              style={{ opacity: year === 2024 ? 0.3 : 1 }}
            />
          </TouchableOpacity>

          <View style={styles.yearInnerContainer}>
            <Text style={styles.yearTextFixed}>{firstDigits}</Text>
            <Animated.Text
              style={[
                styles.yearTextAnimated,
                { opacity, transform: [{ translateY }] },
              ]}
            >
              {lastDigit}
            </Animated.Text>
          </View>

          <TouchableOpacity onPress={handleNextYear} disabled={year === 2025}>
            <Ionicons
              name="chevron-forward"
              size={42}
              color="#FFF"
              style={{ opacity: year === 2025 ? 0.3 : 1 }}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Conteúdo rolável */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.bottomContainer}>
          <View style={styles.imagesContainer}>
            {imagesList.map((imgSource, index) => {
              const isLocked = lockedMonths.includes(index);
              return (
                <View key={index} style={styles.imageWrapper}>
                  <View style={styles.imageContainer}>
                    <Image source={imgSource} style={styles.imageItem} />
                    {isLocked && (
                      <>
                        <BlurView intensity={45} tint="light" style={styles.blurOverlay} />
                        <Ionicons
                          name="lock-closed"
                          size={50} // 🔒 maior
                          color="rgba(0,0,0,0.65)"
                          style={styles.lockIcon}
                        />
                      </>
                    )}
                  </View>
                  <Text style={styles.imageLabel}>{months[index]}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  headerContainer: {
    backgroundColor: "#1E90FF",
    paddingTop: 10,
    paddingHorizontal: 16,
    paddingBottom: 10,
  },

  tabButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },

  tabContainer: {
    flex: 1,
    alignItems: "center",
  },

  tabTouchable: {
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
  },

  tabText: {
    fontSize: 22,
    fontWeight: "900",
  },

  tabTextSelected: {
    color: "#FFFFFF",
    opacity: 1,
  },

  tabTextUnselected: {
    color: "#FFFFFF",
    opacity: 0.5,
  },

  tabBar: {
    height: 5,
    width: "90%",
    borderRadius: 3,
    marginTop: -1,
  },

  tabBarActive: {
    backgroundColor: "#FFFFFF",
    opacity: 1,
  },

  tabBarInactive: {
    backgroundColor: "#FFFFFF",
    opacity: 0.3,
  },

  yearContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    width: "70%",
    alignSelf: "center",
  },

  yearInnerContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
  },

  yearTextFixed: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "900",
  },

  yearTextAnimated: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "900",
    marginLeft: 2,
  },

  scrollContent: {
    alignItems: "center",
    paddingBottom: 20,
  },

  bottomContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    paddingTop: 20,
  },

  imagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "90%",
  },

  imageWrapper: {
    alignItems: "center",
    marginBottom: 14,
  },

  imageContainer: {
    position: "relative",
    borderRadius: 8,
    overflow: "hidden",
  },

  imageItem: {
    width: screenWidth * 0.42,
    height: 165,
    borderRadius: 8,
    resizeMode: "cover",
    resizeMode: "contain"
  },

  blurOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8,
  },

  lockIcon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }], // 🔒 centralizado perfeitamente
  },

  imageLabel: {
    marginTop: 6,
    fontSize: 16,
    color: "#000000",
    fontWeight: "bold",
  },
});
