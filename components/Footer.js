// components/Footer.tsx
import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Footer() {
  const navigation = useNavigation();
  const route = useRoute();

  const icons = [
    { name: "home-outline", route: "Home" },
    { name: "barbell-outline", route: "Quests" },
    { name: "person-outline", route: "Perfil" },
    { name: "shield-outline", route: "Insignias" },
    { name: "bag-outline", route: "Loja" },
  ];

  return (
    <View style={styles.footer}>
      {icons.map((icon, index) => {
        const isActive = route.name === icon.route;
        return (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(icon.route)}
            style={styles.iconWrapper}
          >
            <Ionicons
              name={icon.name}
              size={30}
              color={isActive ? "#4B0082" : "#000"}
              style={isActive ? styles.activeIcon : undefined}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 14,
    marginBottom: 14,
    borderTopWidth: 1,
    borderTopColor: "#D3D3D3",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  iconWrapper: {
    padding: 6,
  },
  activeIcon: {
    transform: [{ scale: 1.1 }],
  },
});
