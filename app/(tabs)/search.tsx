import SideMenu from "@/components/SideMenu";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AuthContext } from "../_layout";

export default function Saech() {
  const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { user } = useContext(AuthContext);
  const isLoggedIn = !!user;
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
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
  sideMenu: {
    position: "absolute",
    top: 0,
    left: 20,
    paddingVertical: 8,
  },
  searchBar: {
    flex: 1,
    justifyContent: "center",
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
});
