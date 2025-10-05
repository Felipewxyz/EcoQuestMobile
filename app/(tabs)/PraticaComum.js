import { Ionicons } from '@expo/vector-icons'; // Ícones
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function PraticaComum() {
  const [concluida, setConcluida] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {/* Caixa 1 - Número da prática, tema e status */}
        <View style={[styles.caixaPratica, { borderColor: "#4CAF50" }]}>
          <Text style={styles.numeroPratica}>Prática 01</Text>
          <Text style={styles.temaPratica}>Separação de Lixo</Text>
          <Ionicons
            name={concluida ? "checkmark-circle" : "ellipse-outline"}
            size={24}
            color={concluida ? "#4CAF50" : "#AAA"}
          />
        </View>

        {/* Caixa única com fundo verde contendo título, tópicos e progresso */}
        <View style={styles.caixaUnicaVerde}>
          {/* Título */}
          <Text style={styles.tituloVerde}>Aprenda como separar o seu lixo de plástico</Text>

          {/* Conteúdo explicativo com tópicos */}
          <View style={styles.topicosContainer}>
            <Text style={styles.topico}>• Separe garrafas PET do lixo comum;</Text>
            <Text style={styles.topico}>• Lave os recipientes antes de reciclar;</Text>
            <Text style={styles.topico}>• Coloque-os no local correto de coleta seletiva;</Text>
          </View>

          {/* Progresso do usuário */}
          <Text style={styles.tituloProgresso}>Seu progresso</Text>
          <View style={styles.imagensContainer}>
            <Image
              style={styles.imagemUsuario}
              source={{ uri: "https://via.placeholder.com/100" }}
            />
            <Image
              style={styles.imagemUsuario}
              source={{ uri: "https://via.placeholder.com/100" }}
            />
            <Image
              style={styles.imagemUsuario}
              source={{ uri: "https://via.placeholder.com/100" }}
            />
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollContainer: {
    padding: 15,
    paddingBottom: 30,
  },
  caixaPratica: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 12,
    padding: 20,
    backgroundColor: "#E8F5E9",
    marginBottom: 25, // aumenta respiro do topo
    marginTop: 40,    // aumenta respiro do topo da tela
  },
  numeroPratica: {
    fontSize: 18,
    fontWeight: "bold",
  },
  temaPratica: {
    fontSize: 16,
    color: "#333",
  },
  caixaUnicaVerde: {
    backgroundColor: "#4CAF50",
    borderRadius: 12,
    padding: 20,
  },
  tituloVerde: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  topicosContainer: {
    marginBottom: 20,
  },
  topico: {
    fontSize: 16,
    color: "#FFF",
    marginBottom: 8,
  },
  tituloProgresso: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 10,
  },
  imagensContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  imagemUsuario: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#DDD",
  },
});
