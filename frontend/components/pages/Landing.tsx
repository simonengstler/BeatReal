import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { styled } from "nativewind";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { RootStackParamList } from "../../App";
import { useAuth } from "../context/AuthContext";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

type Props = NativeStackScreenProps<RootStackParamList, "Landing">;

export default function LandingPage({ navigation }: Props) {
  const { user } = useAuth();

  useEffect(() => {
    if (user !== undefined) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Main" }],
      });
    }
  }, [user]);

  return (
    <StyledView className="flex flex-col justify-center px-6 bg-black h-full">
      <StyledText className="text-6xl font-bold tracking-tighter text-white">
        Welcome to BeatReal.
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
