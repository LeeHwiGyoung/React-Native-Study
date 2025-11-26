import { User } from "@/app/_layout";
import FollowSuggestSimple from "@/components/FollowSuggestionSimple";
import { FlashList } from "@shopify/flash-list";
import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Follows() {
  const [followUser, setFollowUser] = useState<User[]>([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    fetch("/users")
      .then((res) => res.json())
      .then((data) => {
        setFollowUser(data.users);
      });
  }, []);

  return (
    <View style={styles.container}>
      <FlashList
        contentContainerStyle={{ paddingBottom: insets.bottom }}
        data={followUser}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FollowSuggestSimple item={item} />}
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
