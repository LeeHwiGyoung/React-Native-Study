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

export interface TPost {
  id: string;
  user: {
    id: string;
    name: string;
    profileImageUrl: string;
    isVerified: boolean;
  };
  content: string;
  timeAgo: string;
  imageUrls?: string[];
  likes: number;
  comments: number;
  reposts: number;
  link?: string;
  linkThumbnail?: string;
  location?: [number, number];
}

export interface DetailedPost extends TPost {
  isLiked?: boolean;
  shares?: number;
}
const Post = ({ item }: { item: TPost }) => {
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

  const handlePostPress = (post: TPost) => {
    const detailPost: DetailedPost = {
      ...post,
      isLiked: false,
      shares: 0,
    };
    router.push(`/@${post.user.id}/post/${post.id}`);
  };

  const handleUserPress = (post: TPost) => {
    router.push(`/@${post.user.id}`);
  };

  return (
    <TouchableOpacity
      style={styles.postContainer}
      onPress={() => handlePostPress(item)}
      activeOpacity={0.8}
    >
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
          <Feather name="more-horizontal" size={16} color="#888" />
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
    </TouchableOpacity>
  );
};

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
    alignItems: "flex-start",
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
  postContent: {
    marginLeft: 52,
  },
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
    marginLeft: 52,
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
    marginLeft: 52,
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

export default Post;
