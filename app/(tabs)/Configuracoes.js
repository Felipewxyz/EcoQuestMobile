import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

export default function Configuracoes() {
  const navigation = useNavigation();
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [expandedBanners, setExpandedBanners] = useState(false);
  const [expandedColors, setExpandedColors] = useState(false);

  // 🔹 banners do carrossel principal (ex.: Ajuda/Sobre)
  const imagens = [
    { id: 1, nome: "Ajuda", uri: require("../../assets/images/bannerajuda.png"), destino: "Ajuda" },
    { id: 2, nome: "Sobre", uri: require("../../assets/images/bannersobre.png"), destino: "Sobre" },
  ];

  // 🔹 banners adicionais do usuário
  const banners = [
    { id: 1, uri: require("../../assets/images/banner1.png") },
    { id: 2, uri: require("../../assets/images/banner2.png") },
    { id: 3, uri: require("../../assets/images/banner3.png") },
    { id: 4, uri: require("../../assets/images/banner4.png") },
  ];

  // 🔹 cores sólidas
  const cores = [
    "#795548", "#9C27B0", "#0D47A1", "#64B5F6",
    "#81C784", "#2E7D32", "#FFEB3B", "#FB8C00",
    "#F44336", "#E91E63", "#9E9E9E", "#000000",
  ];

  // 🔹 carrossel automático
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % imagens.length;
      Animated.timing(scrollX, {
        toValue: width * nextIndex,
        duration: 1200,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }).start(() => {
        scrollRef.current?.scrollTo({ x: width * nextIndex, animated: false });
        setCurrentIndex(nextIndex);
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const handleMomentumScrollEnd = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  // 🔹 salvar banner ou cor selecionada
  const handleSalvar = async () => {
    try {
      if (selectedBanner) {
        await AsyncStorage.setItem("bannerSelecionado", JSON.stringify({ type: "banner", value: selectedBanner }));
      } else if (selectedColor) {
        await AsyncStorage.setItem("bannerSelecionado", JSON.stringify({ type: "color", value: selectedColor }));
      }
      navigation.navigate("Perfil");
    } catch (error) {
      console.log("Erro ao salvar banner:", error);
    }
  };

  const handleSelecionarBanner = (item) => {
    setSelectedBanner(item.uri);
    setSelectedColor(null);
  };

  const handleSelecionarCor = (cor) => {
    setSelectedColor(cor);
    setSelectedBanner(null);
  };

  const bannersVisiveis = expandedBanners ? banners : banners.slice(0, 2);
  const coresVisiveis = expandedColors ? cores : cores.slice(0, 4);

  // 🔹 item selecionado para preview
  const selectedItem = selectedBanner
    ? { type: "banner", value: selectedBanner }
    : selectedColor
    ? { type: "color", value: selectedColor }
    : null;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center", paddingBottom: 60 }}
    >
      {/* 🔹 Carrossel principal */}
      <View style={styles.carouselWrapper}>
        <Animated.ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingTop: 30 }}
        >
          {imagens.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.9}
              onPress={() => navigation.navigate(item.destino, { fromConfig: true })}
            >
              <Image source={item.uri} style={styles.bannerImage} resizeMode="cover" />
            </TouchableOpacity>
          ))}
        </Animated.ScrollView>

        {/* 🔹 Pontos do carrossel */}
        <View style={styles.dotsContainer}>
          {imagens.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, { backgroundColor: index === currentIndex ? "#0D47A1" : "#BDBDBD" }]}
            />
          ))}
        </View>
      </View>

      {/* 🔹 Pré-visualização */}
      <View style={styles.previewContainer}>
        <View style={styles.previewBox}>
          {selectedItem?.type === "banner" ? (
            <Image source={selectedItem.value} style={styles.previewImage} resizeMode="cover" />
          ) : (
            <View style={[styles.previewImage, { backgroundColor: selectedItem?.value || "#DDD" }]} />
          )}
        </View>
        <Text style={styles.previewLabel}>Como seu banner está</Text>
      </View>

      {/* 🔹 Banners do usuário */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Seus banners</Text>
          <TouchableOpacity onPress={() => setExpandedBanners(!expandedBanners)}>
            <Text style={styles.arrow}>{expandedBanners ? "▲" : "▼"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bannerRow}>
          {bannersVisiveis.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleSelecionarBanner(item)}
              style={[styles.bannerOption, selectedBanner === item.uri && styles.selectedItem]}
              activeOpacity={0.8}
            >
              <Image source={item.uri} style={styles.bannerThumb} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 🔹 Cores sólidas */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Cores sólidas</Text>
          <TouchableOpacity onPress={() => setExpandedColors(!expandedColors)}>
            <Text style={styles.arrow}>{expandedColors ? "▲" : "▼"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.colorsGrid}>
          {coresVisiveis.map((cor, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSelecionarCor(cor)}
              style={[styles.colorOption, { backgroundColor: cor }, selectedColor === cor && styles.selectedItem]}
            />
          ))}
        </View>
      </View>

      {/* 🔹 Botão Salvar */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSalvar} activeOpacity={0.9}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  carouselWrapper: { position: "relative", width: "100%" },
  bannerImage: { width: width, height: 220, borderRadius: 8 },
  dotsContainer: { position: "absolute", bottom: 10, left: 0, right: 0, flexDirection: "row", justifyContent: "center" },
  dot: { width: 10, height: 10, borderRadius: 5, marginHorizontal: 6 },

  previewContainer: { width: "100%", alignItems: "center", marginTop: 20, marginBottom: 25 },
  previewBox: {
    width: "90%",
    height: 180,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#EEE",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  previewImage: { width: "100%", height: "100%", borderRadius: 14 },
  previewLabel: { marginTop: 10, fontSize: 16, fontWeight: "600", color: "#333" },

  section: { width: "90%", marginTop: 30 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: "600", color: "#0D47A1" },
  arrow: { fontSize: 18, color: "#0D47A1" },

  bannerRow: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  bannerOption: { width: "48%", marginBottom: 10 },
  bannerThumb: { width: "100%", height: 100, borderRadius: 8 },

  colorsGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  colorOption: { width: "22%", height: 60, borderRadius: 8, marginBottom: 10 },
  selectedItem: { borderWidth: 3, borderColor: "#0D47A1" },

  saveButton: { marginTop: 30, backgroundColor: "#0D47A1", paddingVertical: 14, paddingHorizontal: 50, borderRadius: 8 },
  saveButtonText: { color: "#FFF", fontSize: 18, fontWeight: "bold" },
});
