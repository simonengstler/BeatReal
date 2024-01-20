import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable, Text, TextInput, View } from "react-native";
import { RootStackParamList } from "../routes/RootNavigator";
import { styled } from "nativewind";
import { useState } from "react";

type Props = NativeStackScreenProps<RootStackParamList, "CreateUsername">;

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledPressable = styled(Pressable);

export default function CreateUsernamePage({ navigation }: Props) {
  const [username, setUsername] = useState("");

  return (
    <StyledView className="bg-black h-full py-48 px-6 justify-center">
      <StyledText className="text-white text-3xl font-bold tracking-tighter">
        Choose your unique username.
      </StyledText>
      <StyledView className="py-6 space-y-4">
        <StyledTextInput
          className="border-slate-400 rounded-lg border-2 px-5 py-3 text-lg leading-[0px] text-white"
          placeholder="Username"
          placeholderTextColor={"rgb(148 163 184)"}
          onChangeText={setUsername}
          value={username}
          autoCapitalize="none"
        />
        <StyledPressable
          className="mt-8 rounded-lg px-4 py-2 bg-white"
          onPress={() => {
            try {
              //   navigation.reset({
              //     index: 0,
              //     routes: [{ name: "Main" }],
              //   });
            } catch (e) {
              console.warn("sign in failed, attempting to sign up now");
            }
          }}
        >
          <StyledText className="text-lg font-bold">Continue</StyledText>
        </StyledPressable>
      </StyledView>
    </StyledView>
  );
}
