import FollowSimpleActivityItem from "@/components/FollowSimpleActivityItem";
import { TPost } from "@/components/Post";
import { FlashList } from "@shopify/flash-list";
import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const [followPost, setFollowPost] = useState<TPost[]>([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    fetch("/posts")
      .then((res) => res.json())
      .then((data) => {
        setFollowPost(data.posts);
      });
  }, []);

  return (
    <View style={styles.container}>
      <FlashList
        contentContainerStyle={{ paddingBottom: insets.bottom }}
        data={followPost}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FollowSimpleActivityItem item={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    height: 1, // 구분선의 높이
    marginLeft: 50,
    marginVertical: 4, // 위아래 간격
    width: "100%",
    backgroundColor: "#eeeeee",
  },
});
