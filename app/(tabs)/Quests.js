import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router"; // <--- ADICIONADO
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Quests() {
  const [selectedTab, setSelectedTab] = useState("quests");
  const router = useRouter(); // <--- ADICIONADO

  return (
    <View style={styles.container}>
      {/* Fundo azul superior */}
      <View style={styles.headerContainer}>
        {/* 2 botões */}
        <View style={styles.tabButtonsContainer}>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              onPress={() => {
                setSelectedTab("quests");
                router.push("/Quests"); // <-- rota correta
              }}
              style={styles.tabTouchable}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === "quests" ? styles.tabTextSelected : styles.tabTextUnselected,
                ]}
              >
                Quests
              </Text>
            </TouchableOpacity>
            <View
              style={[
                styles.tabBar,
                selectedTab === "quests" ? styles.tabBarActive : styles.tabBarInactive,
              ]}
            />
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity
              onPress={() => {
                setSelectedTab("achievements");
                router.push("/Conquistas"); // <-- alterado para /Conquistas
              }}
              style={styles.tabTouchable}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === "achievements"
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
                selectedTab === "achievements"
                  ? styles.tabBarActive
                  : styles.tabBarInactive,
              ]}
            />
          </View>
        </View>

        {/* Cabeçalho da quest */}
        <View style={styles.questHeaderContainer}>
          <View style={styles.questRow}>
            <View style={styles.titleGroup}>
              <View style={styles.monthContainer}>
                <Text style={styles.monthText}>Junho</Text>
              </View>
              <Text style={styles.questTitleText}>Arraia{'\n'}Quest</Text>
            </View>
            <View style={styles.questImagePlaceholder} />
          </View>
        </View>

        {/* Quest diária resumida */}
        <View style={styles.dailyQuestContainer}>
          <View style={styles.dailyHeader}>
            <Ionicons name="time-outline" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.daysText}>2 dias</Text>
          </View>
          <View style={styles.dailyQuestBox}>
            <Text style={styles.dailyQuestText}>Complete 30 quests diárias</Text>
            <Text style={styles.dailyQuestCompleted}>
              <Text style={{ color: "#1E90FF" }}>20</Text>
              <Text style={{ color: "#FFFFFF" }}>/30</Text>
            </Text>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
          </View>
        </View>
      </View>

      {/* Parte branca inferior */}
      <View style={styles.bottomContainer}>
        <Text style={styles.dailyTitle}>Quests Diárias</Text>

        {/* Quadrado com borda arredondada e barras */}
        <View style={styles.questsBox}>
          {[1, 2, 3].map((_, i) => (
            <View key={i} style={styles.questProgressContainer}>
              {/* Ícone + frase */}
              <View style={styles.textRow}>
                <Ionicons
                  name="leaf-outline"
                  size={22}
                  color="#1E90FF"
                  style={styles.icon}
                />
                <Text style={styles.questDescription}>Complete 2 práticas</Text>
              </View>

              {/* Barra de progresso */}
              <View style={styles.progressOuter}>
                <View style={styles.progressInner}>
                  <Text style={styles.progressText}>01/02</Text>
                </View>
              </View>

              {/* Barra separadora */}
              {i < 2 && <View style={styles.separator} />}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  // Fundo azul superior
  headerContainer: {
    backgroundColor: "#1E90FF",
    paddingTop: 10,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  tabButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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

  questHeaderContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  questRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleGroup: {
    justifyContent: "center",
  },
  monthContainer: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 6,
  },
  monthText: {
    color: "#1E90FF",
    fontSize: 14,
    fontWeight: "900",
  },
  questTitleText: {
    color: "#FFFFFF",
    fontSize: 40,
    fontWeight: "900",
    lineHeight: 48,
    letterSpacing: 2,
    textAlign: "left",
  },
  questImagePlaceholder: {
    width: 150,
    height: 150,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
  },

  // Quest diária resumida
  dailyQuestContainer: {
    marginTop: 10,
  },
  dailyHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  daysText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  dailyQuestBox: {
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 10,
    padding: 14,
    width: "100%",
  },
  dailyQuestText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 6,
  },
  dailyQuestCompleted: {
    position: "absolute",
    right: 14,
    top: 16,
    fontSize: 15,
    fontWeight: "bold",
  },
  progressBar: {
    height: 10,
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 10,
  },
  progressFill: {
    width: "50%",
    height: "100%",
    backgroundColor: "#1E90FF",
  },

  // Parte branca inferior
  bottomContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
  },
  dailyTitle: {
    color: "#1E90FF",
    fontSize: 26,
    fontWeight: "900",
    marginBottom: 16,
  },

  // Quadrado de Quests Diárias
  questsBox: {
    borderWidth: 2,
    borderColor: "rgba(30,144,255,0.4)",
    borderRadius: 16,
    padding: 16,
  },

  questProgressContainer: {
    marginBottom: 14,
  },

  // Ícone + frase
  textRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  icon: {
    marginRight: 8,
  },
  questDescription: {
    color: "#1E90FF",
    fontSize: 16,
    fontWeight: "bold",
  },

  // Barra de progresso
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
  progressText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 13,
  },

  // Barras separadoras mais compridas
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
