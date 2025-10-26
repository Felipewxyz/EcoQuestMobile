import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
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
  Modal,
} from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function Conquistas() {
  const router = useRouter();
  const pathname = usePathname();
  const [year, setYear] = useState(2025);
  const [selectedImage, setSelectedImage] = useState(null);
  const animValue = useRef(new Animated.Value(0)).current;

  const imagesList = [
    { src: require("../../assets/images/AnoNovoPlanetaNovo.png"), title: "Ano Novo, Planeta Novo" },
    { src: require("../../assets/images/EcoFolia.png"), title: "Eco Folia" },
    { src: require("../../assets/images/GuardiaDaAgua.png"), title: "Guardião da Água" },
    { src: require("../../assets/images/HeroiDaTerra.png"), title: "Herói da Terra" },
    { src: require("../../assets/images/MaeNatureza.png"), title: "Mãe Natureza" },
    { src: require("../../assets/images/ArraiaQuest.png"), title: "Arraiá Quest" },
    { src: require("../../assets/images/FeriasEcologicas.png"), title: "Férias Ecológicas" },
    { src: require("../../assets/images/CavaleiroDoVento.png"), title: "Cavaleiro do Vento" },
    { src: require("../../assets/images/JardineiraDoPlaneta.png"), title: "Jardineira do Planeta" },
    { src: require("../../assets/images/AssombracaoDoLixo.png"), title: "Assombração do Lixo" },
    { src: require("../../assets/images/CaminhanteDoBem.png"), title: "Caminhante do Bem" },
    { src: require("../../assets/images/RetrospectivaSustentavel.png"), title: "Retrospectiva Sustentável" },
  ];

  const months = ["Jan.", "Fev.", "Mar.", "Abr.", "Mai.", "Jun.", "Jul.", "Ago.", "Set.", "Out.", "Nov.", "Dez."];

  const lockedMonths = [3, 6, 10, 11]; // abril, julho, novembro e dezembro bloqueados

  const animateYearChange = (newYear) => {
    Animated.sequence([
      Animated.timing(animValue, { toValue: 1, duration: 200, easing: Easing.out(Easing.ease), useNativeDriver: true }),
      Animated.timing(animValue, { toValue: 0, duration: 200, easing: Easing.in(Easing.ease), useNativeDriver: true }),
    ]).start(() => setYear(newYear));
  };

  const handlePreviousYear = () => {
    if (year === 2025) animateYearChange(2024);
  };
  const handleNextYear = () => {
    if (year === 2024) animateYearChange(2025);
  };

  const translateY = animValue.interpolate({ inputRange: [0, 1], outputRange: [0, -20] });
  const opacity = animValue.interpolate({ inputRange: [0, 1], outputRange: [1, 0] });

  const isQuests = pathname?.toLowerCase().includes("quests");
  const isConquistas = pathname?.toLowerCase().includes("conquistas");

  const firstDigits = Math.floor(year / 10);
  const lastDigit = year % 10;

  const handleImagePress = (index, locked) => {
    setSelectedImage({ index, locked });
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerContainer}>
        <View style={styles.tabButtonsContainer}>
          <View style={styles.tabContainer}>
            <TouchableOpacity onPress={() => router.push("/Quests")} style={styles.tabTouchable}>
              <Text style={[styles.tabText, isQuests ? styles.tabTextSelected : styles.tabTextUnselected]}>
                Quests
              </Text>
            </TouchableOpacity>
            <View style={[styles.tabBar, isQuests ? styles.tabBarActive : styles.tabBarInactive]} />
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity onPress={() => router.push("/Conquistas")} style={styles.tabTouchable}>
              <Text style={[styles.tabText, isConquistas ? styles.tabTextSelected : styles.tabTextUnselected]}>
                Conquistas
              </Text>
            </TouchableOpacity>
            <View style={[styles.tabBar, isConquistas ? styles.tabBarActive : styles.tabBarInactive]} />
          </View>
        </View>

        {/* ANO */}
        <View style={styles.yearContainer}>
          <TouchableOpacity onPress={handlePreviousYear} disabled={year === 2024}>
            <Ionicons name="chevron-back" size={42} color="#FFF" style={{ opacity: year === 2024 ? 0.3 : 1 }} />
          </TouchableOpacity>

          <View style={styles.yearInnerContainer}>
            <Text style={styles.yearTextFixed}>{firstDigits}</Text>
            <Animated.Text style={[styles.yearTextAnimated, { opacity, transform: [{ translateY }] }]}>
              {lastDigit}
            </Animated.Text>
          </View>

          <TouchableOpacity onPress={handleNextYear} disabled={year === 2025}>
            <Ionicons name="chevron-forward" size={42} color="#FFF" style={{ opacity: year === 2025 ? 0.3 : 1 }} />
          </TouchableOpacity>
        </View>
      </View>

      {/* CONTEÚDO */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.bottomContainer}>
          <View style={styles.imagesContainer}>
            {imagesList.map((img, index) => {
              const locked = lockedMonths.includes(index);
              return (
                <TouchableOpacity key={index} onPress={() => handleImagePress(index, locked)}>
                  <View style={styles.imageWrapper}>
                    <View style={styles.imageContainer}>
                      <Image source={img.src} style={styles.imageItem} />
                      {locked && (
                        <>
                          <BlurView intensity={45} tint="light" style={styles.blurOverlay} />
                          <Ionicons
                            name="lock-closed"
                            size={50}
                            color="rgba(0,0,0,0.65)"
                            style={styles.lockIcon}
                          />
                        </>
                      )}
                    </View>
                    <Text style={styles.imageLabel}>{months[index]}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* MODAL */}
      {selectedImage && (
        <Modal transparent animationType="fade" visible={true} onRequestClose={() => setSelectedImage(null)}>
          <View style={styles.modalBackground}>
            <View style={styles.modalBox}>
              <Image source={imagesList[selectedImage.index].src} style={styles.modalImage} />
              <Text style={styles.modalTitle}>
                {imagesList[selectedImage.index].title}
              </Text>
              <Text style={styles.modalSubtitle}>
                {selectedImage.locked
                  ? "❌ Não foi dessa vez... mais sorte na próxima!"
                  : "🏆 Conquista recebida! Você ajudou o planeta!"}
              </Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  if (!selectedImage.locked) {
                    router.push({
                      pathname: "/Quests",
                      params: { monthIndex: selectedImage.index },
                    });
                  }
                  setSelectedImage(null);
                }}
              >
                <Text style={styles.modalButtonText}>Ver detalhes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  headerContainer: { backgroundColor: "#1E90FF", paddingTop: 10, paddingHorizontal: 16, paddingBottom: 10 },
  tabButtonsContainer: { flexDirection: "row", justifyContent: "space-around", marginBottom: 10 },
  tabContainer: { flex: 1, alignItems: "center" },
  tabTouchable: { paddingVertical: 10, width: "100%", alignItems: "center" },
  tabText: { fontSize: 22, fontWeight: "900" },
  tabTextSelected: { color: "#FFFFFF", opacity: 1 },
  tabTextUnselected: { color: "#FFFFFF", opacity: 0.5 },
  tabBar: { height: 5, width: "90%", borderRadius: 3, marginTop: -1 },
  tabBarActive: { backgroundColor: "#FFFFFF", opacity: 1 },
  tabBarInactive: { backgroundColor: "#FFFFFF", opacity: 0.3 },
  yearContainer: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10, width: "70%", alignSelf: "center" },
  yearInnerContainer: { flexDirection: "row", alignItems: "flex-end", justifyContent: "center" },
  yearTextFixed: { color: "#FFFFFF", fontSize: 28, fontWeight: "900" },
  yearTextAnimated: { color: "#FFFFFF", fontSize: 28, fontWeight: "900", marginLeft: 2 },
  scrollContent: { alignItems: "center", paddingBottom: 20 },
  bottomContainer: { flex: 1, backgroundColor: "#FFFFFF", alignItems: "center", paddingTop: 20 },
  imagesContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", width: "90%" },
  imageWrapper: { alignItems: "center", marginBottom: 14 },
  imageContainer: { position: "relative", borderRadius: 8, overflow: "hidden" },
  imageItem: { width: screenWidth * 0.42, height: 165, borderRadius: 8, resizeMode: "cover" },
  blurOverlay: { ...StyleSheet.absoluteFillObject, borderRadius: 8 },
  lockIcon: { position: "absolute", top: "50%", left: "50%", transform: [{ translateX: -25 }, { translateY: -25 }] },
  imageLabel: { marginTop: 6, fontSize: 16, color: "#000000", fontWeight: "bold" },
  modalBackground: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalBox: { backgroundColor: "#FFF", padding: 20, borderRadius: 16, alignItems: "center", width: "80%" },
  modalImage: { width: 120, height: 120, borderRadius: 8, marginBottom: 10 },
  modalTitle: { fontSize: 18, fontWeight: "bold", color: "#1E90FF", marginBottom: 6, textAlign: "center" },
  modalSubtitle: { fontSize: 15, color: "#333", marginBottom: 14, textAlign: "center" },
  modalButton: { backgroundColor: "#1E90FF", borderRadius: 10, paddingVertical: 10, paddingHorizontal: 20 },
  modalButtonText: { color: "#FFF", fontWeight: "bold", fontSize: 16 },
});
