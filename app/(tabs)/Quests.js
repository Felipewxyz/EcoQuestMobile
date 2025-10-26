import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from "expo-router"; // 👈 trocado aqui
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";


const monthData = [
  { monthFull: "Janeiro", short: "Jan.", image: require("../../assets/images/AnoNovoPlanetaNovo.png") },
  { monthFull: "Fevereiro", short: "Fev.", image: require("../../assets/images/EcoFolia.png") },
  { monthFull: "Março", short: "Mar.", image: require("../../assets/images/GuardiaDaAgua.png") },
  { monthFull: "Abril", short: "Abr.", image: require("../../assets/images/HeroiDaTerra.png") },
  { monthFull: "Maio", short: "Mai.", image: require("../../assets/images/MaeNatureza.png") },
  { monthFull: "Junho", short: "Jun.", image: require("../../assets/images/ArraiaQuest.png") },
  { monthFull: "Julho", short: "Jul.", image: require("../../assets/images/FeriasEcologicas.png") },
  { monthFull: "Agosto", short: "Ago.", image: require("../../assets/images/CavaleiroDoVento.png") },
  { monthFull: "Setembro", short: "Set.", image: require("../../assets/images/JardineiraDoPlaneta.png") },
  { monthFull: "Outubro", short: "Out.", image: require("../../assets/images/AssombracaoDoLixo.png") },
  { monthFull: "Novembro", short: "Nov.", image: require("../../assets/images/CaminhanteDoBem.png") },
  { monthFull: "Dezembro", short: "Dez.", image: require("../../assets/images/RetrospectivaSustentavel.png") },
];

export default function Quests() {
  const router = useRouter();
  const params = useLocalSearchParams(); // ✅ apenas uma vez
  const monthIndexParam = params?.monthIndex;
  const [headerMonthIndex, setHeaderMonthIndex] = useState(5);
  const [dailyProgress, setDailyProgress] = useState({ completed: 20, total: 30 });
  const [daysText, setDaysText] = useState("2 dias");
  const [completeLabel, setCompleteLabel] = useState(null); // null or "Completo • 30/30"
  const [progressPercent, setProgressPercent] = useState(50); // 0-100

  useEffect(() => {
    // se veio monthIndex pela query, usa ele
    if (typeof monthIndexParam !== "undefined") {
      const idx = parseInt(monthIndexParam, 10);
      if (!isNaN(idx) && idx >= 0 && idx < 12) {
        setHeaderMonthIndex(idx);
      }
    }
  }, [monthIndexParam]);

  useEffect(() => {
    // lógica para determinar estado baseado no mês selecionado
    const now = new Date();
    const currentMonthIndex = now.getMonth(); // 0-based (0 = jan)
    const selected = headerMonthIndex;

    // mock: se conquista desbloqueada = meses que NÃO estão bloqueados (no Conquistas bloqueados: 3,6,11)
    const lockedMonths = [3, 6, 11];
    const isLocked = lockedMonths.includes(selected);

    if (selected < currentMonthIndex) {
      // mês passado - consideramos completo
      setDailyProgress({ completed: 30, total: 30 });
      setProgressPercent(100);
      setCompleteLabel("Completo • 30/30");
      setDaysText("Tempo esgotado");
    } else if (selected === currentMonthIndex) {
      // mês atual - exibe dias restantes e estado parcial
      setDailyProgress({ completed: 20, total: 30 });
      setProgressPercent(Math.round((20 / 30) * 100));
      setCompleteLabel(null);
      // manter o texto de dias como está (2 dias) ou calcular real se desejar
      setDaysText("2 dias");
    } else {
      // mês futuro
      setDailyProgress({ completed: 0, total: 30 });
      setProgressPercent(0);
      setCompleteLabel(null);
      setDaysText("Seu desafio ainda vai começar");
    }

    // se a conquista está desbloqueada mesmo em mês passado, mantemos completo
    if (isLocked) {
      // locked months always show as locked state for extra clarity
      // but still apply the daysText rules above for time message
      // We'll not change completeLabel here; locked months in past should show "Não conquistado" visually elsewhere if needed
      // For simplicity, if locked & past we still show "Tempo esgotado" and progress 0
      if (selected < currentMonthIndex) {
        setDailyProgress({ completed: 0, total: 30 });
        setProgressPercent(0);
        setCompleteLabel(null);
        setDaysText("Tempo esgotado");
      }
    }
  }, [headerMonthIndex]);

  const currentHeader = monthData[headerMonthIndex] || monthData[5];

  return (
    <View style={styles.container}>
      {/* Fundo azul superior */}
      <View style={styles.headerContainer}>
        {/* 2 botões */}
        <View style={styles.tabButtonsContainer}>
          <View style={styles.tabContainer}>
            <TouchableOpacity onPress={() => router.push("/Quests")} style={styles.tabTouchable}>
              <Text style={[styles.tabText, router.asPath?.toLowerCase().includes("quests") ? styles.tabTextSelected : styles.tabTextUnselected]}>Quests</Text>
            </TouchableOpacity>
            <View style={[styles.tabBar, router.asPath?.toLowerCase().includes("quests") ? styles.tabBarActive : styles.tabBarInactive]} />
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity onPress={() => router.push("/Conquistas")} style={styles.tabTouchable}>
              <Text style={[styles.tabText, router.asPath?.toLowerCase().includes("conquistas") ? styles.tabTextSelected : styles.tabTextUnselected]}>Conquistas</Text>
            </TouchableOpacity>
            <View style={[styles.tabBar, router.asPath?.toLowerCase().includes("conquistas") ? styles.tabBarActive : styles.tabBarInactive]} />
          </View>
        </View>

        {/* Cabeçalho dinâmico */}
        <View style={styles.questHeaderContainer}>
          <View style={styles.questRow}>
            <View style={styles.titleGroup}>
              <View style={styles.monthContainer}>
                <Text style={styles.monthText}>{currentHeader.monthFull}</Text>
              </View>
              <Text style={styles.questTitleText}>{currentHeader.monthFull.split(" ")[0]}{"\n"}{currentHeader.short}</Text>
            </View>

            {/* replace placeholder by actual image */}
            <Image source={currentHeader.image} style={styles.questImage} />
          </View>
        </View>

        {/* Quest diária resumida */}
        <View style={styles.dailyQuestContainer}>
          <View style={styles.dailyHeader}>
            <Ionicons name="time-outline" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.daysText}>{daysText}</Text>
          </View>

          <View style={styles.dailyQuestBox}>
            <Text style={styles.dailyQuestText}>Complete 30 quests diárias</Text>

            {completeLabel ? (
              <Text style={[styles.dailyQuestCompleted, { right: 14 }]}>{completeLabel}</Text>
            ) : (
              <Text style={styles.dailyQuestCompleted}>
                <Text style={{ color: "#1E90FF" }}>{dailyProgress.completed}</Text>
                <Text style={{ color: "#FFFFFF" }}>{`/${dailyProgress.total}`}</Text>
              </Text>
            )}

            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
            </View>
          </View>
        </View>
      </View>

      {/* Parte branca inferior (conteúdo estático de exemplo) */}
      <View style={styles.bottomContainer}>
        <Text style={styles.dailyTitle}>Quests Diárias</Text>

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
      </View>
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
  monthContainer: { backgroundColor: "#FFFFFF", paddingVertical: 3, paddingHorizontal: 10, borderRadius: 8, alignSelf: "flex-start", marginBottom: 6 },
  monthText: { color: "#1E90FF", fontSize: 14, fontWeight: "900" },
  questTitleText: { color: "#FFFFFF", fontSize: 40, fontWeight: "900", lineHeight: 48, letterSpacing: 2, textAlign: "left" },

  // substitui placeholder por imagem com borda arredondada
  questImage: { width: 150, height: 150, borderRadius: 16, resizeMode: "contain", backgroundColor: "transparent" },

  dailyQuestContainer: { marginTop: 10 },
  dailyHeader: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  daysText: { color: "#FFFFFF", fontSize: 15, fontWeight: "bold" },
  dailyQuestBox: { backgroundColor: "rgba(0,0,0,0.3)", borderRadius: 10, padding: 14, width: "100%" },
  dailyQuestText: { color: "#FFFFFF", fontSize: 15, fontWeight: "bold", marginBottom: 6 },
  dailyQuestCompleted: { position: "absolute", right: 14, top: 16, fontSize: 15, fontWeight: "bold" },
  progressBar: { height: 10, backgroundColor: "rgba(255,255,255,0.5)", borderRadius: 5, overflow: "hidden", marginTop: 10 },
  progressFill: { width: "50%", height: "100%", backgroundColor: "#1E90FF" },

  bottomContainer: { flex: 1, backgroundColor: "#FFFFFF", padding: 16 },
  dailyTitle: { color: "#1E90FF", fontSize: 26, fontWeight: "900", marginBottom: 16 },
  questsBox: { borderWidth: 2, borderColor: "rgba(30,144,255,0.4)", borderRadius: 16, padding: 16 },
  questProgressContainer: { marginBottom: 14 },
  textRow: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  icon: { marginRight: 8 },
  questDescription: { color: "#1E90FF", fontSize: 16, fontWeight: "bold" },
  progressOuter: { width: "100%", height: 20, backgroundColor: "rgba(30,144,255,0.2)", borderRadius: 10, overflow: "hidden", justifyContent: "center" },
  progressInner: { width: "50%", height: "100%", backgroundColor: "#1E90FF", justifyContent: "center", alignItems: "center" },
  progressText: { color: "#FFFFFF", fontWeight: "bold", fontSize: 13 },
  separator: { width: "95%", height: 3, backgroundColor: "rgba(30,144,255,0.25)", marginTop: 14, marginBottom: 6, alignSelf: "center", borderRadius: 3 },
});
