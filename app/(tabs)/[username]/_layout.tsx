// 컴포넌트는  공유하는데 주소만 다르게 하는 패턴
import { withLayoutContext } from "expo-router";

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
  const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);
  const { user } = useContext(AuthContext);
  const isLoggedIn = !!user;
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top },
        colorScheme === "dark" ? styles.containerDark : styles.containerLight,
      ]}
    >
      <SideMenu
        isVisible={isSideMenuVisible}
        onClose={() => setIsSideMenuVisible(false)}
      />
      <View
        style={[
          styles.header,
          colorScheme === "dark" ? styles.headerDark : styles.headerLight,
        ]}
      >
        {isLoggedIn && (
          <Pressable
            onPress={() => setIsSideMenuVisible(true)}
            style={styles.sideMenu}
          >
            <Ionicons
              name="menu"
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          </Pressable>
        )}
      </View>
      <View style={styles.profile}>
        <View style={styles.profileHeader}>
          {user?.profileImageUrl ? (
            <Image
              source={{ uri: user?.profileImageUrl }}
              style={styles.profileAvatar}
            />
          ) : (
            <Ionicons name="person-circle-outline" size={50} />
          )}
          <Text
            style={
              colorScheme === "dark"
                ? styles.profileDarkText
                : styles.profileLightText
            }
          >
            {user?.name}
          </Text>
          <Text
            style={
              colorScheme === "dark"
                ? styles.profileDarkText
                : styles.profileLightText
            }
          >
            {user?.description}
          </Text>
        </View>
      </View>
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
        <MaterialTopTabs.Screen name="index" options={{ title: "Threads" }} />
        <MaterialTopTabs.Screen name="replies" options={{ title: "Replies" }} />
        <MaterialTopTabs.Screen name="reposts" options={{ title: "Reposts" }} />
      </MaterialTopTabs>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  containerDark: {
    backgroundColor: "#101010",
  },
  containerLight: {
    backgroundColor: "white",
  },
  header: {
    alignItems: "center",
    height: 50,
    justifyContent: "space-between",
  },
  headerDark: {
    backgroundColor: "#101010",
  },
  headerLight: {
    backgroundColor: "white",
  },
  sideMenu: {
    position: "absolute",
    top: 0,
    left: 20,
    paddingVertical: 8,
  },
  profile: {},
  profileDarkText: {
    color: "white",
  },
  profileLightText: { color: "black" },
  profileHeader: {},
  profileAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
