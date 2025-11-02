import { FontAwesome, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Thread {
  id: string;
  text: string;
  hashTag?: string;
  location?: [number, number];
  imageUris: string[];
}

export function ListFooter({
  canAddThread,
  addThread,
}: {
  canAddThread: boolean;
  addThread: () => void;
}) {
  return (
    <View style={styles.listFooter}>
      <View style={styles.listFooterAvatar}>
        <Ionicons
          style={styles.avatarSmall}
          name="person-circle-outline"
          size={24}
        />
      </View>
      <View>
        <Pressable onPress={addThread} style={styles.input}>
          <Text style={{ color: canAddThread ? "#999" : "#aaa" }}>
            Add to thread
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
export default function Modal() {
  const [threads, setThreads] = useState<Thread[]>([
    { id: Date.now().toString(), text: "", imageUris: [] },
  ]);
  const [dropdownVisible, setIsDropdownVisible] = useState(false);
  const [replyOption, setReplyOption] = useState("Anyone");
  const [isPosting, setIsPosting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [hashTagList, setHashTagList] = useState<string[]>([
    "이전 기록 1",
    "이전 기록 2",
    "이전 기록 3",
    "이전 기록 4",
    "이전 기록 5",
    "이전 기록 6",
    "이전 기록 7",
    "이전 기록 8",
    "이전 기록 9",
    "이전 기록 10",
    "이전 기록 11",
    "이전 기록 12",
  ]);

  const canAddThread = (threads.at(-1)?.text.trim().length ?? 0) > 0;
  const canPost = threads.every((thread) => thread.text.trim().length > 0);

  const getMyLocation = async (id: string) => {};

  const removeThread = (id: string) => {
    setThreads((prevThreads) =>
      prevThreads.filter((thread) => thread.id !== id)
    );
  };

  const pickImage = async (id: string) => {};
  const removeImageFromThread = (id: string, uriToRemove: string) => {};

  const handlePost = () => {};

  const openDropdown = () => {
    setIsDropdownVisible(true);
  };
  const closeDropdown = () => {
    setIsDropdownVisible(false);
  };
  const updateThreadText = (id: string, text: string) => {
    setThreads((prevThreads) =>
      prevThreads.map((thread) =>
        thread.id === id ? { ...thread, text } : thread
      )
    );
  };

  const updateThreadHashTag = (id: string, hashTag?: string) => {
    setThreads((prevThreads) =>
      prevThreads.map((thread) =>
        thread.id === id ? { ...thread, hashTag } : thread
      )
    );
  };

  const handleCancel = () => {
    router.back();
  };

  const renderThreadItem = ({
    item,
    index,
  }: {
    item: Thread;
    index: number;
  }) => (
    <View style={styles.threadContainer}>
      <View style={styles.avatarContainer}>
        <Ionicons name="person-circle-outline" size={40} />
        <View style={styles.threadLine} />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.userInfoContainer}>
          <Text style={styles.username}>username</Text>
          <View style={styles.hashTagContainer}>
            <SimpleLineIcons
              name="arrow-right"
              size={12}
              style={{ paddingHorizontal: 4 }}
            />
            <TextInput
              style={{ flexGrow: 1 }}
              placeholder="Add A topic"
              placeholderTextColor="#999"
              onChangeText={() => updateThreadHashTag(item.id, item.hashTag)}
              onFocus={openDropdown}
              onBlur={closeDropdown}
            />
          </View>
          {index > 0 && (
            <Pressable
              onPress={() => removeThread(item.id)}
              style={styles.removeButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="close-outline" size={20} color="#8e8e93" />
            </Pressable>
          )}
        </View>
        <TextInput
          style={styles.input}
          placeholder={"What's new?"}
          placeholderTextColor="#999"
          value={item.text}
          onChangeText={(text) => updateThreadText(item.id, text)}
          multiline
        />
        {item.imageUris && item.imageUris.length > 0 && (
          <FlatList
            data={item.imageUris}
            renderItem={({ item: uri, index: imgIndex }) => (
              <View>
                <Image source={{ uri }} style={styles.imagePreview} />
                <Pressable
                  onPress={() =>
                    !isPosting && removeImageFromThread(item.id, uri)
                  }
                  style={styles.removeImageButton}
                >
                  <Ionicons
                    name="close-circle"
                    size={20}
                    color="rgba(0,0,0,0.7)"
                  />
                </Pressable>
              </View>
            )}
            keyExtractor={(uri, imgIndex) =>
              `${item.id}-img-${imgIndex}-${uri}`
            }
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.imageFlatList}
          />
        )}
        <View style={styles.actionButtons}>
          <Pressable
            style={styles.actionButton}
            onPress={() => !isPosting && pickImage(item.id)}
          >
            <Ionicons name="image-outline" size={24} />
          </Pressable>
          <Pressable
            style={styles.actionButton}
            onPress={() => getMyLocation(item.id)}
          >
            <FontAwesome name="map-marker" size={24} />
          </Pressable>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={handleCancel}>
          <Text style={styles.cancel}>Cancel</Text>
        </Pressable>
        <Text style={styles.title}>New thread</Text>
        <View style={styles.headerRightPlaceHolder} />
      </View>
      <FlatList
        data={threads}
        keyExtractor={(item) => item.id}
        renderItem={renderThreadItem}
        ListFooterComponent={
          <ListFooter
            canAddThread={canAddThread}
            addThread={() => {
              if (canAddThread) {
                setThreads((prevThreads) => [
                  ...prevThreads,
                  { id: Date.now().toString(), text: "", imageUris: [] },
                ]);
              }
            }}
          />
        }
        style={styles.list}
        contentContainerStyle={{ paddingBottom: 100, backgroundColor: "#ddd" }}
        keyboardShouldPersistTaps="handled"
      />
      <SafeAreaView style={[styles.footer, { bottom: 10 }]}>
        <Pressable onPress={() => setIsDropdownVisible(true)}>
          <Text style={styles.footerText}>{replyOption} can reply & quote</Text>
        </Pressable>
        <Pressable
          style={[styles.postButton, !canPost && styles.postButtonDisabled]}
          disabled={!canPost}
          onPress={handlePost}
        >
          <Text style={styles.postButtonText}>Post</Text>
        </Pressable>
      </SafeAreaView>
      {dropdownVisible && (
        <View style={{ position: "absolute" }}>
          {hashTagList.map((hashTag, index) => (
            <Pressable key={`${index}-${hashTag}`}>
              <Text>{hashTag}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  cancel: {
    fontSize: 16,
    color: "blue",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  headerRightPlaceHolder: {
    width: 60,
  },
  list: {
    flex: 1,
    backgroundColor: "#eee",
  },
  threadContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  avatarContainer: {
    alignItems: "center",
    marginRight: 12,
    paddingTop: 2,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#555",
  },
  avatarSmall: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#555",
  },
  threadLine: {
    width: 1.5,
    flexGrow: 1,
    backgroundColor: "#aaa",
    marginTop: 8,
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  hashTagContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  hashTagListContainer: {
    borderWidth: 1,
    position: "absolute",
    alignItems: "center",
    borderRadius: 10,
    top: 0,
    left: 0,
    right: 0,
  },
  hashTagItem: {
    width: "100%",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hashTagListText: {
    paddingVertical: 8,
  },
  username: {
    fontWeight: "600",
    fontSize: 16,
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 6,
  },
  input: {
    fontSize: 15,
    color: "#000",
    paddingTop: 4,
    paddingBottom: 8,
    minHeight: 24,
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    marginRight: 16,
  },
  threadFooterContainer: {
    flexDirection: "row",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 10,
    position: "absolute",
    right: 0,
    bottom: 0,
    left: 0,
  },
  footerText: {
    color: "#8e8e93",
    fontSize: 14,
  },
  postButton: {
    borderRadius: 20,
    backgroundColor: "#000",
    paddingVertical: 8,
    paddingHorizontal: 18,
  },
  postButtonDisabled: {
    backgroundColor: "#ccc",
  },
  postButtonText: {
    color: "#fff",
    fontSize: 16,
  },

  listFooter: {
    paddingLeft: 26,
    paddingTop: 10,
    flexDirection: "row",
  },
  listFooterAvatar: {
    marginRight: 20,
    paddingTop: 2,
  },
});
