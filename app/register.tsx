import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { RegisterPayload } from "./types/auth";
import { register } from "./services/authService";
import { router } from "expo-router";

export default function Register() {
  const [form, setForm] = useState<RegisterPayload>({
    nom: "",
    prenom: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<RegisterPayload>>({});

  // ── Validation locale avant envoi ──
  const validate = (): boolean => {
    const e: Partial<RegisterPayload> = {};
    if (!form.nom.trim()) e.nom = "Le nom est requis";
    if (!form.prenom.trim()) e.prenom = "Le prénom est requis";
    if (!form.email.includes("@")) e.email = "Email invalide";
    if (form.password.length < 6) e.password = "6 caractères minimum";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Soumission du formulaire ──
  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await register(form);
      Alert.alert("Succès", "Compte créé avec succès !");
      router.replace("/login");
    } catch (err: any) {
      Alert.alert("Erreur", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.ecran}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* ── TITRE ── */}
        <Text style={styles.titre}>Créer un compte</Text>
        <Text style={styles.sousTitre}>
          Remplis le formulaire pour t'inscrire
        </Text>
        {/* ── CHAMPS ── */}
        <View style={styles.champ}>
          <Text style={styles.label}>Nom</Text>
          <TextInput
            style={[styles.input, errors.nom && styles.inputError]}
            placeholder="Ex : Kaboré"
            value={form.nom}
            onChangeText={(v) => setForm({ ...form, nom: v })}
          />
          {errors.nom && <Text style={styles.erreur}>{errors.nom}</Text>}
        </View>

        <View style={styles.champ}>
          <Text style={styles.label}>Prénom</Text>
          <TextInput
            style={[styles.input, errors.prenom && styles.inputError]}
            placeholder="Ex : Ibrahim"
            value={form.prenom}
            onChangeText={(v) => setForm({ ...form, prenom: v })}
          />
          {errors.prenom && <Text style={styles.erreur}>{errors.prenom}</Text>}
        </View>

        <View style={styles.champ}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="Ex : ibrahim@sonabel.bf"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={(v) => setForm({ ...form, email: v })}
          />
          {errors.email && <Text style={styles.erreur}>{errors.email}</Text>}
        </View>

        <View style={styles.champ}>
          <Text style={styles.label}>Mot de passe</Text>
          <TextInput
            style={[styles.input, errors.password && styles.inputError]}
            placeholder="6 caractères minimum"
            secureTextEntry
            value={form.password}
            onChangeText={(v) => setForm({ ...form, password: v })}
          />
          {errors.password && (
            <Text style={styles.erreur}>{errors.password}</Text>
          )}
        </View>
        {/* ── BOUTON ── */}
        <TouchableOpacity
          style={[styles.bouton, loading && styles.boutonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.boutonTexte}>Créer mon compte</Text>
          )}
        </TouchableOpacity>

        {/* ── LIEN LOGIN ── */}
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text style={styles.lien}>Déjà un compte ? Se connecter</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  ecran: { flex: 1, backgroundColor: "#F4F6F9" },
  scroll: { padding: 24, paddingTop: 60 },
  titre: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#003087",
    marginBottom: 6,
  },
  sousTitre: { fontSize: 14, color: "#7A8FA6", marginBottom: 32 },
  champ: { marginBottom: 18 },
  label: { fontSize: 13, fontWeight: "600", color: "#003087", marginBottom: 6 },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#dde8ff",
    borderRadius: 10,
    padding: 13,
    fontSize: 14,
    color: "#1a1a2e",
  },
  inputError: { borderColor: "#e53935" },
  erreur: { color: "#e53935", fontSize: 12, marginTop: 4 },
  bouton: {
    backgroundColor: "#003087",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 8,
  },
  boutonDisabled: { backgroundColor: "#7A8FA6" },
  boutonTexte: { color: "#fff", fontSize: 16, fontWeight: "600" },
  lien: {
    textAlign: "center",
    color: "#003087",
    marginTop: 20,
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
