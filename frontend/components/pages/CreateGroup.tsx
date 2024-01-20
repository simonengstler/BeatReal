import { BACKEND_URL } from "@env";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useAuth } from "../context/AuthContext";
import { styled } from "nativewind";

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

export default function CreateGroupPage({ navigation }) {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const { username } = useAuth();

  const { mutateAsync } = useMutation({
    mutationFn: () => createGroupRequest(groupName, username, description),
    onSuccess: (a) => {
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: "Main" }],
      // });
      console.log(a);
    },
    onError: (e) => {
      console.error(e.message);
    },
  });

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>Create Group</Text>
      <TextInput
        style={styles.input}
        onChangeText={setGroupName}
        value={groupName}
      />
      <StyledPressable
        className="mx-auto border-2 bg-white rounded px-4 py-2"
        onPress={async () => {
          await mutateAsync();
        }}
        disabled={groupName === ""}
      >
        <StyledText className="font-bold text-lg">Start new group</StyledText>
      </StyledPressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 50,
    margin: 12,
    width: "80%",
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
  },
});
