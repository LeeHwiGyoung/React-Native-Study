import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { Tabs, usePathname, useRouter } from "expo-router";
import { useContext, useRef, useState } from "react";
import {
  Animated,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { AuthContext } from "../_layout";
/*
tab 레이아웃의 특징 : 탭끼리 이동을 하더라도 기존 탭의 상태가 유지된다.
뒤로가기 클릭시 기본 동작으로 Home 으로 이동됨
backBehavior 를 통해서 동작의 변경이 가능하다
order  속성의 경우 탭의 순서로 이동
history의 경우 사용자가 이동한 경로로 돌아가게 된다.
*/

const AnimatedTabBarButton = ({
  children,
  onPress,
  style,
  ...restProps
}: BottomTabBarButtonProps) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressOut = () => {
    Animated.sequence([
      Animated.spring(scaleValue, {
        toValue: 1.2,
        useNativeDriver: true,
        speed: 200,
      }),
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
        speed: 200,
      }),
    ]).start();
  };
  return (
    <Pressable
      onPress={onPress}
      onPressOut={handlePressOut}
      style={[
        { flex: 1, justifyContent: "center", alignItems: "center" },
        style,
      ]}
      {...restProps}
    >
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        {children}
      </Animated.View>
    </Pressable>
  );
};
export default function TabLayout() {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const isLoggedIn = !!user;
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const pathname = usePathname();

  const colorScheme = useColorScheme();

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };
  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const toLoginPage = () => {
    setIsLoginModalOpen(false);
    router.push("/login");
  };
  return (
    <>
      <Tabs
        backBehavior="history"
        screenOptions={{
          tabBarStyle: {
            backgroundColor: colorScheme === "dark" ? "#101010" : "white",
          },
          headerShown: false,
          tabBarButton: (props) => <AnimatedTabBarButton {...props} />,
        }}
      >
        <Tabs.Screen
          name="(home)"
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="home"
                size={24}
                color={
                  colorScheme === "dark"
                    ? focused
                      ? "white"
                      : "gray"
                    : focused
                      ? "black"
                      : "gray"
                }
              />
            ),
          }}
        />
        <Tabs.Screen
          listeners={{
            tabPress: (e) => {
              if (!isLoggedIn) {
                e.preventDefault();
                openLoginModal();
              }
            },
          }}
          name="search"
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="search"
                size={24}
                color={
                  colorScheme === "dark"
                    ? focused
                      ? "white"
                      : "gray"
                    : focused
                      ? "black"
                      : "gray"
                }
              />
            ),
          }}
        />
        <Tabs.Screen
          name="add"
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              if (isLoggedIn) {
                router.navigate("/modal");
              } else {
                openLoginModal();
              }
            },
          }}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="add"
                size={24}
                color={
                  colorScheme === "dark"
                    ? focused
                      ? "white"
                      : "gray"
                    : focused
                      ? "black"
                      : "gray"
                }
              />
            ),
          }}
        />
        <Tabs.Screen
          name="activity"
          listeners={{
            tabPress: (e) => {
              if (!isLoggedIn) {
                e.preventDefault();
                openLoginModal();
              }
            },
          }}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="heart-outline"
                size={24}
                color={
                  colorScheme === "dark"
                    ? focused
                      ? "white"
                      : "gray"
                    : focused
                      ? "black"
                      : "gray"
                }
              />
            ),
          }}
        />
        <Tabs.Screen
          name="[username]"
          listeners={{
            tabPress: (e) => {
              if (!isLoggedIn) {
                e.preventDefault();
                openLoginModal();
              } else {
                router.navigate(`/@${user.id}`);
              }
            },
          }}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="person-outline"
                size={24}
                color={
                  focused && user?.id === pathname?.slice(2)
                    ? colorScheme === "dark"
                      ? "white"
                      : "black"
                    : "gray"
                }
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(post)/[username]/post/[postID]"
          options={{ tabBarLabel: () => null, href: null }}
        />
      </Tabs>
      <Modal
        visible={isLoginModalOpen}
        transparent={true}
        animationType="slide"
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={
              colorScheme === "dark"
                ? { backgroundColor: "#101010" }
                : { backgroundColor: "white" }
            }
          >
            <Pressable onPress={toLoginPage}>
              <Text>go To Login Page</Text>
            </Pressable>
            <TouchableOpacity onPress={closeLoginModal}>
              <Ionicons name="close" size={24} color="#555" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}
