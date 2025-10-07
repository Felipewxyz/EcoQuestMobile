import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function PraticaComum() {
  const navigation = useNavigation();
  const [concluida, setConcluida] = useState(false);
  const [imagemSelecionada, setImagemSelecionada] = useState(null);

  // Cada tópico tem 3 espaços de imagem
  const [imagensUsuario, setImagensUsuario] = useState({
    limpeza: [null, null, null],
    secagem: [null, null, null],
    separacao: [null, null, null],
  });

  // abrir galeria e escolher imagem
 const escolherImagem = async (topico, index) => {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissão necessária",
        "Autorize o acesso à galeria para adicionar imagens."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",     // <== CORRIGIDO para eliminar o warning
      allowsEditing: true,      // permite cortar/editar a imagem
      aspect: [1, 1],           // opcional: mantém proporção quadrada
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const novaImagem = result.assets[0].uri;

      setImagensUsuario((prev) => {
        const novoEstado = {
          ...prev,
          [topico]: prev[topico].map((img, i) => (i === index ? novaImagem : img)),
        };

        // Marca prática como concluída se todas as imagens estiverem preenchidas
        const todasPreenchidas = Object.values(novoEstado)
          .flat()
          .every((img) => img !== null);
        if (todasPreenchidas) setConcluida(true);

        return novoEstado;
      });
    }
  } catch (error) {
    console.log("Erro ao escolher imagem:", error);
    Alert.alert("Erro", "Não foi possível selecionar a imagem.");
  }
};

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {/* ===== LINHA SUPERIOR COM SETA + CAIXA 1 ===== */}
        <View style={styles.topoLinha}>
          <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.navigate("Home")}>
            <Ionicons name="arrow-back" size={26} color="black" />
          </TouchableOpacity>

          {/* ===== CAIXA 1 ===== */}
          <View style={styles.caixa1}>
            <View style={styles.textosCaixa1}>
              <Text style={styles.textoSuperior}>Prática 1</Text>
              <Text style={styles.textoInferior}>Tema 01</Text>
            </View>

            <View
              style={[
                styles.barraVertical,
                { backgroundColor: concluida ? "#4CAF50" : "#CCC" },
              ]}
            />

            <TouchableOpacity onPress={() => setConcluida(!concluida)}>
              <Ionicons
                name={concluida ? "checkbox" : "checkbox-outline"}
                size={30}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* ===== CAIXA VERDE ===== */}
        <View style={styles.caixaVerde}>
          <Text style={styles.tituloVerde}>
            APRENDA COMO SEPARAR O SEU LIXO DE PLÁSTICO
          </Text>

          {/* ===== CAIXA 2 ===== */}
          <View style={styles.caixaBranca}>
            <Text style={styles.textoBrancoCaixa2}>
              <Text style={styles.negrito}>1 - Limpeza{"\n"}</Text>
              Lave os plásticos para remover resíduos de alimentos ou produtos.{"\n\n"}
              <Text style={styles.negrito}>2 - Secagem{"\n"}</Text>
              Seque bem antes de descartar para evitar contaminação.{"\n\n"}
              <Text style={styles.negrito}>3 - Separação{"\n"}</Text>
              Separe os plásticos dos demais resíduos e utilize a lixeira vermelha, destinada a materiais plásticos.
            </Text>
          </View>

          {/* ===== TÍTULO PROGRESSO ===== */}
          <Text style={styles.tituloProgresso}>SEU PROGRESSO</Text>

          {/* ===== CAIXA 3 ===== */}
          <View style={styles.caixaBranca}>
            {[
              { key: "limpeza", titulo: "1 - Limpeza" },
              { key: "secagem", titulo: "2 - Secagem" },
              { key: "separacao", titulo: "3 - Separação" },
            ].map((topico) => (
              <View key={topico.key}>
                <Text style={styles.topico}>
                  <Text style={styles.negrito}>{topico.titulo}</Text>
                </Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollHorizontal}>
                  {imagensUsuario[topico.key].map((img, index) => (
                    <TouchableOpacity
                      key={`${topico.key}-${index}`}
                      onPress={() =>
                        img
                          ? setImagemSelecionada(img)
                          : escolherImagem(topico.key, index)
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
      </ScrollView>

      {/* ===== MODAL DE IMAGEM AMPLIADA ===== */}
      <Modal
        visible={!!imagemSelecionada}
        transparent
        animationType="fade"
        onRequestClose={() => setImagemSelecionada(null)}
      >
        <View style={styles.modalFundo}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setImagemSelecionada(null)} />
          <View style={styles.modalConteudo}>
            <Image source={{ uri: imagemSelecionada }} style={styles.imagemAmpliada} />
            <TouchableOpacity style={styles.botaoFechar} onPress={() => setImagemSelecionada(null)}>
              <Ionicons name="close" size={26} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  scrollContainer: { padding: 15, paddingBottom: 30, paddingTop: 30 },

  topoLinha: { flexDirection: "row", alignItems: "center", marginBottom: 25, marginTop: 15 },
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
  tituloVerde: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },

  caixaBranca: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  textoBrancoCaixa2: { fontSize: 16, color: "#333", lineHeight: 24 },
  negrito: { fontWeight: "bold", color: "#333" },

  tituloProgresso: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 15,
    textAlign: "center",
  },

  topico: { fontSize: 16, color: "#333", marginBottom: 8 },
  scrollHorizontal: { marginBottom: 15 },

  quadradoCinza: {
    width: 120,
    height: 120,
    borderRadius: 10,
    backgroundColor: "#EEE",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  quadradoImagem: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 10,
  },

  modalFundo: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalConteudo: { justifyContent: "center", alignItems: "center" },
  imagemAmpliada: {
    width: 340,
    height: 340,
    borderRadius: 12,
    backgroundColor: "#DDD",
    resizeMode: "contain",
  },
  botaoFechar: { position: "absolute", top: 10, right: 10, padding: 10 },
});
