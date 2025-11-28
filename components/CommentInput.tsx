import { AuthContext } from "@/app/_layout";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useContext } from "react";
import {
  View,
  Image,
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  ViewStyle,
  Pressable,
} from "react-native";

interface CommentInputProps {
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  onChangeText: (text: string) => void;
  userProfile?: string;
  value: string;
  placeholder?: string;
}

export default function CommentInput({
  style,
  inputStyle,
  userProfile,
  onChangeText,
  value,
  placeholder,
}: CommentInputProps) {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const onPressUserProfile = () => {
    router.push(`/@${user?.id}`);
  };

  return (
    <View style={style}>
      <Pressable style={styles.userProfile} onPress={onPressUserProfile}>
        {userProfile ? (
          <Image source={{ uri: userProfile }} />
        ) : (
          <Ionicons name="person-circle" size={40} color="#ccc" />
        )}
      </Pressable>
      <TextInput
        style={[styles.defaultInputStyle, inputStyle]}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  defaultInputStyle: {
    backgroundColor: "#eee",
    borderRadius: 20,
    shadowColor: "#cecece",
    paddingLeft: 60,
  },
  userProfile: {
    position: "absolute",
    zIndex: 10,
    left: 20,
  },
});
