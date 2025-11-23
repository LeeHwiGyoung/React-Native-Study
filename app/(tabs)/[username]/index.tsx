import { AuthContext } from "@/app/_layout";

import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext } from "react";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
export default function Username() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const { username } = useLocalSearchParams(); //[]내의 값을 실제로 받아오는 훅
  const colorScheme = useColorScheme();
  return (
    <View
      style={[
        styles.container,
        colorScheme === "dark" ? styles.containerDark : styles.containerLight,
      ]}
    >
      <Text
        style={
          colorScheme === "dark" ? styles.textDarkMode : styles.textLightMode
        }
      >
        threads will be here
        {username}
      </Text>
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
  textDarkMode: {
    color: "white",
  },
  textLightMode: {
    color: "black",
  },
});
