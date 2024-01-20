import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { styled } from "nativewind";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { RootStackParamList } from "../../App";
import { useAuth } from "../context/AuthContext";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

function SignUpButton({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUp, signIn } = useAuth();

  return (
    <View>
      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <Button
        title="Sign In"
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
      />
    </View>
  );
}

const StyledView = styled(View);
const StyledText = styled(Text);

export default function LoginPage({ navigation }: Props) {
  return (
    <StyledView className="py-12">
      <StyledText className="">Sign Up Page</StyledText>
      <SignUpButton onSuccess={() => navigation.navigate("Main")} />
    </StyledView>
  );
}
