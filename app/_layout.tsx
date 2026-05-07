import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import CustomDrawer from "../components/CustomDrawer";
import {
  SafeAreaFrameContext,
  SafeAreaProvider,
} from "react-native-safe-area-context";
export default function Layout() {
  // En production : viendra de ton contexte Auth
  const user = { nom: "Kaboré", initiales: "KI", code: "SN-0042" };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Drawer
          drawerContent={(props) => <CustomDrawer user={user} {...props} />}
          screenOptions={{ headerShown: false }}
        ></Drawer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
