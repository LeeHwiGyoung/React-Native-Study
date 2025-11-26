import Post, { TPost } from "@/components/Post";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, useColorScheme, View, PanResponder } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { AnimationContext } from "./_layout";

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList<TPost>);

export default function Index() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [posts, setPosts] = useState<TPost[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { pullDownPosition } = useContext(AnimationContext);
  const scrollPosition = useSharedValue(0); //자주 바뀌지만 리랜더링 안 되는 값이면서 js 스레드와 ui 스레드가 값을 공유하게 됨
  const isReadyToRefresh = useSharedValue(false);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollPosition.value = event.contentOffset.y;
    },
  });

  const onPanRelease = () => {
    pullDownPosition.value = withTiming(isReadyToRefresh.value ? 60 : 0, {
      duration: 180,
    });
    if (isReadyToRefresh.value) {
      onRefresh(() => {
        pullDownPosition.value = withTiming(0, {
          duration: 180,
        });
      });
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (e, gestureState) => {
        return scrollPosition.value === 0 && gestureState.dy > 0;
      },
      onPanResponderMove: (e, gestureState) => {
        const max = 120;
        console.log(gestureState.dy, "drag-dy");
        pullDownPosition.value = Math.max(Math.min(gestureState.dy, max), 0);

        if (
          pullDownPosition.value >= max / 2 &&
          isReadyToRefresh.value === false
        ) {
          isReadyToRefresh.value = true;
        }
        if (
          pullDownPosition.value < max / 2 &&
          isReadyToRefresh.value === true
        ) {
          isReadyToRefresh.value = false;
        }
      },
      onPanResponderRelease: onPanRelease,
      onPanResponderTerminate: onPanRelease,
    })
  );

  const pullDownstyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: pullDownPosition.value }],
    };
  });

  const onEndReached = useCallback(() => {
    if (posts.length > 0) {
      fetch(`/posts?cursor=${posts.at(-1)?.id}`)
        .then((res) => res.json())
        .then((data) => {
          setPosts((prev) => [...prev, ...data.posts]);
        });
    }
  }, [posts]);

  useEffect(() => {
    fetch(`posts`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts);
      });
  }, []);

  const onRefresh = (done: () => void) => {
    fetch("/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data.posts))
      .finally(() => {
        done();
      });
  };

  return (
    <Animated.View
      style={[
        styles.container,
        colorScheme === "dark" ? styles.containerDark : styles.containerLight,
        ,
        pullDownstyle,
      ]}
      {...panResponder.current.panHandlers}
    >
      <AnimatedFlashList
        data={posts}
        renderItem={({ item }) => <Post item={item} />}
        keyExtractor={(item) => item.id}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        refreshControl={<View />}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      />
    </Animated.View>
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
  textLight: {
    color: "black",
  },
  textDark: {
    color: "white",
  },
});
