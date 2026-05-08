import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React from "react";
import ChampInput from "@/components/ChampInput";
import { useForm } from "react-hook-form";
import { LoginFormData, loginSchema } from "@/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "./services/authService";
import { router } from "expo-router";
const [loading, setLoading] = React.useState(false);
const { control, handleSubmit } = useForm<LoginFormData>({
  resolver: zodResolver(loginSchema),
  defaultValues: {
    email: "",
    password: "",
  },
});

const onSubmit = async (data: LoginFormData) => {
  setLoading(true);
  try {
    await login(data);
    Alert.alert("Succès", "Connexion réussie !");
    router.replace("/dashboard");
  } catch (e: any) {
    Alert.alert("Erreur", e.message);
  } finally {
    setLoading(false);
  }
};
export default function Login() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Se connecter</Text>
      <ChampInput
        name="email"
        label="Email"
        control={control}
        inputProps={{ placeholder: "Votre email" }}
      />
      <ChampInput
        name="password"
        label="Mot de passe"
        control={control}
        inputProps={{
          placeholder: "Votre mot de passe",
          secureTextEntry: true,
        }}
      />
      {/* Bouton de connexion ici */}
      <TouchableOpacity
        style={[!loading && styles.button, { opacity: loading ? 0.6 : 1 }]}
        onPress={handleSubmit(onSubmit)}
      >
        <Text>Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 8 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 6, padding: 10 },
  error: { color: "red", fontSize: 12 },
  button: {
    backgroundColor: "#003087",
    padding: 15,
    borderRadius: 6,
    alignItems: "center",
  },
});
