import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function LojaEP({ navigation }) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={require("../../assets/images/sacola.png")}
            style={styles.iconSacola}
          />
          <Text style={styles.title}>Loja EP</Text>
        </View>

        <View style={styles.headerButtons}>
          {/* Baú */}
          <TouchableOpacity onPress={() => router.push("/Loja")}>
            <Image
              source={require("../../assets/images/lojabau.png")}
              style={styles.headerIcon}
            />
          </TouchableOpacity>
          {/* EP (selecionado) */}
          <TouchableOpacity onPress={() => router.push("/LojaEP")}>
            <Image
              source={require("../../assets/images/lojaep.png")}
              style={[styles.headerIcon, { opacity: 1 }]}
            />
          </TouchableOpacity>
          {/* FC */}
          <TouchableOpacity onPress={() => router.push("/LojaFC")}>
            <Image
              source={require("../../assets/images/lojafc.png")}
              style={styles.headerIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* Título BANNERS */}
      <Text style={styles.sectionTitle}>BANNERS</Text>
      {/* Banner 1 – Páscoa */}
      <View style={styles.bannerRow}>
        {/* Bloco de texto */}
        <View style={styles.bannerInfo}>
          <Text style={styles.bannerName}>Banner Comum{'\n'}de Páscoa</Text>
          {/* Preços verticalizados */}
          <View style={styles.priceColumn}>
            {/* DE */}
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>DE</Text>
              <View style={styles.oldPriceBox}>
                <Text style={styles.oldPriceNumber}>44</Text>
                <Text style={styles.oldEP}>EP</Text>
              </View>
            </View>
            {/* POR */}
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>POR</Text>
              <View style={styles.newPriceBox}>
                <Text style={styles.newPriceNumber}>26</Text>
                <Text style={styles.newEP}>EP</Text>
              </View>
            </View>
          </View>
        </View>
        {/* Imagem */}
        <Image
          source={require("../../assets/images/bannerloja1.png")}
          style={styles.bannerImage}
        />
      </View>
      {/* Banner 2 – Cor Sólida */}
      <View style={styles.bannerRow}>
        {/* Bloco de texto */}
        <View style={styles.bannerInfo}>
          <Text style={styles.bannerName}>Banner Cor{'\n'}Sólida</Text>

          <View style={styles.priceColumn}>
            {/* DE */}
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>DE</Text>
              <View style={styles.oldPriceBox}>
                <Text style={styles.oldPriceNumber}>35</Text>
                <Text style={styles.oldEP}>EP</Text>
              </View>
            </View>
            {/* POR */}
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>POR</Text>
              <View style={styles.newPriceBox}>
                <Text style={styles.newPriceNumber}>19</Text>
                <Text style={styles.newEP}>EP</Text>
              </View>
            </View>
          </View>
        </View>
        {/* Imagem */}
        <Image
          source={require("../../assets/images/bannerloja2.png")}
          style={styles.bannerImage}
        />
      </View>
      {/* Seção de Molduras de Perfil */}
      <Text style={styles.sectionTitle}>MOLDURAS DE PERFIL</Text>
      {/* Moldura de Coroa Rosa */}
      <View style={styles.bannerRow}>
        {/* Bloco de texto */}
        <View style={styles.bannerInfo}>
          <Text style={styles.bannerName}>Moldura de{'\n'}Coroa Rosa</Text>
          <View style={styles.priceColumn}>
            {/* DE */}
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>DE</Text>
              <View style={styles.oldPriceBox}>
                <Text style={styles.oldPriceNumber}>63</Text>
                <Text style={styles.oldEP}>EP</Text>
              </View>
            </View>
            {/* POR */}
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>POR</Text>
              <View style={styles.newPriceBox}>
                <Text style={styles.newPriceNumber}>48</Text>
                <Text style={styles.newEP}>EP</Text>
              </View>
            </View>
          </View>
        </View>
        {/* Imagem da moldura */}
        <Image
          source={require("../../assets/images/molduraloja1.png")}
          style={styles.molduraImage}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF", alignItems: "center" },
  header: { width: "100%", backgroundColor: "#53985b", paddingTop: 40, paddingBottom: 20, paddingHorizontal: 20, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconSacola: {
    width: 35,
    height: 35,
    marginRight: 6,
    tintColor: "#FFF",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  headerButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerIcon: {
    width: 38,
    height: 38,
    opacity: 0.6,
  },
  section: {
    width: "90%",
    marginBottom: 30,
  },
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
  bannerInfo: {
    width: "55%",
  },
  bannerName: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 6,
  },
  /* -------- PREÇOS -------- */
  priceColumn: {
    flexDirection: "column",
    gap: 4,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  priceLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
    width: 32, // mantém alinhamento vertical de DE e POR
  },
  /* Caixa cinza – preço antigo */
  oldPriceBox: {
    flexDirection: "row",
    backgroundColor: "#dcdcdc",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignItems: "center",
  },
  oldPriceNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  oldEP: {
    fontSize: 10,
    fontWeight: "bold",
    marginLeft: 3,
  },
  /* Caixa verde – preço atual */
  newPriceBox: {
    flexDirection: "row",
    backgroundColor: "#2abf40",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignItems: "center",
  },
  newPriceNumber: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  newEP: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 4,
  },
  oldPrice: {
    fontSize: 13,
    color: "#555",
    fontWeight: "bold",
    textDecorationLine: "line-through",
  },
  smallEP: {
    fontSize: 10,
    fontWeight: "bold",
  },
  newPrice: {
    marginTop: 2,
    fontSize: 26,
    fontWeight: "bold",
    color: "#1FAE00", // verde EP
    backgroundColor: "#DFFFE2",
    paddingHorizontal: 6,
    paddingVertical: 0,
    alignSelf: "flex-start",
    borderRadius: 3,
  },
  bigEP: {
    fontSize: 12,
    fontWeight: "bold",
  },
  /* Imagem mais retangular */
  bannerImage: {
    width: 160,
    height: 120,   // 👉 mais retangular igual ao print
    borderRadius: 12,
    resizeMode: "cover",
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
    marginBottom: 15,
    overflow: "hidden",
  },
  itemImage: {
    width: 120,
    height: 120,
    resizeMode: "cover",
  },
  itemInfo: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 14,
    textDecorationLine: "line-through",
    color: "#888",
    marginBottom: 5,
  },
  itemDiscountedPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#53985b",
  },
  molduraImage: {
    width: 160,
    height: 160,
    borderRadius: 12,
    resizeMode: "cover",
  },
});
