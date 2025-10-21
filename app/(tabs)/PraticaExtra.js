import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Animated,
} from "react-native";

export default function PraticaExtra() {
  const navigation = useNavigation();
  const [respostas, setRespostas] = useState({});
  const [explicacoesVisiveis, setExplicacoesVisiveis] = useState({});
  const [progresso, setProgresso] = useState(0);
  const anim = useState(new Animated.Value(0))[0];

  const [modalVisible, setModalVisible] = useState(false);

  const perguntas = [
    {
      id: 1,
      pergunta: "Qual destas ações ajuda a economizar energia elétrica?",
      opcoes: [
        { texto: "Deixar luzes acesas o tempo todo", correta: false },
        { texto: "Desligar aparelhos quando não estão em uso", correta: true },
        { texto: "Usar vários carregadores ligados sem necessidade", correta: false },
      ],
      explicacao:
        "Desligar aparelhos e luzes quando não estão sendo usados reduz o consumo de energia e ajuda o meio ambiente.",
    },
    {
      id: 2,
      pergunta: "Qual é a cor da lixeira para descartar plástico?",
      opcoes: [
        { texto: "Verde", correta: false },
        { texto: "Vermelha", correta: true },
        { texto: "Amarela", correta: false },
      ],
      explicacao:
        "A lixeira vermelha é destinada para plásticos, seguindo o código de cores da coleta seletiva.",
    },
    {
      id: 3,
      pergunta: "Por que é importante separar o lixo orgânico do reciclável?",
      opcoes: [
        { texto: "Porque ocupa menos espaço no caminhão", correta: false },
        { texto: "Para facilitar o processo de reciclagem", correta: true },
        { texto: "Porque é obrigatório por lei", correta: false },
      ],
      explicacao:
        "Separar o lixo orgânico do reciclável evita a contaminação dos materiais e melhora a eficiência da reciclagem.",
    },
  ];

  const atualizarProgresso = async (novoEstado) => {
    const total = perguntas.length;
    const respondidas = Object.keys(novoEstado).length;
    const novoProgresso = respondidas / total;
    setProgresso(novoProgresso);
    Animated.timing(anim, {
      toValue: novoProgresso,
      duration: 700,
      useNativeDriver: false,
    }).start();
    await AsyncStorage.setItem("progresso_pratica_extra", novoProgresso.toString());
  };

  const responder = async (id, correta) => {
    if (respostas[id]) return;
    const novoEstado = { ...respostas, [id]: correta };
    setRespostas(novoEstado);
    setExplicacoesVisiveis({ ...explicacoesVisiveis, [id]: true });
    await atualizarProgresso(novoEstado);
    if (correta) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const reiniciarQuiz = async () => {
    setRespostas({});
    setExplicacoesVisiveis({});
    setProgresso(0);
    Animated.timing(anim, { toValue: 0, duration: 400, useNativeDriver: false }).start();
    await AsyncStorage.setItem("progresso_pratica_extra", "0");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* ===== Cabeçalho ===== */}
        <View style={styles.topoLinha}>
          <TouchableOpacity
            style={styles.botaoVoltar}
            onPress={() => navigation.navigate("Home")}
          >
            <Ionicons name="arrow-back" size={26} color="black" />
          </TouchableOpacity>

          <View style={styles.caixa1}>
            <View style={styles.textosCaixa1}>
              <Text style={styles.textoSuperior}>Prática Extra</Text>
              <Text style={styles.textoInferior}>Tema 01</Text>
            </View>
            <View style={[styles.barraVertical, { backgroundColor: "#4CAF50" }]} />

            {/* Novo botão de insights */}
            <TouchableOpacity
              disabled={progresso < 1}
              onPress={() => setModalVisible(true)}
              style={{ opacity: progresso === 1 ? 1 : 0.4 }}
            >
              <Ionicons
                name="bulb-outline"
                size={30}
                color={progresso === 1 ? "#4CAF50" : "#999"}
              />
            </TouchableOpacity>
          </View>
        </View>


        {/* ===== Caixa Moderna ===== */}
        <View style={styles.caixaVerde}>
          <Text style={styles.tituloVerde}>
            TESTE SEUS CONHECIMENTOS 🌱
          </Text>
          <Text style={styles.subtitulo}>
            Responda as perguntas abaixo e descubra quanto você sabe sobre práticas sustentáveis!
          </Text>

          <View style={styles.caixaBranca}>
            {perguntas.map((p, index) => (
              <View key={p.id} style={styles.blocoPergunta}>
                <Text style={styles.pergunta}>{p.pergunta}</Text>
                {p.opcoes.map((op, i) => {
                  const respondida = respostas[p.id];
                  const correta = op.correta && respondida !== undefined;
                  const incorreta = respondida && !op.correta && op.texto === op.texto;
                  const corBotao =
                    respondida === undefined
                      ? "#E8F5E9"
                      : correta
                        ? "#C8E6C9"
                        : incorreta
                          ? "#FFCDD2"
                          : "#E8F5E9";

                  return (
                    <TouchableOpacity
                      key={i}
                      style={[styles.botaoOpcao, { backgroundColor: corBotao }]}
                      onPress={() => responder(p.id, op.correta)}
                      disabled={respondida !== undefined}
                    >
                      <Text style={styles.textoOpcao}>{op.texto}</Text>
                    </TouchableOpacity>
                  );
                })}
                {explicacoesVisiveis[p.id] && (
                  <Text
                    style={[
                      styles.explicacao,
                      { color: respostas[p.id] ? "#2E7D32" : "#D32F2F" },
                    ]}
                  >
                    {p.explicacao}
                  </Text>
                )}
              </View>
            ))}
          </View>

          {progresso === 1 && (
            <View style={styles.mensagemFinal}>
              <Ionicons name="trophy" size={40} color="#FFD700" />
              <Text style={styles.textoFinal}>
                🎉 Parabéns! Você completou todas as perguntas desta prática.
              </Text>
              <TouchableOpacity style={styles.botaoReiniciar} onPress={reiniciarQuiz}>
                <Ionicons name="refresh" size={22} color="#4CAF50" />
                <Text style={styles.textoReiniciar}>Refazer quiz</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
      {/* Modal de insights do usuário */}
      {modalVisible && (
        <View style={styles.modalFundo}>
          <View style={styles.modalConteudo}>
            <Text style={styles.modalTitulo}>Seu desempenho 🌿</Text>

            {Object.keys(respostas).map((key) => {
              const p = perguntas.find((q) => q.id === parseInt(key));
              const acertou = respostas[key];
              return (
                <View key={key} style={styles.resultadoLinha}>
                  <Ionicons
                    name={acertou ? "checkmark-circle" : "close-circle"}
                    size={22}
                    color={acertou ? "#4CAF50" : "#E53935"}
                  />
                  <Text style={styles.resultadoTexto}>
                    {p.pergunta.slice(0, 40)}
                    {p.pergunta.length > 40 ? "..." : ""}{" "}
                    {acertou ? "✔️ Correta" : "❌ Reveja este tema"}
                  </Text>
                </View>
              );
            })}

            <TouchableOpacity
              style={styles.botaoFecharModal}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textoFecharModal}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7FDF8" },
  scrollContainer: { padding: 20, paddingBottom: 40 },
  topoLinha: { flexDirection: "row", alignItems: "center", marginBottom: 25 },
  botaoVoltar: { marginRight: 10, padding: 10 },
  caixa1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#FFF",
    borderColor: "#4CAF50",
    borderWidth: 2,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  textosCaixa1: { flex: 1, marginHorizontal: 10 },
  textoSuperior: { fontSize: 20, fontWeight: "bold", color: "#4CAF50" },
  textoInferior: { fontSize: 16, color: "#333" },
  barraVertical: { width: 5, height: 65, borderRadius: 3, marginHorizontal: 10 },
  caixaVerde: {
    backgroundColor: "#4CAF50",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  tituloVerde: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitulo: {
    color: "#E8F5E9",
    textAlign: "center",
    marginBottom: 20,
    fontSize: 15,
  },
  caixaBranca: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 15,
  },
  blocoPergunta: {
    marginBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    paddingBottom: 15,
  },
  pergunta: { fontSize: 16, fontWeight: "bold", color: "#333", marginBottom: 10 },
  botaoOpcao: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#4CAF50",
    marginBottom: 8,
  },
  textoOpcao: { fontSize: 16, color: "#333" },
  explicacao: {
    fontSize: 15,
    marginTop: 10,
    backgroundColor: "#F1F8E9",
    padding: 8,
    borderRadius: 8,
    lineHeight: 22,
  },
  mensagemFinal: {
    backgroundColor: "#FFFDE7",
    borderRadius: 14,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  textoFinal: { color: "#333", fontSize: 16, textAlign: "center", marginTop: 8 },
  botaoReiniciar: {
    marginTop: 12,
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  textoReiniciar: { color: "#4CAF50", fontSize: 16, marginLeft: 6 },
  modalFundo: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  modalConteudo: {
    width: "85%",
    backgroundColor: "#FFF",
    borderRadius: 14,
    padding: 20,
    alignItems: "center",
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  resultadoLinha: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  resultadoTexto: { fontSize: 15, color: "#333", marginLeft: 8, flexShrink: 1 },
  botaoFecharModal: {
    marginTop: 15,
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  textoFecharModal: { color: "#FFF", fontSize: 16, fontWeight: "500" },

});
