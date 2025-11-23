import Post, { TPost } from "@/components/Post";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, useColorScheme, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [posts, setPosts] = useState<TPost[]>([]);
  useEffect(() => {
    fetch(`posts`)
      .then((res) => res.json())
      .then((data) => {
        console.log("postData", data);
        setPosts(data.posts);
      });
  }, []);
  return (
    <View
      style={[
        styles.container,
        colorScheme === "dark" ? styles.containerDark : styles.containerLight,
      ]}
    >
      <FlatList
        data={posts}
        renderItem={({ item }) => <Post item={item} />}
        keyExtractor={(item) => item.id}
      />
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
