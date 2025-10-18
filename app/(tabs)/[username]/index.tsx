import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Username() {
  const router = useRouter();
  const { username } = useLocalSearchParams(); //[]내의 값을 실제로 받아오는 훅
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
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
