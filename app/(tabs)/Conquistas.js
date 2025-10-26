import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { usePathname, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function Conquistas() {
  const router = useRouter();
  const pathname = usePathname();
  const [year, setYear] = useState(2025);
  const animValue = useRef(new Animated.Value(0)).current;
  const [selectedConquista, setSelectedConquista] = useState(null);

  // Lista de 12 imagens (uma por mês) e metadados (mantive exatamente os nomes)
  const imagesList = [
    { name: "Ano Novo, Planeta Novo", source: require("../../assets/images/AnoNovoPlanetaNovo.png"), resumo: "Comece o ano cuidando do planeta com novos hábitos sustentáveis!" }, // Jan
    { name: "Eco Folia", source: require("../../assets/images/EcoFolia.png"), resumo: "Curta o carnaval sem deixar lixo por aí e espalhe alegria verde!" }, // Fev
    { name: "Guardiã da Água", source: require("../../assets/images/GuardiaDaAgua.png"), resumo: "Economize água e proteja esse bem precioso do planeta." }, // Mar
    { name: "Herói da Terra", source: require("../../assets/images/HeroiDaTerra.png"), resumo: "Proteja o solo e mantenha o ambiente limpo, como um verdadeiro herói!" }, // Abr
    { name: "Mãe Natureza", source: require("../../assets/images/MaeNatureza.png"), resumo: "Cuide da natureza com amor, como ela cuida de todos nós." }, // Mai
    { name: "Arraia Quest", source: require("../../assets/images/ArraiaQuest.png"), resumo: "Ajude o mar limpando plásticos e protegendo a vida marinha." }, // Jun
    { name: "Férias Ecológicas", source: require("../../assets/images/FeriasEcologicas.png"), resumo: "Aproveite o descanso com atividades sustentáveis e diversão consciente." }, // Jul
    { name: "Cavaleiro do Vento", source: require("../../assets/images/CavaleiroDoVento.png"), resumo: "Reduza o uso de combustíveis e incentive o ar puro!" }, // Ago
    { name: "Jardineira do Planeta", source: require("../../assets/images/JardineiraDoPlaneta.png"), resumo: "Plante o verde e colha o futuro: cuide das plantas ao seu redor." }, // Set
    { name: "Assombração do Lixo", source: require("../../assets/images/AssombracaoDoLixo.png"), resumo: "Derrote o vilão do lixo separando resíduos e recicláveis corretamente!" }, // Out
    { name: "Caminhante do Bem", source: require("../../assets/images/CaminhanteDoBem.png"), resumo: "Cada passo conta! Caminhe mais e polua menos." }, // Nov
    { name: "Retrospectiva Sustentável", source: require("../../assets/images/RetrospectivaSustentavel.png"), resumo: "Relembre suas ações e celebre um ano de conquistas ecológicas!" }, // Dez
  ];

  const months = ["Jan.", "Fev.", "Mar.", "Abr.", "Mai.", "Jun.", "Jul.", "Ago.", "Set.", "Out.", "Nov.", "Dez."];

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

  // meses bloqueados: Abril (3), Julho (6), Dezembro (11)
  const lockedMonths = [3, 6, 11];

  return (
    <View style={styles.container}>
      {/* Header azul com botões e ano */}
      <View style={styles.headerContainer}>
        <View style={styles.tabButtonsContainer}>
          {/* Botão Quests */}
          <View style={styles.tabContainer}>
            <TouchableOpacity onPress={() => !isQuests && router.push("/Quests")} style={styles.tabTouchable}>
              <Text style={[styles.tabText, isQuests ? styles.tabTextSelected : styles.tabTextUnselected]}>Quests</Text>
            </TouchableOpacity>
            <View style={[styles.tabBar, isQuests ? styles.tabBarActive : styles.tabBarInactive]} />
          </View>

          {/* Botão Conquistas */}
          <View style={styles.tabContainer}>
            <TouchableOpacity onPress={() => !isConquistas && router.push("/Conquistas")} style={styles.tabTouchable}>
              <Text style={[styles.tabText, isConquistas ? styles.tabTextSelected : styles.tabTextUnselected]}>Conquistas</Text>
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
            {imagesList.map((item, index) => {
              const isLocked = lockedMonths.includes(index);
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.imageWrapper}
                  onPress={() => setSelectedConquista({ ...item, isLocked, month: months[index], index })}
                >
                  <View style={styles.imageContainer}>
                    <Image source={item.source} style={styles.imageItem} />
                    {isLocked && (
                      <>
                        <BlurView intensity={45} tint="light" style={styles.blurOverlay} />
                        <Ionicons name="lock-closed" size={50} color="rgba(0,0,0,0.65)" style={styles.lockIcon} />
                      </>
                    )}
                  </View>
                  <Text style={styles.imageLabel}>{months[index]}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Modal de detalhes */}
      <Modal transparent visible={!!selectedConquista} animationType="fade" onRequestClose={() => setSelectedConquista(null)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Image source={selectedConquista?.source} style={styles.modalImage} />
            <Text style={styles.modalTitle}>
              {selectedConquista?.isLocked ? "Não foi dessa vez..." : "🎉 Conquista recebida!"}
            </Text>

            {selectedConquista && (
              <>
                <Text style={styles.modalMonth}>{selectedConquista.month}</Text>
                <Text style={styles.modalName}>{selectedConquista.name}</Text>
                <Text style={styles.modalDescription}>{selectedConquista.resumo}</Text>
              </>
            )}

            <View style={{ flexDirection: "row", gap: 10, marginTop: 8 }}>
              <TouchableOpacity
                onPress={() => setSelectedConquista(null)}
                style={[styles.modalButton, { backgroundColor: "#ccc" }]}
              >
                <Text style={{ color: "#000", fontWeight: "bold" }}>Fechar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  // fecha modal e navega para Quests passando monthIndex
                  const idx = selectedConquista?.index;
                  setSelectedConquista(null);
                  if (typeof idx === "number") {
                    router.push(`/Quests?monthIndex=${idx}`);
                  } else {
                    router.push("/Quests");
                  }
                }}
                style={[styles.modalButton, { backgroundColor: "#1E90FF" }]}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>Ver mais detalhes na página de Quests</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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

  imageLabel: { marginTop: 6, fontSize: 16, color: "#000", fontWeight: "bold" },

  // modal styles
  modalBackground: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "center", alignItems: "center" },
  modalContainer: { backgroundColor: "#FFF", width: "82%", borderRadius: 16, padding: 20, alignItems: "center", shadowColor: "#000", shadowOpacity: 0.3, shadowRadius: 10, elevation: 10 },
  modalImage: { width: 120, height: 120, resizeMode: "contain", borderRadius: 10, marginBottom: 12 },
  modalTitle: { fontSize: 20, fontWeight: "bold", color: "#1E90FF", marginBottom: 8, textAlign: "center" },
  modalMonth: { fontSize: 16, color: "#555", marginBottom: 2 },
  modalName: { fontSize: 18, fontWeight: "bold", marginBottom: 6, color: "#000", textAlign: "center" },
  modalDescription: { fontSize: 14, textAlign: "center", color: "#555", marginBottom: 12 },
  modalButton: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 8, marginHorizontal: 4 },
});
