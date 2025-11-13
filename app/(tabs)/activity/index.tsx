import NotFound from "@/app/+not-found";
import { AuthContext } from "@/app/_layout";
import SideMenu from "@/components/SideMenu";
import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { useContext, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Activity() {
  const router = useRouter();
  const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);
  const { user } = useContext(AuthContext);
  const isLoggedIn = !!user;
  const pathname = usePathname(); // 현재 주소를 반환하는 훅
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  if (
    ![
      "/activity",
      "/activity/follows",
      "/activity/replies",
      "/activity/reposts",
      "/activity/mentions",
      "/activity/quotes",
      "/activity/verified",
    ].includes(pathname)
  ) {
    return <NotFound />;
  }
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
      <View>
        <View style={styles.tabBar}>
          <TouchableOpacity onPress={() => router.push(`/activity`)}>
            {/* button과 유사 */}
            <Text
              style={{
                color:
                  pathname === "/activity"
                    ? "red"
                    : colorScheme === "dark"
                      ? "white"
                      : "black",
              }}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push(`/activity/follows`)}>
            <Text
              style={{
                color:
                  pathname === "/activity/follows"
                    ? "red"
                    : colorScheme === "dark"
                      ? "white"
                      : "black",
              }}
            >
              Follows
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push(`/activity/replies`)}>
            <Text
              style={{
                color:
                  pathname === "/activity/replies"
                    ? "red"
                    : colorScheme === "dark"
                      ? "white"
                      : "black",
              }}
            >
              Replies
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push(`/activity/mentions`)}>
            <Text
              style={{
                color:
                  pathname === "/activity/mentions"
                    ? "red"
                    : colorScheme === "dark"
                      ? "white"
                      : "black",
              }}
            >
              Mentions
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push(`/activity/quotes`)}>
            <Text
              style={{
                color:
                  pathname === "/activity/quotes"
                    ? "red"
                    : colorScheme === "dark"
                      ? "white"
                      : "black",
              }}
            >
              Quotes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push(`/activity/reposts`)}>
            <Text
              style={{
                color:
                  pathname === "/activity/reposts"
                    ? "red"
                    : colorScheme === "dark"
                      ? "white"
                      : "black",
              }}
            >
              Reposts
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push(`/activity/verified`)}>
            <Text
              style={{
                color:
                  pathname === "/activity/verified"
                    ? "red"
                    : colorScheme === "dark"
                      ? "white"
                      : "black",
              }}
            >
              Verified
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
