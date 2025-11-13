import SideMenu from "@/components/SideMenu";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Saech() {
  const [isSideMenuVisible, setIsSideMenuVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
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
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchBarInput}
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
  header: {
    alignItems: "center",
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
});
