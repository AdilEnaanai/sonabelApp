import { StyleSheet, View, Text } from "react-native";
import { useWindowDimensions } from "react-native";
export default function Dashboard() {
  const { width } = useWindowDimensions();
  const largeurCarte = (width - 16 * 2 - 12) / 2;

  return (
    <View style={styles.ecran}>
      <View style={styles.entete}>
        <Text style={styles.bonjour}>Bonjour,</Text>
        <Text style={styles.nomAgent}>Agent Kaboré</Text>
        <Text style={styles.date}>Mardi 3 juin 2025</Text>
      </View>
      <View style={styles.contenu}>
        <Text style={styles.sectionTitre}>Mes interventions du jour</Text>

        <View style={styles.grille}>
          <View style={[styles.carte, { width: largeurCarte }]}>
            <Text style={styles.carteIcone}>⚡</Text>
            <Text style={styles.carteNombre}>12</Text>
            <Text style={styles.carteLabel}>Pannes signalées</Text>
          </View>

          <View style={[styles.carte, { width: largeurCarte }]}>
            <Text style={styles.carteIcone}>🔧</Text>
            <Text style={styles.carteNombre}>5</Text>
            <Text style={styles.carteLabel}>Interventions</Text>
          </View>

          <View style={[styles.carte, { width: largeurCarte }]}>
            <Text style={styles.carteIcone}>📟</Text>
            <Text style={styles.carteNombre}>38</Text>
            <Text style={styles.carteLabel}>Compteurs relevés</Text>
          </View>

          <View style={[styles.carte, { width: largeurCarte }]}>
            <Text style={styles.carteIcone}>🚨</Text>
            <Text style={styles.carteNombre}>2</Text>
            <Text style={styles.carteLabel}>Alertes actives</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ecran: {
    flex: 1,
    backgroundColor: "#F4F6F9",
  },
  sectionTitre: {
    fontSize: 13,
    fontWeight: "600",
    color: "#7A8FA6",
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  grille: {
    flexDirection: "row", // les enfants s'alignent horizontalement
    flexWrap: "wrap", // ils passent à la ligne si ça déborde
    gap: 12,
  },

  entete: {
    backgroundColor: "#003087",
    paddingTop: 56,
    paddingBottom: 28,
    paddingHorizontal: 24,
  },
  bonjour: {
    fontSize: 14,
    color: "#A8C4E0",
  },
  nomAgent: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 2,
  },
  date: {
    fontSize: 12,
    color: "#7BAED4",
    marginTop: 6,
  },
  contenu: {
    padding: 16,
  },
  carte: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 20,
    alignItems: "center",
    width: "47%", // presque la moitié → 2 cartes par ligne
  },

  carteIcone: {
    fontSize: 28,
    marginBottom: 8,
  },
  carteNombre: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#003087",
  },
  carteLabel: {
    fontSize: 12,
    color: "#7A8FA6",
    marginTop: 4,
    textAlign: "center",
  },
});
