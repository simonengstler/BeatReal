import { styled } from "nativewind";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import SongCard from "../Group/SongCard";
import { useGetPublicGroups } from "../../hooks/useGetGroups";

const StyledText = styled(Text);
const StyledView = styled(View);

export default function ExplorePage() {

  const { data: songs } = useGetPublicGroups();

  return (
    <StyledView className="pt-8 pb-10 px-6 bg-black h-full">
      <StyledText className="text-white text-2xl text-center mb-5 ">Top Songs</StyledText>
      <ScrollView>
        {songs == undefined ? (
          <StyledText className="text-white text-lg">
            No top songs found. Please come back later!
          </StyledText>
        ) : (
          songs.map((song) => (
            <SongCard song={song} groupId={song.groupId} key={song.sharedSongId} />
          ))
        )}
      </ScrollView>
    </StyledView>
  );
}
