import NotFound from "@/app/+not-found";
import { usePathname, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Activity() {
  const router = useRouter();
  const pathname = usePathname(); // 현재 주소를 반환하는 훅

  if (
    ![
      "/activity",
      "/activity/replies",
      "/activity/reposts",
      "/activity/mentions",
      "/activity/quotes",
      "/activity/verified",
    ].includes(pathname)
  ) {
    return <NotFound />;
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View>
        <TouchableOpacity onPress={() => router.push(`/activity`)}>
          {/* button과 유사 */}
          <Text>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push(`/activity/replies`)}>
          <Text>Follows</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push(`/activity/reposts`)}>
          <Text>Replies</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push(`/activity/mentions`)}>
          <Text>Mentions</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push(`/activity/quotes`)}>
          <Text>Quotes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push(`/activity/reposts`)}>
          <Text>Reposts</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push(`/activity/verified`)}>
          <Text>Verified</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
