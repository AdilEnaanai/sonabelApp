import { Tabs } from "expo-router";
import { Text } from "react-native";
export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="interventions"
        options={{
          title: "Interventions",
          tabBarIcon: () => <Text style={{ fontSize: 18 }}>🛠️</Text>,
          headerShown: false, // Masquer le header pour ce screen
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: () => <Text style={{ fontSize: 18 }}>📊</Text>,
          headerShown: false, // Masquer le header pour ce screen
        }}
      />
    </Tabs>
  );
}
