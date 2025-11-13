import NotFound from "@/app/+not-found";
import SideMenu from "@/components/SideMenu";
import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Activity() {
  const router = useRouter();
  const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);
  const pathname = usePathname(); // 현재 주소를 반환하는 훅
  const insets = useSafeAreaInsets();
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
    <View style={[styles.container, { top: insets.top }]}>
      <SideMenu
        isVisible={isSideMenuVisible}
        onClose={() => setIsSideMenuVisible(false)}
      />
      <View style={styles.header}>
        <Pressable
          onPress={() => setIsSideMenuVisible(true)}
          style={styles.sideMenu}
        >
          <Ionicons name="menu" size={24} color="black" />
        </Pressable>
      </View>
      <View>
        <View style={styles.tabBar}>
          <TouchableOpacity onPress={() => router.push(`/activity`)}>
            {/* button과 유사 */}
            <Text style={{ color: pathname === "/activity" ? "red" : "black" }}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push(`/activity/follows`)}>
            <Text
              style={{
                color: pathname === "/activity/follows" ? "red" : "black",
              }}
            >
              Follows
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push(`/activity/replies`)}>
            <Text
              style={{
                color: pathname === "/activity/replies" ? "red" : "black",
              }}
            >
              Replies
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push(`/activity/mentions`)}>
            <Text
              style={{
                color: pathname === "/activity/mentions" ? "red" : "black",
              }}
            >
              Mentions
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push(`/activity/quotes`)}>
            <Text
              style={{
                color: pathname === "/activity/quotes" ? "red" : "black",
              }}
            >
              Quotes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push(`/activity/reposts`)}>
            <Text
              style={{
                color: pathname === "/activity/reposts" ? "red" : "black",
              }}
            >
              Reposts
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push(`/activity/verified`)}>
            <Text
              style={{
                color: pathname === "/activity/verified" ? "red" : "black",
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
  header: {
    alignItems: "center",
    height: 50,
    justifyContent: "space-between",
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
