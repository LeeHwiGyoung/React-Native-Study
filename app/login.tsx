import { Redirect, useRouter } from "expo-router";
import { Alert, Pressable, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const router = useRouter();
  const isLoggedIn = false;
  if (isLoggedIn) {
    return <Redirect href="/(tabs)" />;
  }
  const onLogin = () => {
    console.log("login");
    fetch("/login", {
      method: "POST",
      body: JSON.stringify({
        username: "hwigyoung",
        password: "1234",
      }),
    })
      .then((res) => {
        console.log("res", res, res.status);
        if (res.status >= 400) {
          return Alert.alert("Error", "invaild credentials");
        }
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };
  return (
    <SafeAreaView>
      <Pressable onPress={() => router.back()}>
        <Text>backs</Text>
      </Pressable>
      <Pressable onPress={onLogin} style={styles.loginButton}>
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
