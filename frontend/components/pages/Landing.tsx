import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { styled } from "nativewind";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { RootStackParamList } from "../routes/RootNavigator";
import { useAuth } from "../context/AuthContext";
import { useIsFocused } from "@react-navigation/native";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

type Props = NativeStackScreenProps<RootStackParamList, "Landing">;

export default function LandingPage({ navigation }: Props) {
  const { user } = useAuth();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && user !== undefined) {
      console.info("user is logged in, redirecting to main page...");
      navigation.reset({
        index: 0,
        routes: [{ name: "Main" }],
      });
    }
  }, [isFocused, user]);

  return (
    <StyledView className="flex flex-col justify-center px-6 bg-black h-full">
      <StyledText className="text-6xl font-bold tracking-tighter text-white mb-4">
        Welcome to BeatReal.
      </StyledText>
      <StyledText className="text-lg tracking-tighter text-white">
        Every week at a different time, everyone is notified to share a song.
      </StyledText>
      <StyledText className="text-lg tracking-tighter text-white">
        A new and unique way to discover new songs with your friends.
      </StyledText>
      <StyledPressable
        className="mt-8 rounded-lg px-4 py-2 bg-white mr-auto"
        onPress={() => navigation.navigate("Login")}
      >
        <StyledText className="text-lg font-bold">Get Started</StyledText>
      </StyledPressable>
    </StyledView>
  );
}
