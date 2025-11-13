import { AuthContext } from "@/app/_layout";
import SideMenu from "@/components/SideMenu";
import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { useContext, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  const pathname = usePathname();
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
        <Pressable
          style={styles.sideMenu}
          onPress={() => setIsVisibleSideMenu(true)}
        >
          <Ionicons name="menu" size={24} color="black" />
        </Pressable>
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
      {isLoggedIn && (
        <View style={styles.tabContainer}>
          <View style={styles.tab}>
            <TouchableOpacity onPress={() => router.replace(`/`)}>
              <Text style={{ color: pathname === "/" ? "red" : "black" }}>
                Home
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tab}>
            <TouchableOpacity onPress={() => router.push(`/following`)}>
              <Text style={{ color: pathname === "/" ? "black" : "red" }}>
                For you
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View>
        <TouchableOpacity onPress={() => router.push("/username/post/1")}>
          <Text>게시글1</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.push("/username/post/2")}>
          <Text>게시글2</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.push("/username/post/3")}>
          <Text>게시글3</Text>
        </TouchableOpacity>
      </View>
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
