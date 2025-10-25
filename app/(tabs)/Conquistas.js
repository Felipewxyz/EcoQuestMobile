import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Animated, Dimensions, Easing, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function Conquistas() {
  const router = useRouter();
  const pathname = usePathname();
  const [year, setYear] = useState(2025);
  const animValue = useRef(new Animated.Value(0)).current;

  // Lista com 12 imagens
  const imagesList = [
    require("../../assets/images/AnoNovoPlanetaNovo.png"),
    require("../../assets/images/EcoFolia.png"),
    require("../../assets/images/GuardiaDaAgua.png"),
    require("../../assets/images/HeroiDaTerra.png"),
    require("../../assets/images/Imagem5.png"),
    require("../../assets/images/Imagem6.png"),
    require("../../assets/images/Imagem7.png"),
    require("../../assets/images/Imagem8.png"),
    require("../../assets/images/Imagem9.png"),
    require("../../assets/images/Imagem10.png"),
    require("../../assets/images/Imagem11.png"),
    require("../../assets/images/Imagem12.png"),
  ];

  const animateYearChange = (newYear) => {
    Animated.sequence([
      Animated.timing(animValue, { toValue: 1, duration: 200, easing: Easing.out(Easing.ease), useNativeDriver: true }),
      Animated.timing(animValue, { toValue: 0, duration: 200, easing: Easing.in(Easing.ease), useNativeDriver: true }),
    ]).start(() => setYear(newYear));
  };

  const handlePreviousYear = () => { if (year === 2025) animateYearChange(2024); };
  const handleNextYear = () => { if (year === 2024) animateYearChange(2025); };

  const translateY = animValue.interpolate({ inputRange: [0, 1], outputRange: [0, -20] });
  const opacity = animValue.interpolate({ inputRange: [0, 1], outputRange: [1, 0] });

  const isQuests = pathname?.toLowerCase().includes("quests");
  const isConquistas = pathname?.toLowerCase().includes("conquistas");

  const firstDigits = Math.floor(year / 10);
  const lastDigit = year % 10;

  return (
    <View style={styles.container}>
      {/* Header azul com botões e ano */}
      <View style={styles.headerContainer}>
        <View style={styles.tabButtonsContainer}>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              onPress={() => !isQuests && router.push("/Quests")}
              style={styles.tabTouchable}
            >
              <Text style={[styles.tabText, isQuests ? styles.tabTextSelected : styles.tabTextUnselected]}>
                Quests
              </Text>
            </TouchableOpacity>
            <View style={[styles.tabBar, isQuests ? styles.tabBarActive : styles.tabBarInactive]} />
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity
              onPress={() => !isConquistas && router.push("/Conquistas")}
              style={styles.tabTouchable}
            >
              <Text style={[styles.tabText, isConquistas ? styles.tabTextSelected : styles.tabTextUnselected]}>
                Conquistas
              </Text>
            </TouchableOpacity>
            <View style={[styles.tabBar, isConquistas ? styles.tabBarActive : styles.tabBarInactive]} />
          </View>
        </View>

        {/* Ano animado */}
        <View style={styles.yearContainer}>
          <TouchableOpacity onPress={handlePreviousYear} disabled={year === 2024}>
            <Ionicons name="chevron-back" size={42} color="#FFF" style={{ opacity: year === 2024 ? 0.3 : 1 }} />
          </TouchableOpacity>

          <View style={styles.yearInnerContainer}>
            <Text style={styles.yearTextFixed}>{firstDigits}</Text>
            <Animated.Text style={[styles.yearTextAnimated, { opacity, transform: [{ translateY }] }]}>{lastDigit}</Animated.Text>
          </View>

          <TouchableOpacity onPress={handleNextYear} disabled={year === 2025}>
            <Ionicons name="chevron-forward" size={42} color="#FFF" style={{ opacity: year === 2025 ? 0.3 : 1 }} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Conteúdo rolável */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.bottomContainer}>
          <View style={styles.imagesContainer}>
            {imagesList.map((imgSource, index) => (
              <Image
                key={index}
                source={imgSource}
                style={styles.imageItem}
              />
            ))}
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

  imageItem: {
    width: screenWidth * 0.40, // 40% da tela
    height: 160,
    marginBottom: 10,
    borderRadius: 8,
    resizeMode: "cover",
  },
});
