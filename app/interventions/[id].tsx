// app/interventions/[id].tsx — route /interventions/:id
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalSearchParams, router, Stack } from "expo-router";

// Données simulées — en production : fetch depuis l'API
const INTERVENTIONS: Record<
  string,
  {
    titre: string;
    lieu: string;
    heure: string;
    agent: string;
    urgence: boolean;
  }
> = {
  "1": {
    titre: "Panne secteur Koulouba",
    lieu: "Secteur 15",
    heure: "08h32",
    agent: "Kaboré Ibrahim",
    urgence: true,
  },
  "2": {
    titre: "Relevé compteur Zogona",
    lieu: "Secteur 22",
    heure: "10h15",
    agent: "Sawadogo Ali",
    urgence: false,
  },
};

export default function DetailScreen() {
  // useLocalSearchParams lit les paramètres de l'URL
  // URL /interventions/1  →  { id: '1' }  (toujours une string !)
  const { id } = useLocalSearchParams<{ id: string }>();
  const intervention = INTERVENTIONS[id];

  if (!intervention)
    return (
      <View style={styles.centre}>
        <Text style={styles.erreur}>Intervention introuvable</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.lien}>← Retour</Text>
        </TouchableOpacity>
      </View>
    );

  return (
    <View style={styles.ecran}>
      {/* Changer le titre du header depuis l'intérieur de l'écran */}
      <Stack.Screen options={{ title: `Intervention #${id}` }} />

      <View style={styles.fiche}>
        <Text style={styles.titre}>{intervention.titre}</Text>
        <View style={styles.separateur} />
        <Text style={styles.detail}>📍 {intervention.lieu}</Text>
        <Text style={styles.detail}>🕐 {intervention.heure}</Text>
        <Text style={styles.detail}>👤 {intervention.agent}</Text>
        <View
          style={[
            styles.badge,
            { backgroundColor: intervention.urgence ? "#E30613" : "#2ECC71" },
          ]}
        >
          <Text style={styles.badgeTexte}>
            {intervention.urgence ? "Urgent" : "Normal"}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.bouton} onPress={() => router.back()}>
        <Text style={styles.boutonTexte}>Démarrer l'intervention</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  ecran: { flex: 1, padding: 20, backgroundColor: "#F4F6F9" },
  centre: { flex: 1, justifyContent: "center", alignItems: "center" },
  fiche: {
    backgroundColor: "#FFF",
    borderRadius: 14,
    padding: 20,
    marginBottom: 20,
  },
  titre: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#003087",
    marginBottom: 12,
  },
  separateur: { height: 1, backgroundColor: "#E0E6EF", marginBottom: 12 },
  detail: { fontSize: 13, color: "#7A8FA6", marginBottom: 8 },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 8,
  },
  badgeTexte: { color: "#FFF", fontSize: 11, fontWeight: "bold" },
  bouton: {
    backgroundColor: "#E30613",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
  },
  boutonTexte: { color: "#FFF", fontWeight: "bold", fontSize: 14 },
  erreur: { color: "#E30613", marginBottom: 12 },
  lien: { color: "#003087", fontWeight: "bold" },
});
