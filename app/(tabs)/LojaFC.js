import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";

export default function LojaFC({ navigation }) {
  const router = useRouter();

  // Estado para o tempo restante em segundos
  const [timeLeft, setTimeLeft] = useState(5 * 24 * 60 * 60); // 5 dias em segundos

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Função para formatar o tempo em dias, horas, minutos e segundos
  const formatTime = (seconds) => {
    const d = Math.floor(seconds / (24 * 3600));
    const h = Math.floor((seconds % (24 * 3600)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    return `${d}d ${h.toString().padStart(2,'0')}h ${m.toString().padStart(2,'0')}m ${s.toString().padStart(2,'0')}s`;
  };


  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: 'center', paddingBottom: 30 }}
    >
      {/* Cabeçalho */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={require("../../assets/images/sacola.png")}
            style={styles.iconSacola}
          />
          <Text style={styles.title}>Loja FC</Text>
        </View>

        <View style={styles.headerButtons}>

          {/* Baú */}
          <TouchableOpacity onPress={() => router.push("/Loja")}>
            <Image
              source={require("../../assets/images/lojabau.png")}
              style={styles.headerIcon}
            />
          </TouchableOpacity>

          {/* EP */}
          <TouchableOpacity onPress={() => router.push("/LojaEP")}>
            <Image
              source={require("../../assets/images/lojaep.png")}
              style={styles.headerIcon}
            />
          </TouchableOpacity>

          {/* FC selecionado */}
          <TouchableOpacity onPress={() => router.push("/LojaFC")}>
            <Image
              source={require("../../assets/images/lojafc.png")}
              style={[styles.headerIcon, { opacity: 1 }]}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* Temporizador */}
      <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
      {/* --------------------  SEÇÃO DE BANNERS -------------------- */}
      <Text style={styles.sectionTitle}>BANNERS</Text>

      {/* Banner 1 */}
      <View style={styles.bannerRow}>
        <View style={styles.bannerInfo}>
          <Text style={styles.bannerName}>Banner Especial{'\n'}de Natal</Text>

          <View style={styles.priceColumn}>

            {/* DE */}
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>DE</Text>
              <View style={styles.oldPriceBox}>
                <Text style={styles.oldPriceNumber}>105</Text>
                <Text style={styles.oldEP}>FC</Text>
              </View>
            </View>

            {/* POR */}
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>POR</Text>
              <View style={styles.newPriceBox}>
                <Text style={styles.newPriceNumber}>47</Text>
                <Text style={styles.newEP}>FC</Text>
              </View>
            </View>

          </View>
        </View>

        <Image
          source={require("../../assets/images/bannerloja3.png")}
          style={styles.bannerImage}
        />
      </View>

      <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buyButtonText}>COMPRAR</Text>
      </TouchableOpacity>
      {/* Banner 2 */}
      <View style={styles.bannerRow}>
        <View style={styles.bannerInfo}>
          <Text style={styles.bannerName}>Banner de{'\n'}Bandeira (BR)</Text>

          <View style={styles.priceColumn}>

            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>DE</Text>
              <View style={styles.oldPriceBox}>
                <Text style={styles.oldPriceNumber}>79</Text>
                <Text style={styles.oldEP}>FC</Text>
              </View>
            </View>

            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>POR</Text>
              <View style={styles.newPriceBox}>
                <Text style={styles.newPriceNumber}>26</Text>
                <Text style={styles.newEP}>FC</Text>
              </View>
            </View>

          </View>
        </View>

        <Image
          source={require("../../assets/images/bannerloja4.png")}
          style={styles.bannerImage}
        />
      </View>

      <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buyButtonText}>COMPRAR</Text>
      </TouchableOpacity>
      {/* --------------------  SEÇÃO DE MOLDURAS -------------------- */}
      <Text style={styles.sectionTitle}>MOLDURAS DE PERFIL</Text>

      <View style={styles.bannerRow}>
        <View style={styles.bannerInfo}>
          <Text style={styles.bannerName}>Moldura Especial{'\n'}de Natal</Text>

          <View style={styles.priceColumn}>

            {/* DE */}
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>DE</Text>
              <View style={styles.oldPriceBox}>
                <Text style={styles.oldPriceNumber}>120</Text>
                <Text style={styles.oldEP}>FC</Text>
              </View>
            </View>

            {/* POR */}
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>POR</Text>
              <View style={styles.newPriceBox}>
                <Text style={styles.newPriceNumber}>79</Text>
                <Text style={styles.newEP}>FC</Text>
              </View>
            </View>

          </View>
        </View>

        {/* Imagem da moldura (duas imagens sobrepostas) */}
        <View style={styles.molduraWrapper}>
          <Image
            source={require("../../assets/images/lojaperfil.png")}
            style={styles.molduraBase}
          />

          <Image
            source={require("../../assets/images/molduraloja2.png")}
            style={styles.molduraFrame}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buyButtonText}>COMPRAR</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },

  header: {
    width: "100%",
    backgroundColor: "#53985b",
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerLeft: { flexDirection: "row", alignItems: "center" },

  iconSacola: { width: 35, height: 35, marginRight: 6, tintColor: "#FFF" },

  title: { fontSize: 26, fontWeight: "bold", color: "#FFFFFF" },

  headerButtons: { flexDirection: "row", alignItems: "center", gap: 12 },

  headerIcon: { width: 38, height: 38, opacity: 0.6 },

  /* ------------ SEÇÕES ------------ */

  sectionTitle: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },

  bannerRow: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },

  bannerInfo: { width: "55%" },

  bannerName: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 6,
  },

  /* -------- PREÇOS -------- */

  priceColumn: { flexDirection: "column", gap: 4 },

  priceRow: { flexDirection: "row", alignItems: "center", gap: 6 },

  priceLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
    width: 32,
  },

  oldPriceBox: {
    flexDirection: "row",
    backgroundColor: "#dcdcdc",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignItems: "center",
  },

  oldPriceNumber: { fontSize: 16, fontWeight: "bold", color: "#000" },

  oldEP: { fontSize: 10, fontWeight: "bold", marginLeft: 3 },

  newPriceBox: {
    flexDirection: "row",
    backgroundColor: "#2abf40",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignItems: "center",
  },

  newPriceNumber: { fontSize: 22, fontWeight: "bold", color: "#fff" },

  newEP: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 4,
  },

  bannerImage: {
    width: 160,
    height: 120,
    borderRadius: 12,
    resizeMode: "cover",
  },

  molduraImage: {
    width: 140,
    height: 140,
    borderRadius: 12,
    resizeMode: "cover",
  },
  molduraWrapper: {
    width: 140,
    height: 140,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginTop: 10,
  },

  molduraBase: {
    width: 190,
    height: 190,
    borderRadius: 12,
    resizeMode: "cover",
  },

  molduraFrame: {
    position: "absolute",
    width: 190,
    height: 190,
    borderRadius: 12,
    resizeMode: "contain",
  },
  buyButton: {
    width: "90%",
    backgroundColor: "#53985b",  // verde da sua paleta
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: -20,      // aproxima do item acima
    marginBottom: 25,    // espaçamento entre botões
  },

  buyButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  timerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#d9534f", // vermelho suave para chamar atenção
    marginTop: 20,
    marginBottom: 10,
  },

});
