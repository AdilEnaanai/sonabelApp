// app/compteurs.tsx — nouvelle route /compteurs
import Burger from "@/components/burger";
import { View, Text } from "react-native";
export default function CompteursScreen() {
  return (
    <>
      <Burger title="Compteurs" />
      <View style={{ flex: 1, padding: 24 }}>
        <Text>Gestion des compteurs</Text>
      </View>
    </>
  );
}
