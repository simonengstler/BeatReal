import { styled } from "nativewind";
import React, { useCallback, useState } from "react";
import {
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../routes/RootNavigator";

const StyledPressable = styled(Pressable);
const StyledText = styled(Text);
const StyledView = styled(View);
const StyledScrollView = styled(ScrollView);

type Props = NativeStackScreenProps<RootStackParamList, "Settings">;

export default function SettingsPage({ navigation }: Props) {
  const { signOut, user, username, refetchUsername } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetchUsername().finally(() => setRefreshing(false));
  }, []);

  if (user === undefined) {
    return null;
  }

  return (
    <StyledScrollView
      className="py-12 px-6"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <StyledText className="pb-4 font-semibold text-white">
        Welcome {username}. Your associated email is {user.email}.
      </StyledText>
      <StyledPressable
        className="py-3 bg-black text-white rounded-lg"
        onPress={async () => {
          await signOut();
          navigation.navigate("Landing");
        }}
      >
        <StyledText className="text-white text-lg text-center font-bold">
          Sign Out
        </StyledText>
      </StyledPressable>
    </StyledScrollView>
  );
}
