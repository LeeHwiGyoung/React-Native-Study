import { Ionicons } from "@expo/vector-icons";

import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface SideMenuProps {
  isVisible: boolean;
  onClose: () => void;
}
export default function SideMenu({ isVisible, onClose }: SideMenuProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.touchableOverlay}
          activeOpacity={1}
          onPress={onClose}
        />
        <SafeAreaView style={styles.sideMenuContainer}>
          <View style={styles.menuContent}>
            <Pressable style={styles.menuItem}>
              <Text style={styles.menuItemText}>Appearance</Text>
              <Ionicons name="chevron-forward" size={20} color="#888" />
            </Pressable>
            <Pressable style={styles.menuItem}>
              <Text style={styles.menuItemText}>Insight</Text>
            </Pressable>
            <Pressable style={styles.menuItem}>
              <Text style={styles.menuItemText}>Settings</Text>
            </Pressable>
            <View style={styles.seperator}></View>
            <Pressable style={styles.menuItem}>
              <Text style={styles.menuItemText}>Report a problem</Text>
            </Pressable>
            <Pressable style={styles.menuItem}>
              <Text style={[styles.menuItemText, styles.logoutText]}>
                Logout
              </Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    position: "relative",
  },
  touchableOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  sideMenuContainer: {
    position: "absolute",
    top: 90,
    left: 19,
    width: "75%",
    maxWidth: 320,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 0,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    overflow: "hidden",
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 4 },
    elevation: 10,
    shadowRadius: 10,
  },
  menuContent: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 5,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: "500",
  },
  seperator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#D1D1D6",
    marginVertical: 8,
    marginHorizontal: -20,
  },
  logoutText: {
    color: "red",
  },
});
