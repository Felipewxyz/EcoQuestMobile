import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const { width } = Dimensions.get("window");

export default function Configuracoes() {
  const [profileImage, setProfileImage] = useState(null);
  const [corPerfil, setCorPerfil] = useState(null);
  const [corBanner, setCorBanner] = useState(null);
  const [corMoldura, setCorMoldura] = useState(null);

  const scrollRef = useRef(null);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [mostrarMaisBanners, setMostrarMaisBanners] = useState(false);

  const imagensBanners = [
    { id: 1, nome: "Banner 1", uri: require("../../assets/images/sobre1.png") },
    { id: 2, nome: "Banner 2", uri: require("../../assets/images/sobre2.png") },
    { id: 3, nome: "Banner 3", uri: require("../../assets/images/sobre1.png") },
    { id: 4, nome: "Banner 4", uri: require("../../assets/images/sobre2.png") },
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
      {/* BANNER ATUAL */}
      <View style={{ marginTop: 40 }}>
        <Text style={styles.sectionTitleBig}>Como seu banner está agora</Text>
        <View style={styles.currentBannerBox}>
          <Image
            source={imagensBanners[0].uri}
            style={styles.currentBannerImage}
            resizeMode="cover"
          />
        </View>
      </View>

      {/* SEUS BANNERS */}
      <View style={[styles.section, { marginTop: 40 }]}>
        <View style={styles.sectionHeader}>
          <MaterialIcons name="image" size={32} color="#000" />
          <Text style={styles.sectionTitleBig}>Seus Banners</Text>

          {/* Botão seta para expandir */}
          <TouchableOpacity
            onPress={() => setMostrarMaisBanners(!mostrarMaisBanners)}
          >
            <Ionicons
              name={mostrarMaisBanners ? "chevron-up" : "chevron-down"}
              size={28}
              color="#000"
            />
          </TouchableOpacity>
        </View>

        {/* Primeiros 2 banners */}
        <View style={styles.row}>
          {imagensBanners.slice(0, 2).map((banner) => (
            <View key={banner.id} style={styles.bannerBoxContainer}>
              <Image source={banner.uri} style={styles.bigBannerBox} />
              <Text style={styles.bannerLabel}>{banner.nome}</Text>
            </View>
          ))}
        </View>

        {/* Banners extras aparecem ao clicar na seta */}
        {mostrarMaisBanners && (
          <View style={[styles.row, { marginTop: 10 }]}>
            {imagensBanners.slice(2, 4).map((banner) => (
              <View key={banner.id} style={styles.bannerBoxContainer}>
                <Image source={banner.uri} style={styles.bigBannerBox} />
                <Text style={styles.bannerLabel}>{banner.nome}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Escolher cor sólida */}
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

      {/* ... RESTO DA SUA PÁGINA MANTIDO IGUAL ... */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  content: { paddingBottom: 40, paddingHorizontal: 20 },

  section: { width: "100%", marginBottom: 30 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sectionTitleBig: { fontSize: 26, fontWeight: "800", color: "#000" },
  sectionTitleSmall: { fontSize: 18, fontWeight: "700", color: "#000" },

  currentBannerBox: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 10,
  },
  currentBannerImage: { width: "100%", height: "100%" },

  row: { flexDirection: "row", justifyContent: "space-between", gap: 10 },
  bannerBoxContainer: { alignItems: "center", flex: 1 },
  bigBannerBox: { width: "100%", height: 100, borderRadius: 10 },
  bannerLabel: { marginTop: 5, fontWeight: "600", color: "#333" },

  colorsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  colorCircle: { width: 35, height: 35, borderRadius: 20 },
  selectedColor: { borderWidth: 3, borderColor: "#2E7D32" },
});
