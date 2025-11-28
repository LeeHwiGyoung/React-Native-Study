import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { DetailedPost } from "./Post";

export default function DetailPost({ item }: { item: DetailedPost }) {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const handleShare = async (username: string, postId: string) => {
    const shareUrl = `thread://@${username}/post/${postId}`;
    try {
      await Share.share({
        message: shareUrl,
        url: shareUrl,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserPress = (post: DetailedPost) => {
    router.push(`/@${post.user.id}`);
  };

  return (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <TouchableOpacity onPress={() => handleUserPress(item)}>
            {item.user.profileImageUrl ? (
              <Image
                style={styles.avatar}
                source={{ uri: item.user.profileImageUrl }}
              />
            ) : (
              <View style={styles.avatar}>
                <Ionicons name="person-circle" size={40} color="#ccc" />
              </View>
            )}
          </TouchableOpacity>
          <View style={styles.usernameContainer}>
            <TouchableOpacity onPress={() => handleUserPress(item)}>
              <View style={styles.usernameRow}>
                <Text
                  style={[
                    styles.username,
                    colorScheme === "dark"
                      ? styles.usernameDark
                      : styles.usernameLight,
                  ]}
                >
                  {item.user.id}
                </Text>
                {item.user.isVerified && (
                  <Ionicons
                    name="checkmark-circle"
                    size={16}
                    color="#0095f6"
                    style={styles.verifiedIcon}
                  />
                )}
                <Text
                  style={[
                    styles.timeAgo,
                    colorScheme === "dark"
                      ? styles.timeAgoDark
                      : styles.timeAgoLight,
                  ]}
                >
                  {item.timeAgo}일전
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followButtonText}>팔로우</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.postContent} pointerEvents="box-none">
        <Text
          style={[
            styles.postText,
            colorScheme === "dark" ? styles.postTextDark : styles.postTextLight,
          ]}
        >
          {item.content}
        </Text>
        <View pointerEvents="box-none">
          <ScrollView
            pointerEvents="box-only"
            horizontal
            scrollEnabled
            nestedScrollEnabled
            contentContainerStyle={styles.postImages}
          >
            {item.imageUrls &&
              item.imageUrls.length > 0 &&
              item.imageUrls.map((image) => (
                <Image
                  key={image}
                  source={{ uri: image }}
                  style={styles.postImage}
                  resizeMode="cover"
                />
              ))}
          </ScrollView>
        </View>
        {item.location && item.location.length > 0 && (
          <Text style={styles.postText}>{item.location.join(", ")}</Text>
        )}
      </View>
      <View style={styles.postFooter}>
        <View style={styles.postActionButtons}>
          <Pressable>
            <Ionicons style={styles.postActionButton} name="heart" size={16} />
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
            <Ionicons style={styles.postActionButton} name="repeat" size={16} />
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
  );
}

const styles = StyleSheet.create({
  // 포스트 스타일
  postContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    padding: 12,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  userInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  usernameContainer: {
    flex: 1,
  },
  usernameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    fontWeight: "600",
    fontSize: 15,
    marginRight: 4,
  },
  usernameDark: {
    color: "white",
  },
  usernameLight: {
    color: "#000",
  },
  verifiedIcon: {
    marginRight: 4,
  },
  timeAgo: {
    fontSize: 14,
    marginLeft: 4,
  },
  timeAgoDark: {
    color: "#ccc",
  },
  timeAgoLight: {
    color: "#888",
  },
  postContent: {},
  postText: {
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 8,
  },
  postTextDark: {
    color: "white",
  },
  postTextLight: {
    color: "#000",
  },
  postImages: {
    flexDirection: "row",
    gap: 8,
  },
  postImage: {
    width: 300,
    height: 300,
    borderRadius: 12,
    marginTop: 8,
  },
  postLink: {
    width: "85%",
    height: 200,
    borderRadius: 12,
    marginTop: 8,
  },
  postActions: {
    flexDirection: "row",
    marginTop: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
  },
  actionCount: {
    marginLeft: 4,
    fontSize: 14,
    color: "#666",
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
  followButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#000",
    borderRadius: 12,
  },
  followButtonText: {
    fontSize: 14,
    color: "#fff",
  },
});
