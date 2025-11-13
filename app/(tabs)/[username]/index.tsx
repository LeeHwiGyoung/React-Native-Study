import { AuthContext } from "@/app/_layout";

import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
export default function Username() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const { username } = useLocalSearchParams(); //[]내의 값을 실제로 받아오는 훅

  console.log("username", username);
  return (
    <View style={styles.tabBar}>
      <Text>
        threads will be here
        {username}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
