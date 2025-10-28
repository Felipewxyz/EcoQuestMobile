import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const { width } = Dimensions.get("window");

export default function Configuracoes() {
  const [profileImage, setProfileImage] = useState(null);
  const [corPerfil, setCorPerfil] = useState(null);
  const [corBanner, setCorBanner] = useState(null);
  const [corMoldura, setCorMoldura] = useState(null);

  const scrollRef = useRef(null);
  const [currentBanner, setCurrentBanner] = useState(0);

  // Imagens locais do carrossel
  const imagensBanners = [
    { id: 1, uri: require("../../assets/images/sobre1.png") },
    { id: 2, uri: require("../../assets/images/sobre2.png") },
  ];

  const imagensPadrao = [
    { id: 1, uri: "https://i.pravatar.cc/150?img=5" },
    { id: 2, uri: "https://i.pravatar.cc/150?img=8" },
    { id: 3, uri: "https://i.pravatar.cc/150?img=15" },
  ];

  const cores = [
    "#000000", "#2E7D32", "#1565C0", "#AD1457",
    "#FF5722", "#9C27B0", "#E91E63", "#FFC107",
    "#FF9800", "#4CAF50", "#03A9F4", "#795548",
  ];

  // alternar banners automaticamente
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentBanner + 1) % imagensBanners.length;
      setCurrentBanner(nextIndex);
      scrollRef.current?.scrollTo({ x: width * nextIndex, animated: true });
    }, 4000);
    return () => clearInterval(interval);
  }, [currentBanner]);

  const escolherImagem = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permissão para acessar a galeria é necessária!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* CARROSSEL DE BANNERS */}
      <View style={{ marginTop: 40 }}>
        <ScrollView
          horizontal
          pagingEnabled
          ref={scrollRef}
          showsHorizontalScrollIndicator={false}
          style={styles.carousel}
        >
          {imagensBanners.map((banner) => (
            <Image
              key={banner.id}
              source={banner.uri}
              style={styles.bannerImage}
              resizeMode="cover"
            />
          ))}
        </ScrollView>

        <View style={styles.indicators}>
          {imagensBanners.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                { opacity: index === currentBanner ? 1 : 0.3 },
              ]}
            />
          ))}
        </View>
      </View>

      {/* SEUS BANNERS */}
      <View style={[styles.section, { marginTop: 50 }]}>
        <View style={styles.sectionHeader}>
          <MaterialIcons name="image" size={32} color="#000" />
          <Text style={styles.sectionTitleBig}>Seus Banners</Text>
        </View>

        <View style={styles.row}>
          <View
            style={[
              styles.bigBannerBox,
              corBanner ? { backgroundColor: corBanner } : null,
            ]}
          />
          <View
            style={[
              styles.bigBannerBox,
              corBanner ? { backgroundColor: corBanner } : null,
            ]}
          />
        </View>

        <View style={[styles.sectionHeader, { marginTop: 15 }]}>
          <MaterialIcons name="color-lens" size={28} color="#000" />
          <Text style={styles.sectionTitleSmall}>Ou escolha uma cor sólida</Text>
        </View>

        <View style={styles.colorsGrid}>
          {cores.map((cor, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.colorCircle,
                { backgroundColor: cor },
                corBanner === cor && styles.selectedColor,
              ]}
              onPress={() => setCorBanner(cor)}
            />
          ))}
        </View>
      </View>

      {/* SUAS MOLDURAS */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <FontAwesome name="user-circle-o" size={30} color="#000" />
          <Text style={styles.sectionTitleBig}>Suas Molduras</Text>
        </View>

        <View style={styles.row}>
          <View
            style={[
              styles.circle,
              corMoldura ? { backgroundColor: corMoldura } : null,
            ]}
          />
          <View
            style={[
              styles.circle,
              corMoldura ? { backgroundColor: corMoldura } : null,
            ]}
          />
        </View>

        <View style={[styles.sectionHeader, { marginTop: 15 }]}>
          <MaterialIcons name="color-lens" size={28} color="#000" />
          <Text style={styles.sectionTitleSmall}>
            Ou escolha apenas uma cor para sua moldura
          </Text>
        </View>

        <View style={styles.colorsGrid}>
          {cores.map((cor, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.colorCircle,
                { backgroundColor: cor },
                corMoldura === cor && styles.selectedColor,
              ]}
              onPress={() => setCorMoldura(cor)}
            />
          ))}
        </View>
      </View>

      {/* FOTO DE PERFIL */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons name="person" size={30} color="#000" />
          <Text style={styles.sectionTitleBig}>Foto de Perfil</Text>
        </View>

        <TouchableOpacity onPress={escolherImagem} style={styles.profileImageContainer}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.profilePlaceholder}>
              <FontAwesome name="camera" size={36} color="#777" />
              <Text style={{ color: "#777", marginTop: 5 }}>Selecionar Foto</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={[styles.sectionHeader, { marginTop: 20 }]}>
          <MaterialIcons name="collections" size={28} color="#000" />
          <Text style={styles.sectionTitleSmall}>Imagens Prontas</Text>
        </View>

        <View style={styles.readyImagesRow}>
          {imagensPadrao.map((img) => (
            <TouchableOpacity key={img.id} onPress={() => setProfileImage(img.uri)}>
              <Image
                source={{ uri: img.uri }}
                style={[
                  styles.readyImage,
                  profileImage === img.uri && styles.selectedReadyImage,
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>

        <View style={[styles.sectionHeader, { marginTop: 20 }]}>
          <MaterialIcons name="color-lens" size={28} color="#000" />
          <Text style={styles.sectionTitleSmall}>Cor do Perfil</Text>
        </View>

        <View style={styles.colorsGrid}>
          {cores.map((cor, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.colorCircle,
                { backgroundColor: cor },
                corPerfil === cor && styles.selectedColor,
              ]}
              onPress={() => setCorPerfil(cor)}
            />
          ))}
        </View>
      </View>

      {/* INFORMAÇÕES PESSOAIS */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons name="folder-open" size={30} color="#000" />
          <Text style={styles.sectionTitleBig}>Informações Pessoais</Text>
        </View>

        <View style={styles.inputsContainer}>
          <TextInput style={styles.input} placeholder="Nome" placeholderTextColor="#777" />
          <TextInput style={styles.input} placeholder="Usuário" placeholderTextColor="#777" />
          <TextInput style={styles.input} placeholder="Gmail" placeholderTextColor="#777" keyboardType="email-address" />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#777"
            secureTextEntry={true}
          />
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Deslogar</Text>
        </TouchableOpacity>
      </View>

      {/* BOTÃO DE SALVAR */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveText}>Salvar Alterações</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  content: { paddingBottom: 40, paddingHorizontal: 20 },

  carousel: { width, height: 160 },
  bannerImage: { width, height: 160, borderRadius: 10 },
  indicators: { flexDirection: "row", justifyContent: "center", marginTop: 8 },
  indicator: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#333", marginHorizontal: 5 },

  section: { width: "100%", marginBottom: 30 },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10 },
  sectionTitleBig: { fontSize: 26, fontWeight: "800", color: "#000" },
  sectionTitleSmall: { fontSize: 18, fontWeight: "700", color: "#000" },

  row: { flexDirection: "row", justifyContent: "space-between", gap: 10 },

  bigBannerBox: { flex: 1, height: 100, borderRadius: 10, backgroundColor: "#000" },

  circle: { width: 130, height: 130, borderRadius: 65, backgroundColor: "#000" },

  colorsGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 10 },
  colorCircle: { width: 35, height: 35, borderRadius: 20 },
  selectedColor: { borderWidth: 3, borderColor: "#2E7D32" },

  profileImageContainer: { alignSelf: "center", marginTop: 10 },
  profileImage: { width: 140, height: 140, borderRadius: 70, borderWidth: 2, borderColor: "#000" },
  profilePlaceholder: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#EEE",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CCC",
  },
  readyImagesRow: { flexDirection: "row", justifyContent: "center", gap: 12 },
  readyImage: { width: 70, height: 70, borderRadius: 35, borderWidth: 2, borderColor: "transparent" },
  selectedReadyImage: { borderColor: "#2E7D32" },

  inputsContainer: { marginTop: 10, gap: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#F9F9F9",
  },
  logoutButton: {
    backgroundColor: "#B71C1C",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 15,
  },
  logoutText: { color: "#FFF", fontWeight: "bold" },

  saveButton: {
    backgroundColor: "#2E7D32",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    width: "60%",
    alignSelf: "center",
  },
  saveText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
});
