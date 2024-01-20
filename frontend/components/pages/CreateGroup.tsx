import { BACKEND_URL } from "@env";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { styled } from "nativewind";
import React, { useState } from "react";
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../routes/RootNavigator";

async function createGroupRequest(
  name: string,
  username: string,
  description: string
) {
  const response = await fetch(`${BACKEND_URL}/api/groups`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      username: username,
      description,
    }),
  });
  const data = await response.json();
  if (!data.id) {
    throw new Error("Group creation failed");
  }
  return data;
}

const StyledPressable = styled(Pressable);
const StyledText = styled(Text);
const StyledView = styled(View);
const StyledTextInput = styled(TextInput);
const StyledTouchableWithoutFeedback = styled(TouchableWithoutFeedback);

type Props = NativeStackScreenProps<RootStackParamList, "CreateGroup">;

export default function CreateGroupPage({ navigation }: Props) {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const { username, user } = useAuth();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: () => createGroupRequest(groupName, username, description),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["groups", user?.uid],
      });
      navigation.reset({
        index: 0,
        routes: [{ name: "Main" }],
      });
    },
    onError: (e) => {
      console.error(e.message);
    },
  });

  return (
    <StyledTouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <StyledView className="bg-black h-full flex text-center px-6 justify-center pb-24">
        <StyledText className="text-white font-bold tracking-tighter text-3xl text-center pb-4">
          Create Group
        </StyledText>
        <StyledTextInput
          className="border-slate-400 rounded-lg border-2 px-5 py-3 mb-3 text-lg leading-[0px] text-white"
          placeholderTextColor={"rgb(148 163 184)"}
          onChangeText={setGroupName}
          value={groupName}
          placeholder="Group Name"
          autoCapitalize="none"
        />
        <StyledTextInput
          className="border-slate-400 rounded-lg border-2 px-5 py-3 mb-3 text-lg leading-[0px] text-white"
          placeholderTextColor={"rgb(148 163 184)"}
          onChangeText={setDescription}
          value={description}
          placeholder="Description"
          autoCapitalize="none"
          multiline
        />
        <StyledPressable
          className="mt-2 mx-auto border-2 bg-white rounded-lg px-4 py-2"
          onPress={async () => {
            await mutateAsync();
          }}
          disabled={groupName === ""}
        >
          <StyledText className="font-bold text-lg">
            Create new group
          </StyledText>
        </StyledPressable>
      </StyledView>
    </StyledTouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    margin: 12,
    width: "80%",
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
  },
});
