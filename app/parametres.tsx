// app/parametres.tsx — nouvelle route /parametres
import Burger from "@/components/burger";
import { View, Text } from "react-native";
export default function ParametresScreen() {
  return (
    <>
      <Burger title="Paramètres" />
      <View style={{ flex: 1, padding: 24 }}>
        <Text>Paramètres</Text>
      </View>
    </>
  );
}
