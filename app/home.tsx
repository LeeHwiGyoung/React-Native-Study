//home으로 접근시 tabs의 index 로 리다이렉트
import { Redirect } from "expo-router";

export default function Home() {
  return <Redirect href="/(tabs)" />;
}
