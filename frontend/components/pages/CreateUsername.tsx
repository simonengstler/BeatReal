import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable, Text, TextInput, View } from "react-native";
import { RootStackParamList } from "../routes/RootNavigator";
import { styled } from "nativewind";
import { useState } from "react";
import { BACKEND_URL } from "@env";
import { useAuth } from "../context/AuthContext";
import { useMutation } from "@tanstack/react-query";

type Props = NativeStackScreenProps<RootStackParamList, "CreateUsername">;

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledPressable = styled(Pressable);

async function createUsername(username: string, userId: string) {
  const response = await fetch(`${BACKEND_URL}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, userId }),
  });
  if (response.status === 409) {
    throw new Error("Username already taken");
  }
  const json = await response.json();
  return json;
}

export default function CreateUsernamePage({ navigation }: Props) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const { user, setUsername: setAuthUsername } = useAuth();

  const { mutateAsync } = useMutation({
    mutationFn: () => createUsername(username, user.uid),
    onSuccess: () => {
      setAuthUsername(username);
      navigation.reset({
        index: 0,
        routes: [{ name: "Main" }],
      });
    },
    onError: (e) => {
      setError(e.message);
    },
  });

  return (
    <StyledView className="bg-black h-full py-48 px-6 justify-center">
      <StyledText className="text-white text-3xl font-bold tracking-tighter">
        Choose your unique username.
      </StyledText>
      <StyledView className="py-6">
        <StyledTextInput
          className="border-slate-400 rounded-lg border-2 px-5 py-3 mb-3 text-lg leading-[0px] text-white"
          placeholder="Username"
          placeholderTextColor={"rgb(148 163 184)"}
          onChangeText={(text) => {
            setUsername(text);
            setError("");
          }}
          value={username}
          autoCapitalize="none"
        />
        {error !== "" && (
          <StyledText className="text-red-500">{error}</StyledText>
        )}
        <StyledPressable
          className="mt-6 rounded-lg px-4 py-2 bg-white"
          onPress={async () => {
            await mutateAsync();
          }}
        >
          <StyledText className="text-lg font-bold">Continue</StyledText>
        </StyledPressable>
      </StyledView>
    </StyledView>
  );
}
