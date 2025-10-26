import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter, usePathname } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";

export default function Quests() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useLocalSearchParams();

  // imagens e nomes (mesma ordem das conquistas)
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

  // detecta mês atual do dispositivo
  const currentMonthIndex = new Date().getMonth();

  // se veio monthIndex por query, usa; se não, abre no mês atual
  const monthIndexParam = typeof params?.monthIndex !== "undefined" ? Number(params.monthIndex) : undefined;
  const titleParam = params?.title ? decodeURIComponent(String(params.title)) : undefined;

  const [headerMonthIndex, setHeaderMonthIndex] = useState(monthIndexParam ?? currentMonthIndex);

  // exemplo: quais meses estão completos (você deve persistir/atualizar isso real no seu app)
  const completedMonths = [0, 1, 2, 4, 5, 7, 8, 9]; // ex.: 9 (outubro) como completado no demo
  const lockedMonths = [3, 6, 10, 11]; // Abril, Julho, Novembro, Dezembro (bloqueados no Conquistas)

  // dados de progresso (mock)
  const [dailyProgress, setDailyProgress] = useState({ completed: 20, total: 30 });

  useEffect(() => {
    // se navegar com param, atualiza
    if (typeof monthIndexParam === "number" && !isNaN(monthIndexParam)) {
      setHeaderMonthIndex(monthIndexParam);
    }
  }, [monthIndexParam]);

  // derive estados
  const isCurrent = headerMonthIndex === currentMonthIndex;
  const isFuture = headerMonthIndex > currentMonthIndex;
  const isPast = headerMonthIndex < currentMonthIndex;
  const isLocked = lockedMonths.includes(headerMonthIndex);
  const isCompleted = completedMonths.includes(headerMonthIndex) && !isLocked; // if locked, treat as locked

  // ajustes visuais e mensagens
  let messageBlock = null;
  if (isCurrent) {
    // mantém o layout normal (barras etc.)
    messageBlock = null;
  } else if (isFuture) {
    messageBlock = {
      title: "🌱 Espere mais um pouco",
      desc: "O próximo desafio está germinando — prepare-se para ajudar a natureza em breve!",
      style: "future",
    };
  } else {
    // passado
    if (isCompleted) {
      messageBlock = {
        title: "🌎 Parabéns!",
        desc: "Você concluiu este desafio e ajudou o planeta — continue assim!",
        style: "success",
      };
    } else {
      messageBlock = {
        title: "🌿 Não desanime",
        desc: "O tempo passou, mas a natureza sempre dá novas chances. Continue cultivando bons hábitos!",
        style: "encourage",
      };
    }
  }

  const isQuests = pathname?.toLowerCase().includes("quests");
  const isConquistas = pathname?.toLowerCase().includes("conquistas");

  // título do cabeçalho: prioriza titleParam vindo do modal, senão usa titlesList
  const headerTitle = titleParam ?? titlesList[headerMonthIndex];
  const headerMonthFull = monthsFull[headerMonthIndex];
  const headerImage = imagesList[headerMonthIndex];

  return (
    <View style={styles.container}>
      {/* fundo azul */}
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

        {/* cabeçalho dinâmico: título (nome da conquista) + mês + imagem */}
        <View style={styles.questHeaderContainer}>
          <View style={styles.questRow}>
            <View style={styles.titleGroup}>
              <View style={styles.monthContainer}>
                <Text style={styles.monthText}>{headerMonthFull}</Text>
              </View>

              {/* mostra o nome da conquista (headerTitle) */}
              <Text style={styles.questTitleText}>{headerTitle}</Text>
            </View>

            <Image source={headerImage} style={styles.questImage} />
          </View>
        </View>

        {/* bloco de estado / tempo */}
        <View style={styles.dailyQuestContainer}>
          <View style={styles.dailyHeader}>
            <Ionicons name="time-outline" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.daysText}>
              {isCurrent ? "2 dias" : isFuture ? "Seu desafio ainda vai começar" : "Tempo esgotado"}
            </Text>
          </View>

          <View style={styles.dailyQuestBox}>
            {isCurrent ? (
              // mês atual — mostra barra e "Quests Diárias"
              <>
                <Text style={styles.dailyQuestText}>Quests Diárias</Text>

                <Text style={styles.dailyQuestCompleted}>
                  <Text style={{ color: "#1E90FF" }}>{dailyProgress.completed}</Text>
                  <Text style={{ color: "#FFFFFF" }}>{`/${dailyProgress.total}`}</Text>
                </Text>

                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${(dailyProgress.completed / dailyProgress.total) * 100}%` }]} />
                </View>
              </>
            ) : (
              // não é mês atual — mostra "Completo" ou mensagem (sem lista de quests)
              <>
                {isCompleted ? (
                  <>
                    <Text style={styles.completedText}>Completo</Text>
                    <Text style={styles.completedCount}>30/30</Text>
                  </>
                ) : (
                  <>
                    {/* quando não é atual e não completou, ocultamos o "Quests Diárias" e mostramos a mensagem bonita */}
                    <View style={styles.messageBox}>
                      <Text style={[styles.messageTitle, messageBlock?.style === "future" && styles.futureColor, messageBlock?.style === "success" && styles.successColor, messageBlock?.style === "encourage" && styles.encourageColor]}>
                        {messageBlock?.title}
                      </Text>
                      <Text style={styles.messageDesc}>{messageBlock?.desc}</Text>
                    </View>
                  </>
                )}
              </>
            )}
          </View>
        </View>
      </View>

      {/* parte branca inferior */}
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
          // se não for atual, mostramos apenas a mensagem (já mostrada no header box).
          // Removemos o título "Quests Diárias" conforme pedido.
          <View style={{ paddingHorizontal: 16 }}>
            {/* repetimos a mensagem para ficar mais visível na área branca */}
            <View style={styles.messageBox}>
              <Text style={[styles.messageTitle, messageBlock?.style === "future" && styles.futureColor, messageBlock?.style === "success" && styles.successColor, messageBlock?.style === "encourage" && styles.encourageColor]}>
                {messageBlock?.title}
              </Text>
              <Text style={styles.messageDesc}>{messageBlock?.desc}</Text>
            </View>
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
  questTitleText: { color: "#FFFFFF", fontSize: 28, fontWeight: "900", lineHeight: 34, letterSpacing: 1, textAlign: "left" },

  questImage: { width: 130, height: 130, borderRadius: 12, resizeMode: "contain", marginLeft: 12 },

  dailyQuestContainer: { marginTop: 10 },
  dailyHeader: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  daysText: { color: "#FFFFFF", fontSize: 15, fontWeight: "bold" },
  dailyQuestBox: { backgroundColor: "rgba(0,0,0,0.25)", borderRadius: 10, padding: 14, width: "100%" },

  // mês atual (barras)
  dailyQuestText: { color: "#FFFFFF", fontSize: 15, fontWeight: "bold", marginBottom: 6 },
  dailyQuestCompleted: { position: "absolute", right: 14, top: 16, fontSize: 15, fontWeight: "bold" },

  progressBar: { height: 10, backgroundColor: "rgba(255,255,255,0.35)", borderRadius: 5, overflow: "hidden", marginTop: 10 },
  progressFill: { height: "100%", backgroundColor: "#1E90FF" },

  // não atual - estado completo
  completedText: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },
  completedCount: { position: "absolute", right: 14, top: 16, color: "#FFFFFF", fontSize: 15, fontWeight: "bold" },

  bottomContainer: { flex: 1, backgroundColor: "#FFFFFF", padding: 16 },

  // mensagem estilizada para meses não atuais
  messageBox: { backgroundColor: "#F3F9FF", padding: 18, borderRadius: 12, alignItems: "center", marginVertical: 10 },
  messageTitle: { fontSize: 20, fontWeight: "800", marginBottom: 8, textAlign: "center" },
  messageDesc: { fontSize: 15, color: "#375E8C", textAlign: "center" },
  futureColor: { color: "#1E90FF" },
  successColor: { color: "#2E8B57" },
  encourageColor: { color: "#F39C12" },

  dailyTitle: { color: "#1E90FF", fontSize: 26, fontWeight: "900", marginBottom: 16 },

  // quests diárias (lista)
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
