import { usePathname, useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  const pathname = usePathname();
  const isLoggedIn = false;
  console.log("현재 경로:", pathname);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.headerLogo}
          source={require("../../../assets/images/react-logo.png")}
        />
        {!isLoggedIn && (
          <TouchableOpacity style={styles.loginButton}>
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
            <TouchableOpacity onPress={() => router.replace(`/following`)}>
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
    </SafeAreaView>
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
