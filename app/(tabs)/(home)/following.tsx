import Post, { TPost } from "@/components/Post";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, useColorScheme, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [posts, setPosts] = useState<TPost[]>([]);

  const onEndReached = useCallback(() => {
    if (posts.length > 0) {
      fetch(`/posts?type=following&cursor=${posts.at(-1)?.id}`)
        .then((res) => res.json())
        .then((data) => setPosts((prev) => [...prev, ...data.posts]));
    }
  }, [posts]);

  useEffect(() => {
    fetch(`posts?type=following`)
      .then((res) => res.json())
      .then((data) => {
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
      <FlashList
        data={posts}
        renderItem={({ item }) => <Post item={item} />}
        keyExtractor={(item) => item.id}
        onEndReached={onEndReached}
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
