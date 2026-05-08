import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { registerSchema, RegisterFormData } from "../schemas/registerSchema";
import ChampInput from "../components/ChampInput";
import { register } from "./services/authService";

export default function RegisterScreen() {
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    try {
      await register(data);
      Alert.alert("Succès", "Compte créé !");
      router.replace("/login");
    } catch (e: any) {
      Alert.alert("Erreur", e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={s.ecran}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={s.scroll}>
        <Text style={s.titre}>Créer un compte</Text>

        <ChampInput
          name="nom"
          control={control}
          label="Nom"
          inputProps={{ placeholder: "Kaboré" }}
        />
        <ChampInput
          name="prenom"
          control={control}
          label="Prénom"
          inputProps={{ placeholder: "Ibrahim" }}
        />
        <ChampInput
          name="email"
          control={control}
          label="Email"
          inputProps={{
            placeholder: "ibrahim@sonabel.bf",
            keyboardType: "email-address",
            autoCapitalize: "none",
          }}
        />
        <ChampInput
          name="password"
          control={control}
          label="Mot de passe"
          inputProps={{
            placeholder: "Min. 6 car., 1 maj., 1 chiffre",
            secureTextEntry: true,
          }}
        />
        <ChampInput
          name="confirmPassword"
          control={control}
          label="Confirmer mot de passe"
          inputProps={{
            placeholder: "Répète le mot de passe",
            secureTextEntry: true,
          }}
        />

        <TouchableOpacity
          style={[s.btn, loading && s.btnOff]}
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={s.btnTxt}>Créer mon compte</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text style={s.lien}>Déjà un compte ? Se connecter</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  ecran: { flex: 1, backgroundColor: "#F4F6F9" },
  scroll: { padding: 24, paddingTop: 60 },
  titre: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#003087",
    marginBottom: 28,
  },
  btn: {
    backgroundColor: "#003087",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 8,
  },
  btnOff: { backgroundColor: "#7A8FA6" },
  btnTxt: { color: "#fff", fontSize: 16, fontWeight: "600" },
  lien: {
    textAlign: "center",
    color: "#003087",
    marginTop: 20,
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
