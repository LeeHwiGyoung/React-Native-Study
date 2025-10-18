// 컴포넌트는  공유하는데 주소만 다르게 하는 패턴
import { Slot } from "expo-router";

export default function layout() {
  return <Slot />;
}
