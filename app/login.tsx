import { Redirect, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext } from "react";
import { AuthContext } from "./_layout";
/*

 expo 에서는 secureStore와 asyncStore를 제공
 asyncStore 는 공개된 값들을 앱에 남겨놓을 때 적합
 운영체제에서 제공하는 보안키 제공 장소에 저장
*/
export default function Login() {
  const router = useRouter();
  const { user, login } = useContext(AuthContext);
  const isLoggedIn = !!user;
  if (isLoggedIn) {
    return <Redirect href="/(tabs)" />;
  }
  return (
    <SafeAreaView>
      <Pressable onPress={() => router.back()}>
        <Text>backs</Text>
      </Pressable>
      <Pressable onPress={login} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: "#000",
    padding: 10,
    width: 100,
    borderRadius: 5,
    alignItems: "center",
  },
  loginButtonText: {
    fontSize: 16,
    color: "#FFF",
  },
});
