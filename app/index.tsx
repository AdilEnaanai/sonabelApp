// app/index.tsx
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Burger from "@/components/burger";
import { router, Router } from "expo-router";

export default function AccueilScreen() {
  return (
    <View style={styles.ecran}>
      <Burger title="Accueil" />
      {/* ── CONTENU centré ── */}
      <View style={styles.contenu}>
        <View style={styles.carte}>
          <Text style={styles.titre}>Bienvenue sur SONABEL</Text>
          <Text style={styles.sousTitre}>Application Terrain Agent</Text>
        </View>

        <TouchableOpacity
          style={styles.bouton}
          onPress={() => {
            router.push("../register");
          }}
        >
          <Text style={styles.boutonTexte}>Créer un compte</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ecran: {
    flex: 1,
    backgroundColor: "#F4F6F9",
  },

  // Header fixe en haut
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingTop: 50, // SafeArea
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e8ecf0",
  },
  burger: {
    fontSize: 24,
    color: "#003087",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#003087",
  },

  // Zone centrale scrollable
  contenu: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  carte: {
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 14,
    alignItems: "center",
    width: "100%",
  },
  titre: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#003087",
  },
  sousTitre: {
    fontSize: 14,
    color: "#7A8FA6",
    marginTop: 8,
  },

  bouton: {
    marginTop: 32,
    backgroundColor: "#003087",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
  },
  boutonTexte: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
