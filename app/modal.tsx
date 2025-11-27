import { FontAwesome, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal as RNModal,
  useColorScheme,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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
  const colorScheme = useColorScheme();
  return (
    <View style={styles.listFooter}>
      <View style={styles.listFooterAvatar}>
        <Ionicons
          style={[
            styles.avatarSmall,
            colorScheme === "dark"
              ? styles.avatarSmallDark
              : styles.avatarSmallLight,
          ]}
          name="person-circle"
          color="#ccc"
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
  const [replyOption, setReplyOption] = useState("Anyone");
  const [isPosting, setIsPosting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const replyOptions = ["Anyone", "Profiles you follow", "Mentioned only"];
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const canAddThread =
    (threads.at(-1)?.text.trim().length ?? 0) > 0 ||
    (threads.at(-1)?.imageUris.length ?? 0) > 0;
  const canPost = threads.every(
    (thread) => thread.text.trim().length > 0 || thread.imageUris.length > 0
  );

  const getMyLocation = async (id: string) => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "location permisson not granted",
        "Please grant location permission to use this feature",
        [
          {
            text: "OpenSettings",
            onPress: () => {
              Linking.openSettings();
            },
          },
          {
            text: "Cancel",
          },
        ]
      );
      return;
    }
    const location = await Location.getCurrentPositionAsync({});

    setThreads((prevThreads) =>
      prevThreads.map((threads) =>
        threads.id === id
          ? {
              ...threads,
              location: [location.coords.latitude, location.coords.longitude],
            }
          : threads
      )
    );
  };

  const removeThread = (id: string) => {
    setThreads((prevThreads) =>
      prevThreads.filter((thread) => thread.id !== id)
    );
  };

  const pickImage = async (id: string) => {
    let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "사진에 접근할 권한이 없습니다",
        "설정에서 사진 접근 권한을 설정해주세요.",
        [
          { text: "설정 열기", onPress: () => Linking.openSettings() },
          { text: "닫기" },
        ]
      );
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "livePhotos", "videos"],
      allowsMultipleSelection: true,
      selectionLimit: 5,
    });
    if (!result.canceled) {
      setThreads((prevThreads) =>
        prevThreads.map((thread) =>
          thread.id === id
            ? {
                ...thread,
                imageUris: thread.imageUris.concat(
                  result.assets?.map((asset) => asset.uri) ?? []
                ),
              }
            : thread
        )
      );
    }
  };

  const takePhoto = async (id: string) => {
    let { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "카메라에 접근할 권한이 없습니다",
        "설정에서 카메라 접근 권한을 설정해주세요.",
        [
          { text: "설정 열기", onPress: () => Linking.openSettings() },
          { text: "닫기" },
        ]
      );
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images", "livePhotos", "videos"],
      allowsMultipleSelection: true,
      selectionLimit: 5,
    });

    status = (await MediaLibrary.requestPermissionsAsync()).status;
    if (status === "granted" && result.assets?.[0].uri) {
      MediaLibrary.saveToLibraryAsync(result.assets[0].uri);
    }

    if (!result.canceled) {
      setThreads((prevThreads) =>
        prevThreads.map((thread) =>
          thread.id === id
            ? {
                ...thread,
                imageUris: thread.imageUris.concat(
                  result.assets?.map((asset) => asset.uri) ?? []
                ),
              }
            : thread
        )
      );
    }
  };

  const removeImageFromThread = (id: string, uriToRemove: string) => {
    setThreads((prevThreads) =>
      prevThreads.map((thread) =>
        thread.id === id
          ? {
              ...thread,
              imageUris: thread.imageUris.filter((uri) => uri !== uriToRemove),
            }
          : thread
      )
    );
  };

  const handlePost = () => {};

  const updateThreadText = (id: string, text: string) => {
    setThreads((prevThreads) =>
      prevThreads.map((thread) =>
        thread.id === id ? { ...thread, text } : thread
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
    <View style={[styles.threadContainer]}>
      <View style={styles.avatarContainer}>
        <Ionicons
          name="person-circle"
          size={40}
          color={colorScheme === "dark" ? "white" : "#ccc"}
        />
        <View
          style={[
            styles.threadLine,
            colorScheme === "dark"
              ? styles.threadLineDark
              : styles.threadLineLight,
          ]}
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.userInfoContainer}>
          <Text
            style={[
              styles.username,
              colorScheme === "dark" ? styles.textDark : styles.textLight,
            ]}
          >
            username
          </Text>
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
          style={[
            styles.input,
            colorScheme === "dark" ? styles.textDark : styles.textLight,
          ]}
          placeholder={"What's new?"}
          placeholderTextColor="#999"
          value={item.text}
          onChangeText={(text) => updateThreadText(item.id, text)}
          onFocus={() => setIsPosting(true)}
          onBlur={() => setIsPosting(false)}
          multiline
        />
        {item.imageUris && item.imageUris.length > 0 && (
          <FlashList
            data={item.imageUris}
            renderItem={({ item: uri, index: imgIndex }) => (
              <View style={styles.imagePreviewContainer}>
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
        {item.location && (
          <View>
            <Text>{`${item.location[0]}, ${item.location[1]}`}</Text>
          </View>
        )}
        <View style={styles.actionButtons}>
          <Pressable
            style={styles.actionButton}
            onPress={() => !isPosting && pickImage(item.id)}
          >
            <Ionicons
              name="image-outline"
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          </Pressable>
          <Pressable
            style={styles.actionButton}
            onPress={() => !isPosting && takePhoto(item.id)}
          >
            <Ionicons
              name="camera-outline"
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          </Pressable>
          <Pressable
            style={styles.actionButton}
            onPress={() => getMyLocation(item.id)}
          >
            <FontAwesome
              name="map-marker"
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top },
        colorScheme === "dark" ? styles.containerDark : styles.containerLight,
      ]}
    >
      <View
        style={[
          styles.header,
          colorScheme === "dark" ? styles.headerDark : styles.headerLight,
        ]}
      >
        <Pressable onPress={handleCancel}>
          <Text
            style={[
              styles.cancel,
              colorScheme === "dark" ? styles.textDark : styles.textLight,
              isPosting && styles.disabledText,
            ]}
          >
            Cancel
          </Text>
        </Pressable>
        <Text
          style={[
            styles.title,
            colorScheme === "dark" ? styles.textDark : styles.textLight,
          ]}
        >
          New thread
        </Text>
        <View style={styles.headerRightPlaceHolder} />
      </View>
      <FlashList
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
        style={[
          styles.list,
          colorScheme === "dark" ? styles.listDark : styles.listLight,
        ]}
        contentContainerStyle={[
          { paddingBottom: 100 },
          colorScheme === "dark"
            ? { backgroundColor: "#101010" }
            : { backgroundColor: "#ddd" },
        ]}
        keyboardShouldPersistTaps="handled"
      />
      <RNModal
        transparent={true}
        visible={isDropdownVisible}
        animationType="fade"
        onRequestClose={() => setIsDropdownVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setIsDropdownVisible(false)}
        >
          <View
            style={[
              styles.dropdownContainer,
              colorScheme === "dark"
                ? styles.dropdownContainerDark
                : styles.dropdownContainerLight,
            ]}
          >
            {replyOptions.map((option) => (
              <Pressable
                key={option}
                style={[
                  styles.dropdownOption,
                  option === replyOption && styles.selectedOption,
                ]}
                onPress={() => {
                  setReplyOption(option);
                  setIsDropdownVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.dropdownOptionText,
                    option === replyOption && styles.selectedOptionText,
                  ]}
                >
                  {option}
                </Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </RNModal>
      <View
        style={[
          styles.footer,
          { paddingBottom: insets.bottom },
          colorScheme === "dark" ? styles.footerDark : styles.footerLight,
        ]}
      >
        <Pressable onPress={() => setIsDropdownVisible(true)}>
          <Text
            style={[
              styles.footerText,
              colorScheme === "dark" && styles.textDark,
            ]}
          >
            {replyOption} can reply & quote
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.postButton,
            !canPost && styles.postButtonDisabled,
            colorScheme === "dark"
              ? styles.postButtonDark
              : styles.postButtonLight,
          ]}
          disabled={!canPost}
          onPress={handlePost}
        >
          <Text style={styles.postButtonText}>Post</Text>
        </Pressable>
      </View>
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
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerDark: { backgroundColor: "#101010" },
  headerLight: { backgroundColor: "#fff" },
  cancel: {
    fontSize: 16,
  },
  textLight: { color: "#000" },
  textDark: { color: "white" },
  disabledText: {
    color: "#ccc",
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
  },
  listDark: { backgroundColor: "#111111" },
  listLight: { backgroundColor: "#eee" },
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
  avatarDark: {},
  avatarLight: {},
  avatarSmall: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  avatarSmallDark: {
    backgroundColor: "white",
  },
  avatarSmallLight: {
    backgroundColor: "#555",
  },
  threadLine: {
    width: 1.5,
    flexGrow: 1,
    backgroundColor: "#aaa",
    marginTop: 8,
  },
  threadLineDark: {},
  threadLineLight: {},
  userInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  removeButton: {},
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
  imageFlatList: {
    marginTop: 12,
    marginBottom: 4,
  },
  imagePreviewContainer: {
    position: "relative",
    marginRight: 8,
    width: 100,
    height: 100,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "f0f0f0",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
  },
  removeImageButton: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 12,
    padding: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  dropdownContainer: {
    width: 200,
    borderRadius: 10,
    marginHorizontal: 10,
    overflow: "hidden",
    bottom: 20,
  },
  dropdownContainerDark: { backgroundColor: "#101010" },
  dropdownContainerLight: { backgroundColor: "#fff" },
  dropdownOption: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: " #e5e5e5",
  },
  dropdownOptionText: {
    fontSize: 16,
    color: "#000",
  },
  selectedOption: {},
  selectedOptionText: {
    fontWeight: "600",
    color: "#007AFF",
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
  footerDark: { backgroundColor: "#101010" },
  footerLight: { backgroundColor: "#fff" },
  footerText: {
    color: "#8e8e93",
    fontSize: 14,
  },
  postButton: {
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 18,
  },
  postButtonDark: {
    backgroundColor: "white",
  },
  postButtonLight: {
    backgroundColor: "#000",
  },
  postButtonDisabled: {
    backgroundColor: "#ccc",
  },
  postButtonText: {
    fontSize: 16,
  },
  postButtonTextLight: {
    color: "#fff",
  },
  postButtonTextDark: {
    color: "black",
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
