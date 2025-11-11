import { router, Stack } from "expo-router";
import { createContext, useState } from "react";
import { Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext<{
  user?: object;
  login?: () => Promise<void>;
  logout?: () => Promise<void>;
}>({});
export default function RootLayout() {
  const [user, setUser] = useState(null);
  const login = () => {
    fetch("/login", {
      method: "POST",
      body: JSON.stringify({
        username: "hwigyoung",
        password: "1234",
      }),
    })
      .then((res) => {
        console.log("res", res, res.status);
        if (res.status >= 400) {
          return Alert.alert("Error", "invaild credentials");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setUser(data.user);
        return Promise.all([
          SecureStore.setItemAsync("accessToken", data.accessToken),
          SecureStore.setItemAsync("refreshToken", data.refreshToken),
          AsyncStorage.setItem("user", JSON.stringify(data.user)),
        ]).then(() => router.push("/(tabs)"));
      })
      .catch((error) => console.error(error));
  };
  const logout = () => {
    setUser(null);
    return Promise.all([
      SecureStore.deleteItemAsync("accessToken"),
      SecureStore.deleteItemAsync("refreshToken"),
      AsyncStorage.removeItem("user"),
    ]);
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        {/* presentation="modal" 은 모달형태로 띄워지게 됨 */}
      </Stack>
    </AuthContext.Provider>
  );
}
