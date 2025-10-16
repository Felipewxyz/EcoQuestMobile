import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function Quests() {
  const [selectedTab, setSelectedTab] = useState("quests");

  return (
    <View style={styles.container}>
      {/* Fundo azul superior */}
      <View style={styles.headerContainer}>
        {/* 2 botões */}
        <View style={styles.tabButtonsContainer}>
          {/* Botão Quests */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              onPress={() => setSelectedTab("quests")}
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

          {/* Botão Conquistas */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              onPress={() => setSelectedTab("achievements")}
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
          {/* Mês */}
          <View style={styles.monthContainer}>
            <Text style={styles.monthText}>Junho</Text>
          </View>

          {/* Título e imagem */}
          <View style={styles.questRow}>
            <Text style={styles.questTitleText}>Arraia{'\n'}Quest</Text>
            <View style={styles.questImagePlaceholder} />
          </View>
        </View>

        {/* Quest diária */}
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

      {/* Espaço branco inferior */}
      <View style={styles.bottomContainer} />
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
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },

  // 2 botões
  tabButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tabContainer: {
    flex: 1,
    alignItems: "center",
  },
  tabTouchable: {
    paddingVertical: 16,
    width: "100%",
    alignItems: "center",
  },
  tabText: {
    fontSize: 24,
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

  // Barra de cada botão
  tabBar: {
    height: 6,
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

  // Cabeçalho da quest
  questHeaderContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  monthContainer: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  monthText: {
    color: "#1E90FF",
    fontSize: 22,
    fontWeight: "900",
  },
  questRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  questTitleText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "900",
    textAlign: "left",
  },
  questImagePlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
  },

  // Quest diária
  dailyQuestContainer: {
    marginTop: 12,
  },
  dailyHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  daysText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  dailyQuestBox: {
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 10,
    padding: 16,
    width: "100%",
  },
  dailyQuestText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  dailyQuestCompleted: {
    position: "absolute",
    right: 16,
    top: 18,
    fontSize: 16,
    fontWeight: "bold",
  },
  progressBar: {
    height: 12,
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 6,
    overflow: "hidden",
    marginTop: 12,
  },
  progressFill: {
    width: "50%",
    height: "100%",
    backgroundColor: "#1E90FF",
  },

  // Espaço branco inferior
  bottomContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});
