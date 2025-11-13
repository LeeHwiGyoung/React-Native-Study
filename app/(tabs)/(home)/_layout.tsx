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
  useColorScheme,
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
  const colorScheme = useColorScheme();
  const { user, login } = useContext(AuthContext);
  const isLoggedIn = !!user;
  const [isVisibleSideMenu, setIsVisibleSideMenu] = useState(false);
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top },
        colorScheme === "dark" ? styles.containerDark : styles.containerLight,
      ]}
    >
      <SideMenu
        onClose={() => setIsVisibleSideMenu(false)}
        isVisible={isVisibleSideMenu}
      />
      <View
        style={[
          styles.header,
          colorScheme === "dark" ? styles.headerDark : styles.headerLight,
        ]}
      >
        {isLoggedIn && (
          <Pressable
            style={styles.sideMenu}
            onPress={() => setIsVisibleSideMenu(true)}
          >
            <Ionicons
              name="menu"
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          </Pressable>
        )}
        <Image
          style={styles.headerLogo}
          source={require("../../../assets/images/react-logo.png")}
        />
        {!isLoggedIn && (
          <TouchableOpacity
            style={[
              styles.loginButton,
              colorScheme === "dark"
                ? styles.loginButtonDark
                : styles.loginButtonLight,
            ]}
            onPress={login}
          >
            <Text
              style={
                colorScheme === "dark"
                  ? styles.loginButtonDarkText
                  : styles.loginButtonLightText
              }
            >
              로그인
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {isLoggedIn ? (
        <MaterialTopTabs
          screenOptions={{
            lazy: true,
            tabBarStyle: {
              backgroundColor: colorScheme === "dark" ? "#181818" : "white",
              shadowColor: "transparent",
              position: "relative",
            },
            tabBarPressColor: "transparent",
            tabBarActiveTintColor: colorScheme === "dark" ? "white" : "#555",
            tabBarIndicatorStyle: {
              backgroundColor: colorScheme === "dark" ? "white" : "black",
              height: 1,
            },
            tabBarIndicatorContainerStyle: {
              backgroundColor: colorScheme === "dark" ? "white" : "#aaa",
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
  containerDark: {
    backgroundColor: "#101010",
  },
  containerLight: {
    backgroundColor: "white",
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
    height: 50,
  },
  headerDark: {
    backgroundColor: "#101010",
  },
  headerLight: {
    backgroundColor: "white",
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
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  loginButtonDark: {
    backgroundColor: "white",
  },
  loginButtonLight: {
    backgroundColor: "black",
  },
  loginButtonDarkText: {
    color: "black",
  },
  loginButtonLightText: {
    color: "white",
  },
});
