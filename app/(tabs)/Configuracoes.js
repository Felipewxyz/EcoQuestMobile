import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

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
  const [profileImage, setProfileImage] = useState(null);

  // 🔹 Moldura e borda
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [selectedBorderColor, setSelectedBorderColor] = useState(null);
  const [expandedFrames, setExpandedFrames] = useState(false);
  const [expandedBorderColors, setExpandedBorderColors] = useState(false);

  // 🔹 animação na seleção de moldura
  const frameScale = useRef(new Animated.Value(1)).current;

  // banners principais
  const imagens = [
    { id: 1, nome: "Ajuda", uri: require("../../assets/images/bannerajuda.png"), destino: "Ajuda" },
    { id: 2, nome: "Sobre", uri: require("../../assets/images/bannersobre.png"), destino: "Sobre" },
  ];

  // banners do usuário
  const banners = [
    { id: 1, uri: require("../../assets/images/banner1.png") },
    { id: 2, uri: require("../../assets/images/banner2.png") },
    { id: 3, uri: require("../../assets/images/banner3.png") },
    { id: 4, uri: require("../../assets/images/banner4.png") },
  ];

  // cores do banner e da borda
  const cores = [
    "#795548", "#9C27B0", "#0D47A1", "#64B5F6",
    "#81C784", "#2E7D32", "#FFEB3B", "#FB8C00",
    "#F44336", "#E91E63", "#9E9E9E", "#000000",
  ];

  // molduras
  const molduras = [
    { id: 1, nome: "Moldura 1", uri: require("../../assets/images/moldura1.png") },
    { id: 2, nome: "Moldura 2", uri: require("../../assets/images/moldura1.png") },
    { id: 3, nome: "Moldura 3", uri: require("../../assets/images/moldura1.png") },
    { id: 4, nome: "Moldura 4", uri: require("../../assets/images/moldura1.png") },
  ];

  // carrossel automático
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

  // salvar banner, cor e moldura
  const handleSalvar = async () => {
    try {
      // salva banner
      if (selectedBanner) {
        await AsyncStorage.setItem("bannerSelecionado", JSON.stringify({ type: "banner", value: selectedBanner }));
      } else if (selectedColor) {
        await AsyncStorage.setItem("bannerSelecionado", JSON.stringify({ type: "color", value: selectedColor }));
      }

      // salva moldura/borda
      if (selectedFrame || selectedBorderColor) {
        await AsyncStorage.setItem(
          "molduraSelecionada",
          JSON.stringify({
            frame: selectedFrame,
            borderColor: selectedBorderColor,
          })
        );
      }

      navigation.navigate("Perfil");
    } catch (error) {
      console.log("Erro ao salvar configurações:", error);
    }
  };

  // função para escolher imagem da galeria
  const handleEscolherImagemGaleria = async () => {
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

  // (você pode implementar handleImagemPronta depois)
  const handleImagemPronta = () => {
    alert("Aqui você pode implementar imagens prontas de perfil!");
  };

  const handleRetirarMoldura = async () => {
    try {
      await AsyncStorage.removeItem("molduraSelecionada");
      setSelectedFrame(null);
      setSelectedBorderColor(null);
      setProfileImage(null); // ✅ limpa imagem escolhida também
    } catch (error) {
      console.log("Erro ao remover moldura/cor/imagem:", error);
    }
  };

  // 🔹 Salva apenas o banner e vai direto pro Perfil
  const handleSalvarBannerDireto = async () => {
    try {
      if (selectedBanner) {
        await AsyncStorage.setItem(
          "bannerSelecionado",
          JSON.stringify({ type: "banner", value: selectedBanner })
        );
      } else if (selectedColor) {
        await AsyncStorage.setItem(
          "bannerSelecionado",
          JSON.stringify({ type: "color", value: selectedColor })
        );
      } else {
        alert("Selecione um banner ou uma cor primeiro!");
        return;
      }

      navigation.navigate("Perfil");
    } catch (error) {
      console.log("Erro ao salvar banner direto:", error);
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

  const handleSelecionarMoldura = (item) => {
    setSelectedFrame(item);
    setSelectedBorderColor(null);

    Animated.sequence([
      Animated.timing(frameScale, { toValue: 1.1, duration: 150, useNativeDriver: true }),
      Animated.timing(frameScale, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
  };

  const handleSelecionarBorda = (cor) => {
    setSelectedBorderColor(cor);
    setSelectedFrame(null);
  };

  const bannersVisiveis = expandedBanners ? banners : banners.slice(0, 2);
  const coresVisiveis = expandedColors ? cores : cores.slice(0, 4);
  const moldurasVisiveis = expandedFrames ? molduras : molduras.slice(0, 2);
  const bordasVisiveis = expandedBorderColors ? cores : cores.slice(0, 4);

  const selectedItem = selectedBanner
    ? { type: "banner", value: selectedBanner }
    : selectedColor
      ? { type: "color", value: selectedColor }
      : null;

  // 🔹 Salva apenas o banner (imagem ou cor)
  const handleSalvarBanner = async () => {
    try {
      if (selectedBanner) {
        await AsyncStorage.setItem(
          "bannerSelecionado",
          JSON.stringify({ type: "banner", value: selectedBanner })
        );
      } else if (selectedColor) {
        await AsyncStorage.setItem(
          "bannerSelecionado",
          JSON.stringify({ type: "color", value: selectedColor })
        );
      } else {
        alert("Selecione um banner ou uma cor primeiro!");
        return;
      }

      navigation.navigate("Perfil");
    } catch (error) {
      console.log("Erro ao salvar banner:", error);
    }
  };

  // 🔹 Salva moldura, borda e imagem de perfil
  const handleSalvarMoldura = async () => {
    try {
      if (selectedFrame || selectedBorderColor || profileImage) {
        await AsyncStorage.setItem(
          "molduraSelecionada",
          JSON.stringify({
            frame: selectedFrame,
            borderColor: selectedBorderColor,
            profileImage: profileImage, // ✅ salva também a imagem escolhida
          })
        );

        navigation.navigate("Perfil");
      } else {
        alert("Selecione uma moldura, cor ou imagem primeiro!");
      }
    } catch (error) {
      console.log("Erro ao salvar moldura/cor/imagem:", error);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: "center", paddingBottom: 80 }}>
      {/* 🔹 Carrossel */}
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
            <TouchableOpacity key={item.id} activeOpacity={0.9} onPress={() => navigation.navigate(item.destino, { fromConfig: true })}>
              <Image source={item.uri} style={styles.bannerImage} resizeMode="cover" />
            </TouchableOpacity>
          ))}
        </Animated.ScrollView>

        <View style={styles.dotsContainer}>
          {imagens.map((_, index) => (
            <View key={index} style={[styles.dot, { backgroundColor: index === currentIndex ? "#0D47A1" : "#BDBDBD" }]} />
          ))}
        </View>
      </View>

      {/* 🔹 Preview do banner */}
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
            <TouchableOpacity key={item.id} onPress={() => handleSelecionarBanner(item)} style={[styles.bannerOption, selectedBanner === item.uri && styles.selectedItem]} activeOpacity={0.8}>
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
            <TouchableOpacity key={index} onPress={() => handleSelecionarCor(cor)} style={[styles.colorOption, { backgroundColor: cor }, selectedColor === cor && styles.selectedItem]} />
          ))}
        </View>
      </View>

      {/* 🔹 Botão Salvar Banner */}
      <View style={{ marginBottom: 50 }}>
        <TouchableOpacity
          style={styles.saveBannerButton}
          onPress={handleSalvarBanner}  // ✅ use a função que já existe
        >
          <Text style={styles.saveBannerButtonText}>Salvar banner</Text>
        </TouchableOpacity>
      </View>
      {/* 🔹 Preview da Moldura e/ou Borda */}
      <View style={styles.framePreviewContainer}>
        <View
          style={[
            styles.borderCircle,
            selectedBorderColor && { borderColor: selectedBorderColor, borderWidth: 6 },
          ]}
        >
          {/* 🔹 Foto de perfil (galeria ou placeholder) */}
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : require("../../assets/images/perfilplaceholder.png")
            }
            style={styles.profileImage}
          />
        </View>

        {/* 🔹 Moldura fora do círculo */}
        {selectedFrame && (
          <Image
            source={selectedFrame.uri}
            style={styles.frameOutside}
            resizeMode="contain"
          />
        )}

        <Text style={styles.previewLabel}>Como seu perfil está</Text>

        {/* 🔹 Texto adicional */}
        <Text style={styles.chooseText}>
          ESCOLHA SUA IMAGEM DE PERFIL
        </Text>

        {/* 🔹 Botões lado a lado */}
        <View style={styles.imageButtonRow}>
          <TouchableOpacity
            style={[styles.imageButton, { backgroundColor: "#0D47A1" }]}
            onPress={handleEscolherImagemGaleria}
          >
            <Text style={styles.imageButtonText}>Imagem da Galeria</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.imageButton, { backgroundColor: "#4CAF50" }]}
            onPress={handleImagemPronta}
          >
            <Text style={styles.imageButtonText}>Imagem Pronta</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 🔹 Molduras */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Suas molduras</Text>
          <TouchableOpacity onPress={() => setExpandedFrames(!expandedFrames)}>
            <Text style={styles.arrow}>{expandedFrames ? "▲" : "▼"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bannerRow}>
          {moldurasVisiveis.map((item) => (
            <TouchableOpacity key={item.id} onPress={() => handleSelecionarMoldura(item)} style={[styles.frameOption, selectedFrame?.id === item.id && styles.selectedItem]}>
              <Image source={item.uri} style={styles.frameThumb} resizeMode="contain" />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 🔹 Cores de borda */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Cores sólidas (borda)</Text>
          <TouchableOpacity onPress={() => setExpandedBorderColors(!expandedBorderColors)}>
            <Text style={styles.arrow}>{expandedBorderColors ? "▲" : "▼"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.colorsGrid}>
          {bordasVisiveis.map((cor, index) => (
            <TouchableOpacity key={index} onPress={() => handleSelecionarBorda(cor)} style={[styles.colorOption, { backgroundColor: cor }, selectedBorderColor === cor && styles.selectedItem]} />
          ))}
        </View>
      </View>

      {/* 🔹 Botões finais */}
      <View style={styles.bottomButtonsRow}>
        <TouchableOpacity style={[styles.saveButton, { flex: 1 }]} onPress={handleSalvarMoldura}>
          <Text style={styles.saveButtonText}>Salvar moldura, cor ou imagem</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.removeButton, { flex: 1 }]} onPress={handleRetirarMoldura}>
          <Text style={styles.removeButtonText}>Retirar moldura, cor ou imagem</Text>
        </TouchableOpacity>
      </View>
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  previewImage: { width: "100%", height: "100%", borderRadius: 14 },
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
  // Molduras
  framePreviewContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    width: 230,
    height: "auto",
    position: "relative",
  },
  frameCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#EEE",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    zIndex: 1,
  },
  molduraPreviewImage: {
    position: "absolute",
    width: 170,
    height: 170,
    borderRadius: 85,
    zIndex: 10,
  },
  borderCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    position: "relative",
    zIndex: 2,
  },
  frameOption: {
    width: "48%",
    height: 140,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#EEE",
    alignItems: "center",
    justifyContent: "center",
  },
  frameThumb: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },

  buttonRow: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 40,
  },
  topSaveContainer: {
    width: "90%",
    alignItems: "center",
    marginTop: 10,
  },
  topSaveButton: {
    backgroundColor: "#0D47A1",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  topSaveButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  saveBannerButton: {
    backgroundColor: "#4CAF50",  // cor de fundo do botão
    paddingVertical: 12,          // altura do botão
    paddingHorizontal: 20,        // largura interna
    borderRadius: 8,              // borda arredondada
    alignItems: "center",         // centraliza o texto
    marginTop: 10,                // distância do elemento acima
  },
  saveBannerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  frameOutside: {
    position: "absolute",
    width: 265,
    height: 265,
    top: -58,
    right: -25,
    zIndex: 3,
  },
  previewLabel: {
    marginTop: 45,
    fontSize: 14,
    fontWeight: "600",
    color: "#333"
  },
  chooseText: {
    marginTop: 25,
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    letterSpacing: 0.5,
    width: "90%",
  },
  imageButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "130%",
    marginTop: 15,
    gap: 15,
  },
  imageButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  imageButtonText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
  bottomButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginTop: 40,
    marginBottom: 60,
    gap: 15,
  },
  saveButton: {
    backgroundColor: "#0D47A1",
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  removeButton: {
    backgroundColor: "#E53935",
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  removeButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});