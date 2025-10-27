import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, usePathname, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Quests() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useLocalSearchParams();

  const imagesList = [
    require("../../assets/images/AnoNovoPlanetaNovo.png"),
    require("../../assets/images/FoliaResponsavel.png"),
    require("../../assets/images/GuardiaDaAgua.png"),
    require("../../assets/images/HeroiDaTerra.png"),
    require("../../assets/images/MaeNatureza.png"),
    require("../../assets/images/ArraiaQuest.png"),
    require("../../assets/images/FeriasEcologicas.png"),
    require("../../assets/images/CavaleiroDoVento.png"),
    require("../../assets/images/PulmoesDoMundo.png"),
    require("../../assets/images/AssombracaoDoLixo.png"),
    require("../../assets/images/EcoDaAlianca.png"),
    require("../../assets/images/RetrospectivaSustentavel.png"),
  ];

  const titlesList = [
    "Ano Novo, Planeta Novo",
    "Folia Responsável",
    "Guardião da Água",
    "Herói da Terra",
    "Mãe Natureza",
    "Arraia Quest",
    "Férias Ecológicas",
    "Cavaleiro do Vento",
    "Pulmões do Mundo",
    "Assombração do Lixo",
    "Eco da Aliança",
    "Retrospectiva Sustentável",
  ];

  const monthsFull = [
    "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
    "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
  ];

  const currentMonthIndex = new Date().getMonth();
  const monthIndexParam = typeof params?.monthIndex !== "undefined" ? Number(params.monthIndex) : undefined;
  const titleParam = params?.title ? decodeURIComponent(String(params.title)) : undefined;
  const [headerMonthIndex, setHeaderMonthIndex] = useState(monthIndexParam ?? currentMonthIndex);

  // Exemplo de estado (você depois vai puxar do backend/local storage)
  const completedMonths = [0, 1, 2, 4, 5, 7, 8, 9];
  const lockedMonths = [3, 6, 10, 11];

  // aqui está o "20" que você queria ver em azul
  const [dailyProgress] = useState({ completed: 20, total: 30 });

  useEffect(() => {
    if (typeof monthIndexParam === "number" && !isNaN(monthIndexParam)) {
      setHeaderMonthIndex(monthIndexParam);
    }
  }, [monthIndexParam]);

  const isCurrent = headerMonthIndex === currentMonthIndex;
  const isFuture = headerMonthIndex > currentMonthIndex;
  const isPast = headerMonthIndex < currentMonthIndex;
  const isLocked = lockedMonths.includes(headerMonthIndex);
  const isCompleted = completedMonths.includes(headerMonthIndex) && !isLocked;

  const isQuests = pathname?.toLowerCase().includes("quests");
  const isConquistas = pathname?.toLowerCase().includes("conquistas");

  const headerTitle = titleParam ?? titlesList[headerMonthIndex];
  const headerMonthFull = monthsFull[headerMonthIndex];
  const headerImage = imagesList[headerMonthIndex];

  const progressPercent = Math.round((dailyProgress.completed / dailyProgress.total) * 100);

  return (
    <View style={styles.container}>
      {/* TOPO AZUL */}
      <View style={styles.headerContainer}>
        <View style={styles.tabButtonsContainer}>
          <View style={styles.tabContainer}>
            <TouchableOpacity onPress={() => router.push("/Quests")} style={styles.tabTouchable}>
              <Text style={[styles.tabText, isQuests ? styles.tabTextSelected : styles.tabTextUnselected]}>Quests</Text>
            </TouchableOpacity>
            <View style={[styles.tabBar, isQuests ? styles.tabBarActive : styles.tabBarInactive]} />
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity onPress={() => router.push("/Conquistas")} style={styles.tabTouchable}>
              <Text style={[styles.tabText, isConquistas ? styles.tabTextSelected : styles.tabTextUnselected]}>Conquistas</Text>
            </TouchableOpacity>
            <View style={[styles.tabBar, isConquistas ? styles.tabBarActive : styles.tabBarInactive]} />
          </View>
        </View>

        {/* cabeçalho com mês e imagem */}
        <View style={styles.questHeaderContainer}>
          <View style={styles.questRow}>
            <View style={styles.titleGroup}>
              <View style={styles.monthContainer}>
                <Text style={styles.monthText}>{headerMonthFull}</Text>
              </View>
              <Text style={styles.questTitleText}>{headerTitle}</Text>
            </View>
            <Image source={headerImage} style={styles.questImage} />
          </View>
        </View>

        {/* QUADRADO PRETO */}
        <View style={styles.dailyQuestContainer}>
          <View style={styles.dailyHeader}>
            <Ionicons name="time-outline" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.daysText}>
              {isCurrent ? "2 dias" : isFuture ? "Seu desafio ainda vai começar" : "Tempo esgotado"}
            </Text>
          </View>

          <View style={styles.dailyQuestBox}>
            {isCurrent ? (
              // ---------------- MÊS ATUAL ----------------
              <>
                <Text style={styles.dailyQuestText}>Complete 30 quests diárias</Text>

                {/* mostra o 20 em azul e /30 em branco no canto */}
                <Text style={styles.dailyQuestCompleted}>
                  <Text style={{ color: "#1E90FF", fontWeight: "900" }}>{dailyProgress.completed}</Text>
                  <Text style={{ color: "#FFFFFF", fontWeight: "900" }}>{`/${dailyProgress.total}`}</Text>
                </Text>

                {/* BARRA DENTRO DO QUADRADO PRETO */}
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
                </View>
              </>
            ) : isCompleted ? (
              // ---------------- CONCLUÍDO ----------------
              <>
                <Text style={styles.completedText}>Completo</Text>
                <Text style={styles.completedCount}>30/30</Text>
              </>
            ) : isFuture ? (
              // ---------------- FUTURO (ainda vai vir) ----------------
              <>
                <Text style={styles.dailyQuestText}>Complete 30 quests diárias</Text>
                <Text style={[styles.dailyQuestCompleted, { color: "#FFFFFF" }]}>0/0</Text>
              </>
            ) : (
              // ---------------- PASSADO NÃO CONCLUÍDO ----------------
              <>
                <Text style={[styles.dailyQuestText, { color: "#FFFFFF" }]}>❌ Desafio não concluído</Text>
                <Text style={[styles.dailyQuestCompleted, { color: "#FFFFFF" }]}>0/0</Text>
              </>
            )}
          </View>
        </View>
      </View>

      {/* PARTE BRANCA INFERIOR */}
      <ScrollView style={styles.bottomContainer} contentContainerStyle={{ paddingBottom: 40 }}>
        {isCurrent ? (
          <>
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
          </>
        ) : (
          <View style={{ paddingHorizontal: 16, alignItems: "center" }}>
            {isPast && !isCompleted && !isLocked ? (
              // PASSADO NÃO CONCLUÍDO: mostra incentivo completo na parte branca
              <View style={styles.messageBox}>
                <Text style={[styles.messageTitle, { color: "#E84545" }]}>🌿 Não desanime</Text>
                <Text style={styles.messageDesc}>
                  O tempo passou, mas a natureza sempre dá novas chances. Continue cultivando bons hábitos!
                </Text>
                {/* opcional: mostrar resumo do que faltou */}
                <Text style={[styles.messageDesc, { marginTop: 8, fontWeight: "700" }]}>Desafio não concluído — 0/0</Text>
              </View>
            ) : isFuture ? (
              // FUTURO: instrução e 0/0 na parte branca
              <View style={styles.messageBox}>
                <Text style={[styles.messageTitle, { color: "#1E90FF" }]}>🌱 Espere mais um pouco</Text>
                <Text style={styles.messageDesc}>
                  O próximo desafio está germinando — prepare-se para ajudar a natureza em breve!
                </Text>
                <Text style={[styles.messageDesc, { marginTop: 8, fontWeight: "700" }]}>Complete 30 quests diárias — 0/0</Text>
              </View>
            ) : isCompleted ? (
              // CONCLUÍDO: mensagem de parabéns
              <View style={styles.messageBox}>
                <Text style={[styles.messageTitle, { color: "#2E8B57" }]}>🌎 Parabéns!</Text>
                <Text style={styles.messageDesc}>
                  Você concluiu este desafio e ajudou o planeta — continue assim!
                </Text>
                <Text style={[styles.messageDesc, { marginTop: 8, fontWeight: "700" }]}>30/30</Text>
              </View>
            ) : null}
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
  titleGroup: { justifyContent: "center", flex: 1 },
  monthContainer: { backgroundColor: "#FFFFFF", paddingVertical: 3, paddingHorizontal: 10, borderRadius: 8, alignSelf: "flex-start", marginBottom: 6 },
  monthText: { color: "#1E90FF", fontSize: 14, fontWeight: "900" },
  questTitleText: { color: "#FFFFFF", fontSize: 28, fontWeight: "900", lineHeight: 34 },
  questImage: { width: 130, height: 130, borderRadius: 12, resizeMode: "contain", marginLeft: 12 },

  dailyQuestContainer: { marginTop: 10 },
  dailyHeader: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  daysText: { color: "#FFFFFF", fontSize: 15, fontWeight: "bold" },
  dailyQuestBox: { backgroundColor: "rgba(0,0,0,0.25)", borderRadius: 10, padding: 14, width: "100%", minHeight: 64 },

  dailyQuestText: { color: "#FFFFFF", fontSize: 15, fontWeight: "bold" },
  dailyQuestCompleted: { position: "absolute", right: 14, top: 18, fontSize: 15, fontWeight: "900" },

  progressBar: { height: 8, backgroundColor: "rgba(255,255,255,0.18)", borderRadius: 6, overflow: "hidden", marginTop: 12 },
  progressFill: { height: "100%", backgroundColor: "#1E90FF" },

  completedText: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },
  completedCount: { position: "absolute", right: 14, top: 16, color: "#FFFFFF", fontSize: 15, fontWeight: "bold" },

  bottomContainer: { flex: 1, backgroundColor: "#FFFFFF", padding: 16 },

  messageBox: { backgroundColor: "#F3F9FF", padding: 18, borderRadius: 12, alignItems: "center", marginVertical: 20 },
  messageTitle: { fontSize: 20, fontWeight: "800", marginBottom: 8, textAlign: "center" },
  messageDesc: { fontSize: 15, color: "#375E8C", textAlign: "center" },

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
