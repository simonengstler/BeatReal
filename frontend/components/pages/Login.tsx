import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { styled } from "nativewind";
import React, { useState } from "react";
import { Button, Pressable, Text, TextInput, View } from "react-native";
import { RootStackParamList } from "../../App";
import { useAuth } from "../context/AuthContext";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledPressable = styled(Pressable);

function SignUpButton({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUp, signIn } = useAuth();

  return (
    <StyledView className="py-6">
      <StyledTextInput
        className="border-slate-400 rounded-lg border-2 pb-3 pt-2 px-5 placeholder:text-lg mb-4"
        textContentType="emailAddress"
        placeholder="Email"
        placeholderTextColor={"rgb(148 163 184)"}
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"
      />
      <StyledTextInput
        className="border-slate-400 rounded-lg border-2 pb-3 pt-2 px-5 placeholder:text-lg"
        textContentType="password"
        placeholder="Password"
        placeholderTextColor={"rgb(148 163 184)"}
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <StyledPressable
        className="mt-8 rounded-lg px-4 py-2 bg-white"
        onPress={() => {
          try {
            signIn(email, password);
            onSuccess();
          } catch (e) {
            console.warn("sign in failed, attempting to sign up now");
          }
          try {
            signUp(email, password);
            onSuccess();
          } catch (e) {
            console.error("sign up failed", e);
          }
        }}
      >
        <StyledText className="text-lg font-bold">Continue</StyledText>
      </StyledPressable>
    </StyledView>
  );
}

export default function LoginPage({ navigation }: Props) {
  return (
    <StyledView className="bg-black h-full py-48 px-6">
      <StyledText className="text-white text-3xl font-bold tracking-tighter">
        Log In / Sign Up to BeatReal with your email.
      </StyledText>
      <SignUpButton onSuccess={() => navigation.navigate("Main")} />
    </StyledView>
  );
}
