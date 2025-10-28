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

export default function PraticasComuns() {
  const navigation = useNavigation();

  // Aqui renderizamos as 4 práticas, cada uma com suas props
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
      <BlocoPratica titulo="Prática Comum 1" cor="#4CAF50" storageKey="pratica_comum_1" />
      <BlocoPratica titulo="Prática Comum 2" cor="#2196F3" storageKey="pratica_comum_2" />
      <BlocoPratica titulo="Prática Comum 3" cor="#FFC107" storageKey="pratica_comum_3" />
      <BlocoPratica titulo="Prática Comum 4" cor="#9C27B0" storageKey="pratica_comum_4" />
    </ScrollView>
  );
}

// =============================
// 🔹 COMPONENTE REUTILIZÁVEL
// =============================
function BlocoPratica({ titulo, cor, storageKey }) {
  const [respostas, setRespostas] = useState({});
  const [explicacoesVisiveis, setExplicacoesVisiveis] = useState({});
  const [progresso, setProgresso] = useState(0);
  const anim = useState(new Animated.Value(0))[0];
  const [modalVisible, setModalVisible] = useState(false);

  const perguntas = [
    {
      id: 1,
      pergunta: "Qual destas ações ajuda o meio ambiente?",
      opcoes: [
        { texto: "Reciclar materiais", correta: true },
        { texto: "Deixar a luz acesa", correta: false },
        { texto: "Usar copos descartáveis", correta: false },
      ],
      explicacao: "Reciclar reduz o lixo e o desperdício de recursos.",
    },
    {
      id: 2,
      pergunta: "Qual é a cor da lixeira para papel?",
      opcoes: [
        { texto: "Azul", correta: true },
        { texto: "Verde", correta: false },
        { texto: "Amarela", correta: false },
      ],
      explicacao: "A lixeira azul é usada para papel, seguindo a coleta seletiva.",
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
    await AsyncStorage.setItem(storageKey, novoProgresso.toString());
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
    await AsyncStorage.setItem(storageKey, "0");
  };

  return (
    <View style={styles.caixaVerde}>
      <View style={[styles.topoLinha, { marginBottom: 15 }]}>
        <Text style={[styles.tituloVerde, { color: cor }]}>{titulo}</Text>
        <TouchableOpacity
          disabled={progresso < 1}
          onPress={() => setModalVisible(true)}
          style={{ opacity: progresso === 1 ? 1 : 0.4 }}
        >
          <Ionicons name="bulb-outline" size={26} color={progresso === 1 ? cor : "#999"} />
        </TouchableOpacity>
      </View>

      <View style={styles.caixaBranca}>
        {perguntas.map((p) => (
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
                  style={[styles.botaoOpcao, { backgroundColor: corBotao, borderColor: cor }]}
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

        {progresso === 1 && (
          <View style={styles.mensagemFinal}>
            <Ionicons name="trophy" size={30} color="#FFD700" />
            <Text style={styles.textoFinal}>
              🎉 Você completou todas as perguntas!
            </Text>
            <TouchableOpacity style={styles.botaoReiniciar} onPress={reiniciarQuiz}>
              <Ionicons name="refresh" size={20} color={cor} />
              <Text style={[styles.textoReiniciar, { color: cor }]}>Refazer</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Modal */}
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
                    size={20}
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
              style={[styles.botaoFecharModal, { backgroundColor: cor }]}
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
  scrollContainer: { padding: 20, paddingBottom: 60 },
  topoLinha: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  caixaVerde: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  tituloVerde: { fontSize: 20, fontWeight: "bold" },
  caixaBranca: {
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    padding: 15,
    marginTop: 10,
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
    marginTop: 15,
  },
  textoFinal: { color: "#333", fontSize: 15, textAlign: "center", marginTop: 6 },
  botaoReiniciar: {
    marginTop: 10,
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  textoReiniciar: { fontSize: 15, marginLeft: 6 },
  modalFundo: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
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
  modalTitulo: { fontSize: 20, fontWeight: "bold", color: "#333", marginBottom: 15 },
  resultadoLinha: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  resultadoTexto: { fontSize: 15, color: "#333", marginLeft: 8, flexShrink: 1 },
  botaoFecharModal: {
    marginTop: 15,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  textoFecharModal: { color: "#FFF", fontSize: 16, fontWeight: "500" },
});
