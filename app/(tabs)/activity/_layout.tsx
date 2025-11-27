import NotFound from "@/app/+not-found";
import { AuthContext } from "@/app/_layout";
import SideMenu from "@/components/SideMenu";
import { Ionicons } from "@expo/vector-icons";
import { Slot, usePathname, useRouter } from "expo-router";
import { useContext, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ActivityTabLayout() {
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
    <>
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
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyle}
          >
            <TouchableOpacity
              style={[
                styles.tabBarButton,
                pathname === "/activity" && styles.tabBarButtonActive,
              ]}
              onPress={() => router.push(`/activity`)}
            >
              <Text style={[styles.tabBarButtonText]}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabBarButton,
                pathname === "/activity/follows" && styles.tabBarButtonActive,
              ]}
              onPress={() => router.push(`/activity/follows`)}
            >
              <Text style={[styles.tabBarButtonText]}>Follows</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabBarButton,
                pathname === "/activity/replies" && styles.tabBarButtonActive,
              ]}
              onPress={() => router.push(`/activity/replies`)}
            >
              <Text style={[styles.tabBarButtonText]}>Replies</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabBarButton,
                pathname === "/activity/mentions" && styles.tabBarButtonActive,
              ]}
              onPress={() => router.push(`/activity/mentions`)}
            >
              <Text style={[styles.tabBarButtonText]}>Mentions</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabBarButton,
                pathname === "/activity/quotes" && styles.tabBarButtonActive,
              ]}
              onPress={() => router.push(`/activity/quotes`)}
            >
              <Text style={[styles.tabBarButtonText]}>Quotes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabBarButton,
                pathname === "/activity/reposts" && styles.tabBarButtonActive,
              ]}
              onPress={() => router.push(`/activity/reposts`)}
            >
              <Text style={[styles.tabBarButtonText]}>Reposts</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabBarButton,
                pathname === "/activity/verified" && styles.tabBarButtonActive,
              ]}
              onPress={() => router.push(`/activity/verified`)}
            >
              <Text style={[styles.tabBarButtonText]}>Verified</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View style={styles.contentWrapper}>
          <Slot />
        </View>
      </View>
    </>
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

  contentContainerStyle: {
    paddingHorizontal: 12,
    gap: 20,
    paddingVertical: 8,
  },
  tabBarButton: {
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderColor: "#cccccc",
    backgroundColor: "transparent",
  },
  tabBarButtonActive: {
    backgroundColor: "#eeeeee",
  },
  tabBarButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  contentWrapper: {
    flex: 1,
  },
});
