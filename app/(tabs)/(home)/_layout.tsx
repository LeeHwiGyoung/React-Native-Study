// 컴포넌트는  공유하는데 주소만 다르게 하는 패턴
import { Slot, usePathname, withLayoutContext } from "expo-router";

import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SideMenu from "@/components/SideMenu";
import { useContext, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "@/app/_layout";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function Layout() {
  const { user, login } = useContext(AuthContext);
  const isLoggedIn = !!user;
  const [isVisibleSideMenu, setIsVisibleSideMenu] = useState(false);
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { top: insets.top }]}>
      <SideMenu
        onClose={() => setIsVisibleSideMenu(false)}
        isVisible={isVisibleSideMenu}
      />
      <View style={styles.header}>
        {isLoggedIn && (
          <Pressable
            style={styles.sideMenu}
            onPress={() => setIsVisibleSideMenu(true)}
          >
            <Ionicons name="menu" size={24} color="black" />
          </Pressable>
        )}
        <Image
          style={styles.headerLogo}
          source={require("../../../assets/images/react-logo.png")}
        />
        {!isLoggedIn && (
          <TouchableOpacity style={styles.loginButton} onPress={login}>
            <Text style={styles.loginButtonText}>로그인</Text>
          </TouchableOpacity>
        )}
      </View>
      {isLoggedIn ? (
        <MaterialTopTabs
          screenOptions={{
            lazy: true,
            tabBarStyle: {
              backgroundColor: "white",
              shadowColor: "transparent",
              position: "relative",
            },
            tabBarPressColor: "transparent",
            tabBarActiveTintColor: "#555",
            tabBarIndicatorStyle: {
              backgroundColor: "black",
              height: 1,
            },
            tabBarIndicatorContainerStyle: {
              backgroundColor: "#aaa",
              position: "absolute",
              top: 49,
              height: 1,
            },
          }}
        >
          <MaterialTopTabs.Screen name="index" options={{ title: "For you" }} />
          <MaterialTopTabs.Screen
            name="following"
            options={{ title: "Following" }}
          />
        </MaterialTopTabs>
      ) : (
        <Slot />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: "row",
  },
  tab: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
  },
  headerLogo: {
    width: 42,
    height: 42,
  },
  sideMenu: {
    position: "absolute",
    top: 0,
    left: 20,
    paddingVertical: 8,
  },
  loginButton: {
    position: "absolute",
    right: 20,
    top: 0,
    backgroundColor: "#000",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  loginButtonText: {
    color: "#fff",
  },
});
