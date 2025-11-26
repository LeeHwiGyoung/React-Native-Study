import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { User } from "../app/_layout"; // 가정된 User 타입
import { useRouter } from "expo-router";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

// 이 인터페이스는 상위 파일에서 이미 정의되었으므로 그대로 사용합니다.
export interface FollowSuggestUser extends User {
  follower: number;
  isVerified: boolean;
}

const FollowSuggest = ({ item }: { item: FollowSuggestUser }) => {
  const [isFollow, setIsFollow] = useState<boolean>(false);
  const colorScheme = useColorScheme();
  const router = useRouter();

  const onPressFollowSuggest = (username: string) => {
    // router.push() 로직은 그대로 유지
    router.push(`/@${username}`);
  };

  const onPressFollowButton = () => {
    setIsFollow((prevFollowState) => !prevFollowState);
  };

  // 다크/라이트 모드에 따른 텍스트 색상 결정
  const textColor = colorScheme === "dark" ? styles.textDark : styles.textLight;

  return (
    // 1. 전체 컨테이너: 가로 정렬
    <TouchableOpacity
      style={styles.followSuggestContainer}
      onPress={() => onPressFollowSuggest(item.id)}
      activeOpacity={0.8}
    >
      {/* 2. 프로필 이미지 영역 */}
      <View style={styles.profileImageWrapper}>
        {item.profileImageUrl ? (
          <Image
            style={styles.profileImage}
            source={{ uri: item.profileImageUrl }}
          />
        ) : (
          <Ionicons name="person-circle" size={40} color="#ccc" />
        )}
      </View>

      {/* 3. 사용자 정보 영역 (유연하게 공간 차지) */}
      <View style={styles.userInfoContainer}>
        {/* User Info Header: ID와 인증 마크 */}
        <View style={styles.userId}>
          <Text style={[styles.userIdText, textColor]}>{item.id}</Text>
          {item.isVerified && (
            <Ionicons
              name="checkmark-circle"
              size={16}
              color="#0095f6"
              style={styles.verified}
            />
          )}
        </View>

        {/* User Name */}
        <Text style={[styles.usernameText, textColor]}>{item.name}</Text>

        {/* User Description */}
        {item.description && (
          <View style={styles.userInfo}>
            <Text style={[styles.userInfoText, textColor]}>
              {item.description}
            </Text>
          </View>
        )}

        {/* User Follower Count */}
        <View style={styles.userInfoFooter}>
          <Text style={styles.userFollowerText}>{item.follower} followers</Text>
        </View>
      </View>

      {/* 4. 팔로우 버튼 영역 (가장 오른쪽에 위치) */}
      <TouchableOpacity
        style={[
          styles.followButton,
          colorScheme === "dark"
            ? styles.followButtonDark
            : styles.followButtonLight,
        ]}
        onPress={() => onPressFollowButton()}
        activeOpacity={0.8}
      >
        <Text
          style={[
            styles.isFollowText,
            colorScheme === "dark"
              ? styles.isFollowTextDark
              : styles.isFollowTextLight,
          ]}
        >
          {isFollow ? "Follow back" : " Follow"}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // 전역 텍스트 색상 기본 정의 (다크 모드 텍스트 색상 추가)
  textLight: {
    color: "black",
  },
  textDark: {
    color: "white",
  },

  // 1. 전체 항목 컨테이너: 가로 정렬, 상하 패딩 추가
  followSuggestContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 12,
  },

  // 2. 프로필 이미지 래퍼 및 스타일 (Absolute 제거)
  profileImageWrapper: {
    marginRight: 10, // 정보 영역과의 간격
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  // 3. 사용자 정보 컨테이너: 남은 공간 모두 사용
  userInfoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  // 4. 팔로우 버튼 (Absolute 제거)
  followButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginLeft: 10, // 정보 컨테이너와의 간격
  },
  followButtonDark: {
    backgroundColor: "white",
  },
  followButtonLight: {
    backgroundColor: "#101010",
  },
  isFollowText: {
    fontWeight: "bold",
  },
  isFollowTextDark: {
    color: "black", // 다크 모드 버튼 배경: 흰색 -> 텍스트: 검정
  },
  isFollowTextLight: {
    color: "white", // 라이트 모드 버튼 배경: 검정 -> 텍스트: 흰색
  },
  // 5. 텍스트 요소들
  userId: {
    flexDirection: "row",
    alignItems: "center",
  },
  userIdText: {
    fontWeight: "600",
    fontSize: 16,
    // 다크/라이트 모드 텍스트 색상은 `textLight`/`textDark`를 통해 적용
  },
  verified: {
    marginLeft: 4,
    // verticalAlign 대신 flexbox를 사용했으므로 필요에 따라 조정
  },
  usernameText: {
    fontSize: 14, // 아이디보다 약간 작게 조정
    color: "#888", // 회색으로 통일 (다크/라이트 모드에 따라 다를 수 있으나 예시)
  },
  userInfo: {
    paddingVertical: 4,
  },
  userInfoText: {
    fontSize: 14,
    // 다크/라이트 모드 텍스트 색상은 `textLight`/`textDark`를 통해 적용
  },
  userInfoFooter: {
    marginTop: 4,
  },
  userFollowerText: {
    fontSize: 14,
    color: "#666", // 팔로워 수는 조금 더 연한 회색으로
  },
});

export default FollowSuggest;
