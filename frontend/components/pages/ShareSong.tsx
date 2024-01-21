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
import { useGetGroups } from "../../hooks/useGetGroups";

async function shareSongRequest(
  username: string,
  groupId: string,
  songLink: string
) {
  const response = await fetch(`${BACKEND_URL}/api/groups/share-song`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      groupId,
      songLink,
    }),
  });
  const data = await response.json();
  if (!data.updatedGroup) {
    throw new Error("Song sharing failed");
  }
  return data;
}

const StyledPressable = styled(Pressable);
const StyledText = styled(Text);
const StyledView = styled(View);
const StyledTextInput = styled(TextInput);
const StyledTouchableWithoutFeedback = styled(TouchableWithoutFeedback);

type Props = NativeStackScreenProps<RootStackParamList, "ShareSong">;

export default function ShareSongPage({ navigation, route }: Props) {
  const [songLink, setSongLink] = useState("");
  const { username } = useAuth();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: () =>
      shareSongRequest(username, route.params.groupId, songLink),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["groups", username],
      });
      navigation.navigate("GroupDetails", {
        groupId: route.params.groupId,
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
          Share Song
        </StyledText>
        <StyledTextInput
          className="border-slate-400 rounded-lg border-2 px-5 py-3 mb-3 text-lg leading-[0px] text-white"
          placeholderTextColor={"rgb(148 163 184)"}
          textContentType="URL"
          onChangeText={setSongLink}
          value={songLink}
          placeholder="Spotify Song Link"
          autoCapitalize="none"
        />
        <StyledPressable
          className="mt-2 mx-auto border-2 bg-white rounded-lg px-4 py-2"
          onPress={async () => {
            await mutateAsync();
          }}
          disabled={songLink === ""}
        >
          <StyledText className="font-bold text-lg">Share song</StyledText>
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
