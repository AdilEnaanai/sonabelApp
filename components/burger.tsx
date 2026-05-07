import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "expo-router";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

type BurgerProps = { title: string };

export default function Burger({ title }: BurgerProps) {
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Text style={styles.burger}>☰</Text>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 30,
  },
  burger: { fontSize: 24, color: "#003087" },
  headerTitle: { fontSize: 18, fontWeight: "600", color: "#003087" },
});
