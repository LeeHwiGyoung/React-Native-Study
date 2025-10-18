import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      {/* presentation="modal" 은 모달형태로 띄워지게 됨 */}
    </Stack>
  );
}
