import { SplashScreen, Stack } from "expo-router";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Alert, Animated, StyleSheet, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { Asset } from "expo-asset";
import Constants from "expo-constants";

SplashScreen.preventAutoHideAsync().catch(() => {});

export interface User {
  id: string;
  name: string;
  profileImageUrl: string;
  description: string;
}

export const AuthContext = createContext<{
  user: User | null;
  login?: () => Promise<any>;
  logout?: () => Promise<any>;
  updateUser?: (user: User | null) => void;
}>({
  user: null,
});

function AnimatedAppLoader({
  //context 를 최대한 위로 끌어오고 사용할 이미지를 불러오는 역할
  children,
  image,
}: {
  children: React.ReactNode;
  image: number;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isSplashReady, setIsSplashReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      await Asset.loadAsync(image);
      setIsSplashReady(true);
    }
    prepare();
  }, [image]);

  const login = async () => {
    return await fetch("/login", {
      method: "POST",
      body: JSON.stringify({
        username: "hwigyoung",
        password: "1234",
      }),
    })
      .then((res) => {
        if (res.status >= 400) {
          return Alert.alert("Error", "invaild credentials");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setUser(data.user);
        return Promise.all([
          SecureStore.setItemAsync("accessToken", data.accessToken),
          SecureStore.setItemAsync("refreshToken", data.refreshToken),
          AsyncStorage.setItem("user", JSON.stringify(data.user)),
        ]);
      })
      .catch((error) => console.error(error));
  };

  const logout = () => {
    setUser(null);
    return Promise.all([
      SecureStore.deleteItemAsync("accessToken"),
      SecureStore.deleteItemAsync("refreshToken"),
      AsyncStorage.removeItem("user"),
    ]);
  };

  const updateUser = (user: User | null) => {
    setUser(user);
    if (user) {
      AsyncStorage.setItem("user", JSON.stringify(user));
    } else {
      AsyncStorage.removeItem("user");
    }
  };

  if (!isSplashReady) {
    return null;
  }

  return (
    <AuthContext value={{ user, login, logout, updateUser }}>
      <AnimatedSplashScreen image={image}>{children}</AnimatedSplashScreen>
    </AuthContext>
  );
}

function AnimatedSplashScreen({
  children,
  image,
}: {
  children: React.ReactNode;
  image: number;
}) {
  const [isAppReady, setIsAppReady] = useState(false);
  const [isSplashAnimatedComplete, setIsSplashAnimatedComplete] =
    useState(false);
  const animation = useRef(new Animated.Value(1)).current;
  const { updateUser } = useContext(AuthContext);

  const onImageLoaded = async () => {
    try {
      await AsyncStorage.getItem("user").then((user) => {
        updateUser?.(user ? JSON.parse(user) : null);
      });
      await SplashScreen.hideAsync();
    } catch (error) {
      console.error(error);
    } finally {
      setIsAppReady(true);
    }
  };
  const rotateValue = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => setIsSplashAnimatedComplete(true));
    }
  });

  return (
    <View style={StyleSheet.absoluteFill}>
      {isAppReady && children}
      {!isSplashAnimatedComplete && (
        <Animated.View
          pointerEvents={"none"}
          style={[
            {
              ...StyleSheet.absoluteFillObject,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor:
                Constants.expoConfig?.splash?.backgroundColor || "#ffffff",
            },
          ]}
        >
          <Animated.Image
            source={image}
            style={{
              resizeMode: Constants.expoConfig?.splash?.resizeMode || "contain",
              width: Constants.expoConfig?.splash?.imageWidth || 200,
              transform: [{ scale: animation }, { rotate: rotateValue }],
            }}
            onLoadEnd={onImageLoaded}
            fadeDuration={0}
          />
        </Animated.View>
      )}
    </View>
  );
}

export default function RootLayout() {
  return (
    <AnimatedAppLoader image={require("../assets/images/react-logo.png")}>
      <StatusBar style="auto" animated translucent={false} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        {/* presentation="modal" 은 모달형태로 띄워지게 됨 */}
      </Stack>
    </AnimatedAppLoader>
  );
}
