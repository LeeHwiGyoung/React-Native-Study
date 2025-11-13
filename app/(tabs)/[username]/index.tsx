import { AuthContext } from "@/app/_layout";
import SideMenu from "@/components/SideMenu";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Username() {
  const { user } = useContext(AuthContext);
  const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);
  const router = useRouter();
  const { username } = useLocalSearchParams(); //[]내의 값을 실제로 받아오는 훅
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { top: insets.top }]}>
      <SideMenu
        isVisible={isSideMenuVisible}
        onClose={() => setIsSideMenuVisible(false)}
      />
      <View style={styles.header}>
        <Pressable
          onPress={() => setIsSideMenuVisible(true)}
          style={styles.sideMenu}
        >
          <Ionicons name="menu" size={24} color="black" />
        </Pressable>
      </View>
      <View style={styles.profile}>
        <View style={styles.profileHeader}>
          {user?.profileImageUrl ? (
            <Image
              source={{ uri: user?.profileImageUrl }}
              style={styles.profileAvatar}
            />
          ) : (
            <Ionicons name="person-circle-outline" size={50} />
          )}
          <Text>{user?.name}</Text>
          <Text>{user?.description}</Text>
        </View>
      </View>
      <View style={styles.tabBar}>
        <TouchableOpacity onPress={() => router.push(`/${username}`)}>
          {/* button과 유사 */}
          <Text>Threads</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push(`/${username}/replies`)}>
          <Text>Replies</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push(`/${username}/reposts`)}>
          <Text>Reposts</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    height: 50,
    justifyContent: "space-between",
  },
  sideMenu: {
    position: "absolute",
    top: 0,
    left: 20,
    paddingVertical: 8,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profile: {},
  profileHeader: {},
  profileAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
