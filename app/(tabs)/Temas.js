import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Temas() {
  const navigation = useNavigation();

  const temas = [
    {
      id: 1,
      nome: "O Poder do Consumo Invisível ♻️",
      descricao:
        "Nem tudo o que impacta o planeta é visível. Nossas ações digitais — assistir vídeos, enviar e-mails, usar redes sociais — consomem energia real e geram emissões de carbono. Entenda como pequenas mudanças no seu uso da tecnologia podem reduzir o impacto ambiental do mundo digital.",
    },
    {
      id: 2,
      nome: "A Água que Você Não Vê 💧",
      descricao:
        "Cuidar da água vai além de fechar a torneira. Cada produto que usamos, cada alimento que escolhemos, carrega uma pegada hídrica invisível. Descubra como suas decisões diárias podem economizar milhares de litros de água e ajudar o planeta de verdade.",
    },
    {
      id: 3,
      nome: "A Natureza Dentro de Casa 🌿",
      descricao:
        "Sustentabilidade também começa no lar. Trazer a natureza para perto — cultivando plantas, usando luz natural ou reaproveitando materiais — melhora o bem-estar e fortalece nossa conexão com o meio ambiente. Pequenas atitudes que transformam o seu espaço e o planeta.",
    },
  ];

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    Animated.timing(translateYAnim, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const irParaTema = (id) => {
    navigation.navigate("Home", { scrollTo: `tema${id}` });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animated.View
        style={[
          styles.animatedContainer,
          { opacity: fadeAnim, transform: [{ translateY: translateYAnim }] },
        ]}
      >
        <Text style={styles.title}>
          Selecione um tema para aprender como viver de forma mais conectada e
          respeitosa com o meio ambiente 🌎
        </Text>

        {temas.map((tema) => (
          <View key={tema.id} style={styles.temaContainer}>
            <Text style={styles.temaTitulo}>{tema.nome}</Text>
            <Text style={styles.temaDescricao}>{tema.descricao}</Text>

            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed && { backgroundColor: "#017F12" },
              ]}
              onPress={() => irParaTema(tema.id)}
            >
              <Text style={styles.buttonText}>Acessar Tema {tema.id}</Text>
            </Pressable>
          </View>
        ))}
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingBottom: 40,
  },
  animatedContainer: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2E7D32",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 15,
    marginTop: 50,
  },
  temaContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  temaTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1B5E20",
    textAlign: "center",
    marginBottom: 10,
  },
  temaDescricao: {
    fontSize: 15,
    color: "#4E4E4E",
    textAlign: "center",
    marginBottom: 15,
    lineHeight: 22,
  },
  button: {
    backgroundColor: "#019314",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 3,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "bold",
  },
});
