import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Ajuda() {
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate("Configuracoes")}>
                    <Ionicons name="arrow-back" size={26} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>Ajuda</Text>
            </View>

            {/* Introdução */}
            <Text style={styles.introText}>
                Precisa de ajuda com algo? Aqui estão algumas das dúvidas mais comuns
                e como você pode resolvê-las rapidamente.
            </Text>

            {/* Seções de ajuda */}
            <View style={styles.section}>
                <MaterialIcons name="person-outline" size={28} color="#2E7D32" />
                <View style={styles.sectionText}>
                    <Text style={styles.sectionTitle}>Como alterar meu perfil</Text>
                    <Text style={styles.sectionDescription}>
                        Vá até a página de configurações e toque em sua foto de perfil
                        para escolher uma nova imagem ou cor.
                    </Text>
                </View>
            </View>

            <View style={styles.section}>
                <MaterialIcons name="color-lens" size={28} color="#2E7D32" />
                <View style={styles.sectionText}>
                    <Text style={styles.sectionTitle}>Personalização de banner</Text>
                    <Text style={styles.sectionDescription}>
                        Você pode escolher entre vários banners ou selecionar uma cor sólida
                        para deixar o seu perfil do seu jeito.
                    </Text>
                </View>
            </View>

            <View style={styles.section}>
                <Ionicons name="help-circle-outline" size={28} color="#2E7D32" />
                <View style={styles.sectionText}>
                    <Text style={styles.sectionTitle}>Ainda precisa de ajuda?</Text>
                    <Text style={styles.sectionDescription}>
                        Se você tiver um problema que não encontrou aqui, entre em contato
                        conosco pelo e-mail abaixo:
                    </Text>
                    <Text style={styles.email}>suporte@meuapp.com</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
    },
    content: {
        padding: 20,
        paddingBottom: 40,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 25,
    },
    backButton: {
        marginRight: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        color: "#000",
    },
    introText: {
        fontSize: 16,
        color: "#444",
        marginBottom: 25,
        lineHeight: 22,
    },
    section: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 25,
    },
    sectionText: {
        marginLeft: 12,
        flex: 1,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#000",
    },
    sectionDescription: {
        fontSize: 15,
        color: "#555",
        marginTop: 5,
        lineHeight: 20,
    },
    email: {
        marginTop: 8,
        color: "#2E7D32",
        fontWeight: "700",
    },
});
