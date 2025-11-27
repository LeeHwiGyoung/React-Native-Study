import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TPost } from "./Post";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function SimplePost({ item }: { item: TPost }) {
  const router = useRouter();
  const onPressProfile = (username: string | undefined) => {
    router.push(`/@${username}`);
  };

  return (
    <TouchableOpacity style={styles.followSimpleActivityContainer}>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={() => onPressProfile(item.user.id)}>
          {item.user.profileImageUrl ? (
            <Image
              style={styles.avatar}
              source={{ uri: item.user.profileImageUrl }}
            />
          ) : (
            <Ionicons
              style={styles.avatar}
              name="person-circle"
              size={40}
              color="#ccc"
            />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.postContainer}>
        <View style={styles.postHeader}>
          <Text style={styles.postWriterText}>{item.user.id}</Text>
          <Text style={styles.timeAgo}>{item.timeAgo}일전</Text>
        </View>
        <View style={styles.postContent}>
          <Text
            style={styles.postContentText}
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {item.content}
          </Text>
        </View>
        <View style={styles.postFooter}>
          <View style={styles.postActionButtons}>
            <Pressable>
              <Ionicons
                style={styles.postActionButton}
                name="heart"
                size={16}
              />
            </Pressable>
            <Pressable style={styles.row}>
              <Ionicons
                style={styles.postActionButton}
                name="chatbox-outline"
                size={16}
              />
              <Text style={styles.commentText}>{item.comments}</Text>
            </Pressable>
            <Pressable>
              <Ionicons
                style={styles.postActionButton}
                name="repeat"
                size={16}
              />
            </Pressable>
            <Pressable>
              <Ionicons
                style={[
                  styles.postActionButton,
                  { transform: [{ rotate: "18deg" }] },
                ]}
                name="paper-plane-outline"
                size={16}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  followSimpleActivityContainer: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  profileContainer: {
    marginRight: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  postContainer: {
    width: "85%",
  },
  postHeader: {
    flexDirection: "row",
  },
  postWriterText: {
    color: "black",
    fontWeight: "600",
  },
  timeAgo: {
    marginLeft: 8,
    color: "#ccc",
  },
  postContent: {
    paddingVertical: 8,
  },
  postContentText: {
    fontSize: 16,
  },
  postFooter: {
    marginTop: 12,
  },
  postActionButtons: {
    flexDirection: "row",
    gap: 20,
  },
  postActionButton: {
    verticalAlign: "bottom",
  },
  commentText: {
    marginLeft: 4,
  },
  row: {
    flexDirection: "row",
  },
});
