// app/(tabs)/interventions.tsx — route /interventions
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import Burger from "@/components/burger";
import { SafeAreaView } from "react-native-safe-area-context";
const INTERVENTIONS = [
  {
    id: "1",
    titre: "Panne secteur Koulouba",
    lieu: "Secteur 15",
    heure: "08h32",
    statut: "urgent",
    icone: "⚡",
  },
  {
    id: "2",
    titre: "Relevé compteur Zogona",
    lieu: "Secteur 22",
    heure: "10h15",
    statut: "normal",
    icone: "📟",
  },
  {
    id: "3",
    titre: "Coupure Secteur 12",
    lieu: "Secteur 12",
    heure: "11h00",
    statut: "urgent",
    icone: "🔌",
  },
  {
    id: "4",
    titre: "Maintenance poteau",
    lieu: "Secteur 8",
    heure: "14h30",
    statut: "planifie",
    icone: "🔧",
  },
];

const STATUT_COULEUR: Record<string, string> = {
  urgent: "#E30613",
  normal: "#2ECC71",
  planifie: "#F39C12",
};
const STATUT_LABEL: Record<string, string> = {
  urgent: "Urgent",
  normal: "Normal",
  planifie: "Planifié",
};

function ListeVide() {
  return (
    <View style={styles.vide}>
      <Text style={styles.videIcone}>📋</Text>
      <Text style={styles.videTexte}>Aucune intervention</Text>
      <Text style={styles.videDetail}>
        Vous n'avez aucune mission assignée pour aujourd'hui.
      </Text>
      <TouchableOpacity style={styles.boutonActualiser}>
        <Text style={styles.boutonTexte}>Actualiser</Text>
      </TouchableOpacity>
    </View>
  );
}
function CarteIntervention(item: any) {
  return (
    <TouchableOpacity
      style={styles.carte}
      onPress={() => router.push(`/interventions/${item.id}`)}
    >
      <Text style={styles.icone}>{item.icone}</Text>
      <View style={styles.carteContenu}>
        <Text style={styles.titre}>{item.titre}</Text>
        <Text style={styles.detail}>
          📍 {item.lieu} · 🕐 {item.heure}
        </Text>
      </View>
      <View
        style={[styles.badge, { backgroundColor: STATUT_COULEUR[item.statut] }]}
      >
        <Text style={styles.badgeTexte}>{STATUT_LABEL[item.statut]}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function InterventionsScreen() {
  return (
    <SafeAreaView>
      <Burger title="Interventions" />
      <FlatList
        data={INTERVENTIONS}
        keyExtractor={(i) => i.id.toString()}
        contentContainerStyle={styles.liste}
        // Ajouter dans renderItem :
        renderItem={({ item }) => <CarteIntervention {...item} />}
        ListEmptyComponent={ListeVide}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  liste: { padding: 16 },
  carte: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  icone: { fontSize: 24, marginRight: 12 },
  carteContenu: { flex: 1 },
  titre: { fontSize: 13, fontWeight: "bold", color: "#003087" },
  detail: { fontSize: 11, color: "#7A8FA6", marginTop: 2 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  badgeTexte: { color: "#FFF", fontSize: 9, fontWeight: "bold" },
  vide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  videIcone: { fontSize: 48, marginBottom: 16 },
  videTexte: { fontSize: 18, fontWeight: "bold", color: "#003087" },
  videDetail: {
    fontSize: 14,
    color: "#7A8FA6",
    textAlign: "center",
    marginBottom: 24,
  },
  boutonActualiser: {
    backgroundColor: "#003087",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  boutonTexte: { color: "#FFF", fontSize: 14, fontWeight: "bold" },
});
