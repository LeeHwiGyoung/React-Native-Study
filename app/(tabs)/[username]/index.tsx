import { AuthContext } from "@/app/_layout";
import { TPost } from "@/components/Post";
import SimplePost from "@/components/SimplePost";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";

import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
export default function Username() {
  const { user } = useContext(AuthContext);
  const { username } = useLocalSearchParams(); //[]내의 값을 실제로 받아오는 훅
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [threadPost, setThreadPost] = useState<TPost[]>([]);
  const pressNewThreadsButton = () => {
    router.push("/modal");
  };

  const onEndReached = useCallback(() => {
    fetch(`users/${username.slice(1)}?cursor=${threadPost.at(-1)?.id}/posts`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.posts.length > 0) {
          setThreadPost((prev) => [...prev, ...data.posts]);
        }
      });
  }, [threadPost, username]);

  useEffect(() => {
    if (username !== undefined) {
      fetch(`users/${username.slice(1)}/posts`)
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
      {`@${user?.id}` === username && (
        <>
          <View style={styles.newThreadsContainer}>
            <View style={styles.profileContainer}>
              {user?.profileImageUrl ? (
                <Image
                  source={{ uri: user?.profileImageUrl }}
                  style={styles.profileAvatar}
                />
              ) : (
                <Ionicons
                  name="person-circle"
                  size={45}
                  color="#ccc"
                  style={styles.profileAvatar}
                />
              )}
            </View>
            <Text style={styles.newThreadText}>{`What's New?`}</Text>
            <TouchableOpacity
              style={styles.postButton}
              onPress={pressNewThreadsButton}
              activeOpacity={0.9}
            >
              <Text style={styles.postButtonText}>Post</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.seperator} />
        </>
      )}
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
