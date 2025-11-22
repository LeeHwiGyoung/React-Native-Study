import SideMenu from "@/components/SideMenu";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AuthContext } from "../_layout";
import FollowSuggest, { FollowSuggestUser } from "@/components/FollowSuggest";

export default function Saech() {
  const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [followSuggestUsers, setFollowSuggestUsers] =
    useState<FollowSuggestUser[]>();
  const { user } = useContext(AuthContext);
  const isLoggedIn = !!user;
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();

  useEffect(() => {
    fetch("/users")
      .then((res) => res.json())
      .then((data) => {
        setFollowSuggestUsers(data.users);
        console.log("search", data.users);
      });
  }, []);
  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top },
        colorScheme === "dark" ? styles.containerDark : styles.containerLight,
      ]}
    >
      <SideMenu
        isVisible={isSideMenuVisible}
        onClose={() => setIsSideMenuVisible(false)}
      />
      <View style={styles.header}>
        {isLoggedIn && (
          <Pressable
            onPress={() => setIsSideMenuVisible(true)}
            style={styles.sideMenu}
          >
            <Ionicons
              name="menu"
              size={24}
              color={colorScheme === "dark" ? "white" : "black"}
            />
          </Pressable>
        )}
        <Image
          source={require("../../assets/images/react-logo.png")}
          style={styles.logo}
        />
      </View>
      <View style={styles.searchBar}>
        <TextInput
          style={[
            styles.searchBarInput,
            colorScheme === "dark"
              ? styles.searchInputTextDark
              : styles.searchInputTextLight,
          ]}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <View style={styles.followSuggestContainer}>
        <Text style={styles.followSuggestText}>Follow suggestions</Text>
        <FlatList
          data={followSuggestUsers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <FollowSuggest item={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom }}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
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
    backgroundColor: "white",
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
  logo: {
    width: 40,
    height: 40,
  },
  sideMenu: {
    position: "absolute",
    top: 0,
    left: 20,
    paddingVertical: 8,
  },
  searchBar: {
    alignItems: "center",
  },
  searchBarInput: {
    width: "90%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 16,
    paddingHorizontal: 10,
  },
  searchInputTextLight: {
    color: "black",
  },
  searchInputTextDark: {
    color: "white",
  },
  followSuggestContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  followSuggestText: {
    fontSize: 18,
    fontWeight: "700",
    paddingVertical: 12,
  },
  separator: {
    height: 1, // 구분선의 높이
    marginLeft: 50,
    marginVertical: 4, // 위아래 간격
    width: "100%",
    backgroundColor: "#eeeeee",
  },
});
