import { TPost } from "@/components/Post";
import SimplePost from "@/components/SimplePost";
import { FlashList } from "@shopify/flash-list";

import { useGlobalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, useColorScheme, View } from "react-native";

export default function Replise() {
  const colorScheme = useColorScheme();
  const [threadPost, setThreadPost] = useState<TPost[]>([]);

  const { username } = useGlobalSearchParams();

  const onEndReached = useCallback(() => {
    fetch(`replies/${username.slice(1)}?cursor=${threadPost.at(-1)?.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.posts.length > 0) {
          setThreadPost((prev) => [...prev, ...data.posts]);
        }
      });
  }, [threadPost, username]);

  useEffect(() => {
    if (username !== undefined) {
      fetch(`replies/${username.slice(1)}`)
        .then((res) => res.json())
        .then((data) => {
          setThreadPost(data.posts);
        });
    }
  }, [username]);

  return (
    <View
      style={[
        styles.container,
        colorScheme === "dark" ? styles.containerDark : styles.containerLight,
      ]}
    >
      <FlashList
        data={threadPost}
        renderItem={({ item }) => <SimplePost item={item} />}
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
  textDarkMode: {
    color: "white",
  },
  textLightMode: {
    color: "black",
  },
  newThreadsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  profileContainer: {
    width: 50,
  },
  profileAvatar: {
    width: 45,
    height: 45,
  },
  newThreadText: {
    fontSize: 16,
    fontWeight: "600",
  },
  postButton: {
    marginLeft: "auto",
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#000",
    borderRadius: 12,
  },
  postButtonText: {
    color: "white",
  },
  seperator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#000",
  },
});
