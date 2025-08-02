import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color }) => {
          let iconName;

          if (route.name === "Home") iconName = focused ? "home" : "home-outline";
          else if (route.name === "Quests") iconName = focused ? "barbell" : "barbell-outline";
          else if (route.name === "Perfil") iconName = focused ? "person" : "person-outline";
          else if (route.name === "Insignias") iconName = focused ? "shield" : "shield-outline";
          else if (route.name === "Loja") iconName = focused ? "bag-handle" : "bag-handle-outline";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#019314",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tabs.Screen name="Home" />
      <Tabs.Screen name="Quests" />
      <Tabs.Screen name="Perfil" />
      <Tabs.Screen name="Insignias" />
      <Tabs.Screen name="Loja" />

      <Tabs.Screen name="Conquistas" options={{ href: null }} />
      <Tabs.Screen name="Configuracoes" options={{ href: null }} />
      <Tabs.Screen name="Pratica" options={{ href: null }} />
    </Tabs>
  );
}
