import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { styled } from "nativewind";
import React, { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { RootStackParamList } from "../routes/RootNavigator";
import { useAuth } from "../context/AuthContext";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledPressable = styled(Pressable);

export default function LoginPage({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUp, signIn, isUsernameLoading, user, username } = useAuth();

  useEffect(() => {
    if (user !== undefined && username === undefined && !isUsernameLoading) {
      navigation.navigate("CreateUsername");
    } else if (
      user !== undefined &&
      username !== undefined &&
      !isUsernameLoading
    ) {
      navigation.navigate("Main");
    }
  }, [user, isUsernameLoading]);

  return (
    <StyledView className="bg-black h-full py-48 px-6 justify-center">
      <StyledText className="text-white text-3xl font-bold tracking-tighter">
        Log In to BeatReal with your email.
      </StyledText>
      <StyledView className="py-6 space-y-4">
        <StyledTextInput
          className="border-slate-400 rounded-lg border-2 px-5 py-3 text-lg leading-[0px] text-white"
          textContentType="emailAddress"
          placeholder="Email"
          placeholderTextColor={"rgb(148 163 184)"}
          onChangeText={setEmail}
          value={email}
          autoCapitalize="none"
        />
        <StyledTextInput
          className="border-slate-400 rounded-lg border-2 px-5 py-3 text-lg leading-[0px] text-white"
          style={{
            fontSize: 18,
          }}
          textContentType="password"
          placeholder="Password"
          placeholderTextColor={"rgb(148 163 184)"}
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
        <StyledPressable
          className="mt-8 rounded-lg px-4 py-2 bg-white"
          onPress={async () => {
            try {
              await signIn(email, password);
              return;
            } catch (e) {
              console.warn("sign in failed, attempting to sign up now");
            }
            try {
              await signUp(email, password);
            } catch (e) {
              console.error("sign up failed", e);
            }
          }}
        >
          <StyledText className="text-lg font-bold">Continue</StyledText>
        </StyledPressable>
      </StyledView>
    </StyledView>
  );
}
