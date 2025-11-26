import Post, { TPost } from "@/components/Post";
import { FlashList } from "@shopify/flash-list";
import { usePathname, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, useColorScheme, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const path = usePathname();
  const [posts, setPosts] = useState<TPost[]>([]);
  const onEndReached = () => {
    fetch(`posts?type=${path.split("/").pop()}&cursor=${posts.at(-1)?.id}`)
      .then((res) => res.json())
      .then((data) => {
        setPosts([...posts, ...data.posts]);
      });
  };

  useEffect(() => {
    fetch(`posts?type=${path.split("/").pop()}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("postData", data);
        setPosts(data.posts);
      });
  }, [path]);
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
