import { styled } from "nativewind";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { useAuth } from "../context/AuthContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../routes/RootNavigator";

const StyledPressable = styled(Pressable);
const StyledText = styled(Text);
const StyledView = styled(View);

type Props = NativeStackScreenProps<RootStackParamList, "Settings">;

export default function SettingsPage({ navigation }: Props) {
  const { signOut, user } = useAuth();

  if (user === undefined) {
    return null;
  }

  return (
    <StyledView className="py-12 px-6">
      <StyledText className="pb-4 font-semibold">
        Currently logged in as: {user.email}
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
    </StyledView>
  );
}
