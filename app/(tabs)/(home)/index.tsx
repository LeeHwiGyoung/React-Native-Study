import { AuthContext } from "@/app/_layout";
import { useRouter } from "expo-router";
import { useContext } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  const { user, login } = useContext(AuthContext);
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  return (
    <View
      style={[
        styles.container,
        colorScheme === "dark" ? styles.containerDark : styles.containerLight,
      ]}
    >
      <View>
        <TouchableOpacity onPress={() => router.push("/username/post/1")}>
          <Text
            style={colorScheme === "dark" ? styles.textDark : styles.textLight}
          >
            게시글1
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.push("/username/post/2")}>
          <Text
            style={colorScheme === "dark" ? styles.textDark : styles.textLight}
          >
            게시글2
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.push("/username/post/3")}>
          <Text
            style={colorScheme === "dark" ? styles.textDark : styles.textLight}
          >
            게시글3
          </Text>
        </TouchableOpacity>
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
  textLight: {
    color: "black",
  },
  textDark: {
    color: "white",
  },
});
