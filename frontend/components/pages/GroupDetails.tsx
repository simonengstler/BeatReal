import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { styled } from "nativewind";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import SongCard from "../Group/SongCard";
import { RootStackParamList } from "../routes/RootNavigator";
import { SvgUri } from "react-native-svg";
import { useGetGroups } from "../../hooks/useGetGroups";
import { InviteFriendsButton } from "../Group/InviteFriendsButton";

const StyledPressable = styled(Pressable);
const StyledText = styled(Text);
const StyledView = styled(View);

type Props = NativeStackScreenProps<RootStackParamList, "GroupDetails">;

export default function GroupDetailsPage({ route, navigation }: Props) {
  const { groupId } = route.params;
  const { data: groups } = useGetGroups();
  const group = groups?.find((group) => group.id === groupId);

  if (!group) {
    return null;
  }

  const { name, members, sharedSongs } = group;

  return (
    <StyledView className="pt-20 pb-10 px-6 bg-black h-full">
      <StyledText className="font-bold tracking-tighter text-white text-3xl pb-6">
        {name}
      </StyledText>
      <StyledView className="border-2 rounded-lg border-white p-4 mb-8">
        {members.map((member) => (
          <StyledView className="flex-row items-center" key={member}>
            <SvgUri
              width={28}
              height={28}
              style={{ marginRight: 8 }}
              uri={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${member}`}
            />
            <StyledText className="text-white text-lg">{member}</StyledText>
          </StyledView>
        ))}
      </StyledView>
      <ScrollView>
        {sharedSongs == undefined ? (
          <StyledText className="text-white text-lg">
            No songs found. Be the first to share!
          </StyledText>
        ) : (
          sharedSongs.map((song) => (
            <SongCard song={song} key={song.sharedSongId} />
          ))
        )}
      </ScrollView>
      <StyledView className="flex-row">
        <InviteFriendsButton groupId={groupId} />
        <StyledPressable
          className="mx-auto border-2 bg-white rounded-lg px-4 py-2"
          onPress={() => {
            navigation.navigate("ShareSong", {
              groupId: groupId,
            });
          }}
        >
          <StyledText className="font-bold text-lg">Share Song</StyledText>
        </StyledPressable>
      </StyledView>
    </StyledView>
  );
}
