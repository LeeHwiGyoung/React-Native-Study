import { usePathname, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const pathname = usePathname();
  console.log("현재 경로:", pathname);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        <TouchableOpacity onPress={() => router.replace(`/`)}>
          <Text style={{ color: pathname === "/" ? "red" : "black" }}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace(`/following`)}>
          <Text style={{ color: pathname === "/" ? "black" : "red" }}>
            For you
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.push("/username/post/1")}>
          <Text>게시글1</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.push("/username/post/2")}>
          <Text>게시글2</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.push("/username/post/3")}>
          <Text>게시글3</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
