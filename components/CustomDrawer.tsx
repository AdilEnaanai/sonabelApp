import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { useRouter, usePathname } from "expo-router";

type MenuItem = { label: string; href: string };

type UserInfo = { nom: string; initiales: string; code: string };

type CustomDrawerProps = DrawerContentComponentProps & { user: UserInfo };

const menuItems: MenuItem[] = [
  { label: "Accueil", href: "/" },
  { label: "Interventions", href: "/interventions" },
  { label: "Compteurs", href: "/compteurs" },
  { label: "Paramètres", href: "/parametres" },
];

export default function CustomDrawer({ user, ...props }: CustomDrawerProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user.initiales}</Text>
        </View>
        <View>
          <Text style={styles.userName}>{user.nom}</Text>
          <Text style={styles.userCode}>{user.code}</Text>
        </View>
      </View>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ paddingTop: 8 }}
      >
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <TouchableOpacity
              key={item.href}
              style={[styles.item, isActive && styles.itemActive]}
              onPress={() => router.push(item.href as any)}
            >
              <Text
                style={[styles.itemText, isActive && styles.itemTextActive]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </DrawerContentScrollView>
      <TouchableOpacity
        style={styles.logout}
        onPress={() => router.replace("/login" as any)}
      >
        <Text style={styles.logoutText}>🚪 Déconnexion</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1a3a8f" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 24,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.2)",
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#8ba9d4",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: { color: "#1a3a8f", fontWeight: "700", fontSize: 16 },
  userName: { color: "#fff", fontSize: 17, fontWeight: "600" },
  userCode: { color: "#9ab2d8", fontSize: 13 },
  item: {
    padding: 14,
    paddingHorizontal: 20,
    marginHorizontal: 8,
    borderRadius: 8,
    marginBottom: 2,
  },
  itemActive: { backgroundColor: "rgba(255,255,255,0.18)" },
  itemText: { color: "#c8d8f0", fontSize: 15 },
  itemTextActive: { color: "#fff", fontWeight: "600" },
  logout: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.2)",
    marginBottom: 60,
  },
  logoutText: { color: "#e05555", fontSize: 15, fontWeight: "500" },
});
