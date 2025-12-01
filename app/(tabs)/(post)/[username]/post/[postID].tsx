import { AuthContext } from "@/app/_layout";
import Comment from "@/components/Comment";
import CommentInput from "@/components/CommentInput";
import DetailPost from "@/components/DetailPost";
import { DetailedPost, TPost } from "@/components/Post";
import SideMenu from "@/components/SideMenu";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PostScreen() {
  const [post, setPost] = useState<DetailedPost>();
  const { username, postID } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const { user, login } = useContext(AuthContext);
  const isLoggedIn = !!user;
  const [isVisibleSideMenu, setIsVisibleSideMenu] = useState(false);
  const [comment, setComment] = useState<TPost[]>([]);
  const [commentInputText, setCommentInputText] = useState<string>("");
  const insets = useSafeAreaInsets();

  const onChangeCommentInput = (comment: string) => {
    setCommentInputText(comment);
  };
  useEffect(() => {
    fetch(`posts/${postID}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data?.post);
      });
  }, [username, postID]);

  useEffect(() => {
    fetch(`posts`)
      .then((res) => res.json())
      .then((data) => {
        setComment(data.posts);
      });
  }, [username, postID]);

  const onEndReached = useCallback(() => {
    if (post && post.comments > comment.length) {
      fetch(`posts?cursor=${comment?.at(-1)?.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.posts.length > 0) {
            setComment((prev) => [...prev, ...data.posts]);
          }
        });
    }
  }, [comment, post]);

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top },
        colorScheme === "dark" ? styles.containerDark : styles.containerLight,
      ]}
    >
      <SideMenu
        onClose={() => setIsVisibleSideMenu(false)}
        isVisible={isVisibleSideMenu}
      />
      <View
        style={[
          styles.header,
          colorScheme === "dark" ? styles.headerDark : styles.headerLight,
        ]}
      >
        {isLoggedIn && (
          <Pressable
            style={styles.sideMenu}
            onPress={() => setIsVisibleSideMenu(true)}
          >
            <Ionicons
              name="menu"
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          </Pressable>
        )}
        <Image
          style={[styles.headerLogo]}
          source={require("@/assets/images/react-logo.png")}
        />
        {!isLoggedIn && (
          <TouchableOpacity
            style={[
              styles.loginButton,
              colorScheme === "dark"
                ? styles.loginButtonDark
                : styles.loginButtonLight,
            ]}
            onPress={login}
          >
            <Text
              style={
                colorScheme === "dark"
                  ? styles.loginButtonDarkText
                  : styles.loginButtonLightText
              }
            >
              로그인
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {post && <DetailPost item={post} />}
      <View style={styles.commentContainer}>
        {comment && (
          <FlashList
            style={styles.commentList}
            data={comment}
            renderItem={({ item }) => <Comment item={item} />}
            keyExtractor={(item) => item.id}
            onEndReached={onEndReached}
          />
        )}
      </View>
      <CommentInput
        userProfile={user?.profileImageUrl}
        value={commentInputText}
        onChangeText={onChangeCommentInput}
        style={styles.commentInput}
        placeholder="답글 달기..."
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
  tabContainer: {
    flexDirection: "row",
  },
  header: {
    alignItems: "center",
    height: 50,
  },
  headerDark: {
    backgroundColor: "#101010",
  },
  headerLight: {
    backgroundColor: "white",
  },
  headerLogo: {
    width: 42,
    height: 42,
  },
  sideMenu: {
    position: "absolute",
    top: 0,
    left: 20,
    paddingVertical: 8,
  },
  loginButton: {
    position: "absolute",
    right: 20,
    top: 0,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  loginButtonDark: {
    backgroundColor: "white",
  },
  loginButtonLight: {
    backgroundColor: "black",
  },
  loginButtonDarkText: {
    color: "black",
  },
  loginButtonLightText: {
    color: "white",
  },
  commentContainer: { flex: 1 },
  commentList: {
    paddingBottom: 50,
  },
  commentInput: {
    position: "absolute",
    width: "100%",
    bottom: 10,
    paddingHorizontal: 12,
  },
});
