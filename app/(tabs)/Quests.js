import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter, usePathname } from "expo-router";
import { useState, useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";

export default function Quests() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useLocalSearchParams();

  // Índice do mês recebido via Conquistas
  const monthIndexParam = params?.monthIndex ? Number(params.monthIndex) : 5; // padrão: Junho
  const [headerMonthIndex, setHeaderMonthIndex] = useState(monthIndexParam);

  // Dados de meses e imagens
  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const imagesList = [
    require("../../assets/images/AnoNovoPlanetaNovo.png"),
    require("../../assets/images/EcoFolia.png"),
    require("../../assets/images/GuardiaDaAgua.png"),
    require("../../assets/images/HeroiDaTerra.png"),
    require("../../assets/images/MaeNatureza.png"),
    require("../../assets/images/ArraiaQuest.png"),
    require("../../assets/images/FeriasEcologicas.png"),
    require("../../assets/images/CavaleiroDoVento.png"),
    require("../../assets/images/JardineiraDoPlaneta.png"),
    require("../../assets/images/AssombracaoDoLixo.png"),
    require("../../assets/images/CaminhanteDoBem.png"),
    require("../../assets/images/RetrospectivaSustentavel.png"),
  ];

  const currentMonthIndex = 9; // outubro (base 0)
  const completedMonths = [0, 1, 2, 4, 5, 7, 8, 9]; // exemplo: meses concluídos

  const [dailyProgress, setDailyProgress] = useState({ completed: 20, total: 30 });

  useEffect(() => {
    if (monthIndexParam !== undefined) setHeaderMonthIndex(Number(monthIndexParam));
  }, [monthIndexParam]);

  // Situação do mês
  const isCompleted = completedMonths.includes(headerMonthIndex);
  const isFuture = headerMonthIndex > currentMonthIndex;
  const isPast = headerMonthIndex < currentMonthIndex && !isCompleted;
  const isCurrent = headerMonthIndex === currentMonthIndex;

  // Mensagem dinâmica (parte branca)
  let message = "";
  if (isCompleted) {
    message = "🌎 Parabéns! Você se tornou um verdadeiro guardião da Terra!";
  } else if (isFuture) {
    message = "🌤️ Espere só mais um pouco... a natureza logo trará novos desafios!";
  } else if (isPast) {
    message = "🌱 Continue firme! Cada pequena ação faz o planeta respirar melhor.";
  }

  const isQuests = pathname?.toLowerCase().includes("quests");
  const isConquistas = pathname?.toLowerCase().includes("conquistas");

  return (
    <View style={styles.container}>
      {/* Fundo azul superior */}
      <View style={styles.headerContainer}>
        {/* Botões superiores */}
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

        {/* Cabeçalho da quest */}
        <View style={styles.questHeaderContainer}>
          <View style={styles.questRow}>
            <View style={styles.titleGroup}>
              <View style={styles.monthContainer}>
                <Text style={styles.monthText}>{months[headerMonthIndex]}</Text>
              </View>
              <Text style={styles.questTitleText}>
                {months[headerMonthIndex] === "Junho" ? "Arraiá\nQuest" : months[headerMonthIndex]}
              </Text>
            </View>

            <Image source={imagesList[headerMonthIndex]} style={styles.questImage} />
          </View>
        </View>

        {/* Barra de progresso / estado */}
        <View style={styles.dailyQuestContainer}>
          <View style={styles.dailyHeader}>
            <Ionicons name="time-outline" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.daysText}>
              {isCompleted
                ? "Tempo esgotado"
                : isFuture
                ? "Seu desafio ainda vai começar"
                : isCurrent
                ? "2 dias"
                : "Tempo esgotado"}
            </Text>
          </View>

          <View style={styles.dailyQuestBox}>
            {isCompleted ? (
              <>
                <Text style={styles.completedText}>Completo</Text>
                <Text style={styles.completedCount}>30/30</Text>
              </>
            ) : (
              <>
                <Text style={styles.dailyQuestText}>Complete 30 quests diárias</Text>
                <Text style={styles.dailyQuestCompleted}>
                  <Text style={{ color: "#1E90FF" }}>{dailyProgress.completed}</Text>
                  <Text style={{ color: "#FFFFFF" }}>/30</Text>
                </Text>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${(dailyProgress.completed / dailyProgress.total) * 100}%` },
                    ]}
                  />
                </View>
              </>
            )}
          </View>
        </View>
      </View>

      {/* Parte branca inferior */}
      <ScrollView style={styles.bottomContainer} contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.dailyTitle}>Quests Diárias</Text>
        {message ? (
          <Text style={styles.incentiveText}>{message}</Text>
        ) : (
          <View style={styles.questsBox}>
            {[1, 2, 3].map((_, i) => (
              <View key={i} style={styles.questProgressContainer}>
                <View style={styles.textRow}>
                  <Ionicons name="leaf-outline" size={22} color="#1E90FF" style={styles.icon} />
                  <Text style={styles.questDescription}>Complete 2 práticas</Text>
                </View>

                <View style={styles.progressOuter}>
                  <View style={styles.progressInner}>
                    <Text style={styles.progressText}>01/02</Text>
                  </View>
                </View>
                {i < 2 && <View style={styles.separator} />}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  headerContainer: { backgroundColor: "#1E90FF", paddingTop: 10, paddingHorizontal: 16, paddingBottom: 20 },
  tabButtonsContainer: { flexDirection: "row", justifyContent: "space-between" },
  tabContainer: { flex: 1, alignItems: "center" },
  tabTouchable: { paddingVertical: 10, width: "100%", alignItems: "center" },
  tabText: { fontSize: 22, fontWeight: "900" },
  tabTextSelected: { color: "#FFFFFF", opacity: 1 },
  tabTextUnselected: { color: "#FFFFFF", opacity: 0.5 },
  tabBar: { height: 5, width: "90%", borderRadius: 3, marginTop: -1 },
  tabBarActive: { backgroundColor: "#FFFFFF", opacity: 1 },
  tabBarInactive: { backgroundColor: "#FFFFFF", opacity: 0.3 },

  questHeaderContainer: { marginTop: 10, marginBottom: 10 },
  questRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  titleGroup: { justifyContent: "center" },
  monthContainer: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 6,
  },
  monthText: { color: "#1E90FF", fontSize: 14, fontWeight: "900" },
  questTitleText: {
    color: "#FFFFFF",
    fontSize: 40,
    fontWeight: "900",
    lineHeight: 48,
    letterSpacing: 2,
    textAlign: "left",
  },
  questImage: { width: 150, height: 150, borderRadius: 16 },

  dailyQuestContainer: { marginTop: 10 },
  dailyHeader: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  daysText: { color: "#FFFFFF", fontSize: 15, fontWeight: "bold" },
  dailyQuestBox: {
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 10,
    padding: 14,
    width: "100%",
  },
  dailyQuestText: { color: "#FFFFFF", fontSize: 15, fontWeight: "bold", marginBottom: 6 },
  dailyQuestCompleted: { position: "absolute", right: 14, top: 16, fontSize: 15, fontWeight: "bold" },
  completedText: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },
  completedCount: { position: "absolute", right: 14, top: 16, color: "#FFFFFF", fontSize: 15, fontWeight: "bold" },
  progressBar: { height: 10, backgroundColor: "rgba(255,255,255,0.5)", borderRadius: 5, overflow: "hidden", marginTop: 10 },
  progressFill: { height: "100%", backgroundColor: "#1E90FF" },

  bottomContainer: { flex: 1, backgroundColor: "#FFFFFF", padding: 16 },
  dailyTitle: { color: "#1E90FF", fontSize: 26, fontWeight: "900", marginBottom: 16 },
  incentiveText: { color: "#1E90FF", fontSize: 18, fontWeight: "600", textAlign: "center", marginHorizontal: 16 },

  questsBox: { borderWidth: 2, borderColor: "rgba(30,144,255,0.4)", borderRadius: 16, padding: 16 },
  questProgressContainer: { marginBottom: 14 },
  textRow: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  icon: { marginRight: 8 },
  questDescription: { color: "#1E90FF", fontSize: 16, fontWeight: "bold" },
  progressOuter: {
    width: "100%",
    height: 20,
    backgroundColor: "rgba(30,144,255,0.2)",
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
  },
  progressInner: {
    width: "50%",
    height: "100%",
    backgroundColor: "#1E90FF",
    justifyContent: "center",
    alignItems: "center",
  },
  progressText: { color: "#FFFFFF", fontWeight: "bold", fontSize: 13 },
  separator: {
    width: "95%",
    height: 3,
    backgroundColor: "rgba(30,144,255,0.25)",
    marginTop: 14,
    marginBottom: 6,
    alignSelf: "center",
    borderRadius: 3,
  },
});
