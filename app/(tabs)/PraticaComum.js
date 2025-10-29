import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import React, { useRef, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
  findNodeHandle,
} from "react-native";

const BlocoPraticaComum = React.forwardRef(({ titulo, subtitulo, storageKey }, ref) => {
  const navigation = useNavigation();
  const [concluida, setConcluida] = useState(false);
  const [imagemSelecionada, setImagemSelecionada] = useState(null);
  const [opcoesVisiveis, setOpcoesVisiveis] = useState(null);
  const [imagensUsuario, setImagensUsuario] = useState({
    limpeza: [null, null, null],
    secagem: [null, null, null],
    separacao: [null, null, null],
  });

  const atualizarProgresso = async (novoEstado) => {
    try {
      let progresso = 0;

      const topicosPreenchidos = [
        novoEstado.limpeza.some((img) => img !== null),
        novoEstado.secagem.some((img) => img !== null),
        novoEstado.separacao.some((img) => img !== null),
      ];

      const totalPreenchidos = topicosPreenchidos.filter(Boolean).length;

      // Cada tópico vale 1/3 do progresso total
      progresso = totalPreenchidos / 3;

      await AsyncStorage.setItem(storageKey, progresso.toString());
      console.log(`✅ Progresso salvo para ${storageKey}: ${progresso * 100}%`);
    } catch (e) {
      console.log("Erro ao salvar progresso:", e);
    }
  };


  const escolherImagem = async (topico, index) => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permissão necessária", "Autorize o acesso à galeria.");
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets?.length > 0) {
        const novaImagem = result.assets[0].uri;
        setImagensUsuario((prev) => {
          const novoEstado = {
            ...prev,
            [topico]: prev[topico].map((img, i) => (i === index ? novaImagem : img)),
          };
          atualizarProgresso(novoEstado);
          return novoEstado;
        });
      }
    } catch (error) {
      console.log("Erro ao escolher imagem:", error);
      Alert.alert("Erro", "Não foi possível selecionar a imagem.");
    }
  };

  const excluirImagem = (topico, index) => {
    setImagensUsuario((prev) => {
      const novoEstado = {
        ...prev,
        [topico]: prev[topico].map((img, i) => (i === index ? null : img)),
      };
      atualizarProgresso(novoEstado);
      return novoEstado;
    });
    setOpcoesVisiveis(null);
  };

  const abrirOpcoesImagem = (img, topico, index) =>
    setOpcoesVisiveis({ img, topico, index });

  return (
    <View ref={ref} style={{ marginBottom: 40 }}>
      {/* ===== CABEÇALHO ===== */}
      <View style={styles.topoLinha}>
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => navigation.navigate("Home")}
        >
          <Ionicons name="arrow-back" size={26} color="black" />
        </TouchableOpacity>

        <View style={styles.caixa1}>
          <View style={styles.textosCaixa1}>
            <Text style={styles.textoSuperior}>{titulo}</Text>
            <Text style={styles.textoInferior}>{subtitulo}</Text>
          </View>
          <View style={[styles.barraVertical, { backgroundColor: "#4CAF50" }]} />
          <TouchableOpacity onPress={() => setConcluida(!concluida)}>
            <Ionicons
              name={concluida ? "checkbox" : "checkbox-outline"}
              size={30}
              color={concluida ? "#4CAF50" : "black"}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* ===== CONTEÚDO ===== */}
      <View style={styles.caixaVerde}>
        <Text style={styles.tituloVerde}>
          APRENDA COMO SEPARAR O SEU LIXO DE PLÁSTICO
        </Text>

        <View style={styles.caixaBranca}>
          <Text style={styles.textoBrancoCaixa2}>
            <Text style={styles.negrito}>1 - Limpeza{"\n"}</Text>
            Lave os plásticos para remover resíduos de alimentos ou produtos.{"\n\n"}
            <Text style={styles.negrito}>2 - Secagem{"\n"}</Text>
            Seque bem antes de descartar para evitar contaminação.{"\n\n"}
            <Text style={styles.negrito}>3 - Separação{"\n"}</Text>
            Separe os plásticos dos demais resíduos e utilize a lixeira vermelha.
          </Text>
        </View>

        <Text style={styles.tituloProgresso}>SEU PROGRESSO</Text>

        {/* ===== UPLOAD DAS IMAGENS ===== */}
        <View style={styles.caixaBranca}>
          {["limpeza", "secagem", "separacao"].map((topico) => (
            <View key={topico}>
              <Text style={styles.topico}>
                <Text style={styles.negrito}>
                  {topico.charAt(0).toUpperCase() + topico.slice(1)}
                </Text>
              </Text>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.scrollHorizontal}
              >
                {imagensUsuario[topico].map((img, index) => (
                  <TouchableOpacity
                    key={`${topico}-${index}`}
                    onPress={() =>
                      img
                        ? abrirOpcoesImagem(img, topico, index)
                        : escolherImagem(topico, index)
                    }
                  >
                    {img ? (
                      <Image source={{ uri: img }} style={styles.quadradoImagem} />
                    ) : (
                      <View style={styles.quadradoCinza}>
                        <Ionicons name="add" size={36} color="#777" />
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          ))}
        </View>
      </View>

      {/* ===== MODAIS ===== */}
      <Modal
        visible={!!opcoesVisiveis}
        transparent
        animationType="fade"
        onRequestClose={() => setOpcoesVisiveis(null)}
      >
        <View style={styles.modalFundo}>
          <View style={styles.modalCaixaOpcoes}>
            <Text style={styles.modalTitulo}>Escolha uma opção</Text>

            <TouchableOpacity
              style={styles.botaoModal}
              onPress={() => {
                if (opcoesVisiveis) {
                  setImagemSelecionada(opcoesVisiveis.img);
                  setOpcoesVisiveis(null);
                }
              }}
            >
              <Ionicons name="eye" size={22} color="#4CAF50" />
              <Text style={styles.textoBotaoModal}>Ver imagem</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoModal}
              onPress={() => {
                if (opcoesVisiveis) {
                  escolherImagem(opcoesVisiveis.topico, opcoesVisiveis.index);
                  setOpcoesVisiveis(null);
                }
              }}
            >
              <Ionicons name="refresh" size={22} color="#4CAF50" />
              <Text style={styles.textoBotaoModal}>Trocar imagem</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.botaoModal, { backgroundColor: "#FCE4EC" }]}
              onPress={() => {
                if (opcoesVisiveis) {
                  excluirImagem(opcoesVisiveis.topico, opcoesVisiveis.index);
                }
              }}
            >
              <Ionicons name="trash" size={22} color="#E53935" />
              <Text style={[styles.textoBotaoModal, { color: "#E53935" }]}>
                Excluir imagem
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoCancelar}
              onPress={() => setOpcoesVisiveis(null)}
            >
              <Text style={styles.textoCancelar}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={!!imagemSelecionada}
        transparent
        animationType="fade"
        onRequestClose={() => setImagemSelecionada(null)}
      >
        <View style={styles.modalFundo}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setImagemSelecionada(null)}
          />
          <View style={styles.modalConteudo}>
            <Image source={{ uri: imagemSelecionada }} style={styles.imagemAmpliada} />
            <TouchableOpacity
              style={styles.botaoFechar}
              onPress={() => setImagemSelecionada(null)}
            >
              <Ionicons name="close" size={26} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
});

export default function PraticaComum() {
  const scrollRef = useRef(null);
  const blocosRefs = [useRef(null), useRef(null), useRef(null)];
  const route = useRoute();

  useFocusEffect(
    React.useCallback(() => {
      const scrollTo = route.params?.scrollTo;

      if (
        scrollTo !== undefined &&
        blocosRefs[scrollTo]?.current &&
        scrollRef.current
      ) {
        const nodeHandle = findNodeHandle(blocosRefs[scrollTo].current);
        const scrollHandle = findNodeHandle(scrollRef.current);

        if (nodeHandle && scrollHandle) {
          UIManager.measureLayout(
            nodeHandle,
            scrollHandle,
            () => { },
            (x, y) => {
              scrollRef.current.scrollTo({ y: y - 20, animated: true });
            }
          );
        }
      }
    }, [route.params])
  );

  return (
    <ScrollView
      ref={scrollRef}
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      <BlocoPraticaComum ref={blocosRefs[0]} titulo="Prática 1" subtitulo="Tema 01" storageKey="pratica1" />
      <BlocoPraticaComum ref={blocosRefs[1]} titulo="Prática 2" subtitulo="Tema 02" storageKey="pratica2" />
      <BlocoPraticaComum ref={blocosRefs[2]} titulo="Prática 3" subtitulo="Tema 03" storageKey="pratica3" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF", padding: 15 },
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
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  textosCaixa1: { flex: 1, marginHorizontal: 10 },
  textoSuperior: { fontSize: 20, fontWeight: "bold", color: "#4CAF50" },
  textoInferior: { fontSize: 17, color: "#333" },
  barraVertical: { width: 5, height: 65, borderRadius: 3, marginHorizontal: 10 },
  caixaVerde: { backgroundColor: "#4CAF50", borderRadius: 12, padding: 20 },
  tituloVerde: { color: "#FFF", fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 15 },
  caixaBranca: { backgroundColor: "#FFF", borderRadius: 12, padding: 15, marginBottom: 20 },
  textoBrancoCaixa2: { fontSize: 16, color: "#333", lineHeight: 24 },
  negrito: { fontWeight: "bold", color: "#333" },
  tituloProgresso: { fontSize: 18, fontWeight: "bold", color: "#FFF", marginBottom: 15, textAlign: "center" },
  topico: { fontSize: 16, color: "#333", marginBottom: 8 },
  scrollHorizontal: { marginBottom: 15 },
  quadradoCinza: { width: 120, height: 120, borderRadius: 10, backgroundColor: "#EEE", marginRight: 10, justifyContent: "center", alignItems: "center" },
  quadradoImagem: { width: 120, height: 120, borderRadius: 10, marginRight: 10 },
  modalFundo: { flex: 1, backgroundColor: "rgba(0,0,0,0.85)", justifyContent: "center", alignItems: "center" },
  modalCaixaOpcoes: { backgroundColor: "#FFF", width: 280, borderRadius: 16, padding: 20, alignItems: "center" },
  modalTitulo: { fontSize: 18, fontWeight: "bold", color: "#333", marginBottom: 15 },
  botaoModal: { flexDirection: "row", alignItems: "center", backgroundColor: "#E8F5E9", paddingVertical: 10, paddingHorizontal: 15, borderRadius: 10, width: "100%", marginBottom: 10 },
  textoBotaoModal: { fontSize: 16, color: "#333", marginLeft: 10, fontWeight: "500" },
  botaoCancelar: { marginTop: 5 },
  textoCancelar: { color: "#888", fontSize: 15 },
  modalConteudo: { justifyContent: "center", alignItems: "center" },
  imagemAmpliada: { width: 340, height: 340, borderRadius: 12, backgroundColor: "#DDD", resizeMode: "contain" },
  botaoFechar: { position: "absolute", top: 10, right: 10, padding: 10 },
});

