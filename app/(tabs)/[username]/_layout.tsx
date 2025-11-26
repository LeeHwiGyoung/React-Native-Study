// 컴포넌트는  공유하는데 주소만 다르게 하는 패턴
import { useLocalSearchParams, withLayoutContext } from "expo-router";

import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import {
  Image,
  Pressable,
  Share,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import SideMenu from "@/components/SideMenu";
import { useContext, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext, User } from "@/app/_layout";
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
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const { user } = useContext(AuthContext);
  const { username } = useLocalSearchParams();
  const isLoggedIn = !!user;
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();

  const handleShareProfile = async () => {
    try {
      await Share.share({
        message: `thread://@${user?.name}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (username !== `@${user?.id}`) {
      fetch(`/users/${username}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data?.user);
          setProfileUser(data?.user);
        });
    } else {
      setProfileUser(user);
    }
  }, [username, user]);
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
        <Image
          style={styles.headerLogo}
          source={require("../../../assets/images/react-logo.png")}
        />
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
          {profileUser?.profileImageUrl ? (
            <Image
              source={{ uri: profileUser?.profileImageUrl }}
              style={styles.profileAvatar}
            />
          ) : (
            <Ionicons
              name="person-circle-outline"
              size={60}
              style={styles.profileAvatar}
            />
          )}
          <Text
            style={[
              styles.userIdText,
              colorScheme === "dark"
                ? styles.profileDarkText
                : styles.profileLightText,
            ]}
          >
            {profileUser?.id}
          </Text>
          <Text
            style={
              colorScheme === "dark"
                ? styles.profileDarkText
                : styles.profileLightText
            }
          >
            {profileUser?.name}
          </Text>
          <Text
            style={[
              styles.profileUserDescription,
              colorScheme === "dark"
                ? styles.profileDarkText
                : styles.profileLightText,
            ]}
          >
            {profileUser?.description}
          </Text>
        </View>
        <View style={styles.actionButtons}>
          <Pressable
            style={[
              styles.actionButton,
              colorScheme === "dark"
                ? styles.actionButtonDark
                : styles.actionButtonLight,
            ]}
          >
            <Text
              style={[
                styles.actionButtonText,
                colorScheme === "dark"
                  ? styles.profileDarkText
                  : styles.profileLightText,
              ]}
            >
              Follow
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.actionButton,
              colorScheme === "dark"
                ? styles.actionButtonDark
                : styles.actionButtonLight,
            ]}
            onPress={handleShareProfile}
          >
            <Text
              style={[
                styles.actionButtonText,
                colorScheme === "dark"
                  ? styles.profileDarkText
                  : styles.profileLightText,
              ]}
            >
              Share profile
            </Text>
          </Pressable>
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
  headerLogo: {
    width: 42,
    height: 42,
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
  profile: {
    padding: 16,
  },
  userIdText: {
    fontSize: 20,
    fontWeight: 700,
  },
  profileDarkText: {
    color: "white",
  },
  profileLightText: { color: "black" },
  profileHeader: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  profileAvatar: {
    position: "absolute",
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileUserDescription: {
    marginVertical: 12,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    flex: 1,
    borderWidth: 1,
    alignItems: "center",
    borderRadius: 8,
    paddingVertical: 8,
    marginHorizontal: 4,
  },
  actionButtonDark: {
    backgroundColor: "#101010",
    borderColor: "white",
  },
  actionButtonLight: {
    backgroundColor: "#fff",
    borderColor: "black",
  },
  actionButtonText: {
    fontSize: 16,
  },
});
