import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
import SongCard from "../Group/SongCard";
import React from "react";
import { styled } from "nativewind";

const mockData = [
  { link: "spotify.com", username: "sebastian" },
  { link: "spotify.com", username: "sebastian" },
  { link: "spotify.com", username: "sebastian" },
  { link: "spotify.com", username: "sebastian" },
];

const StyledPressable = styled(Pressable);
const StyledText = styled(Text);

export default function GroupDetailsPage({ route }) {
  const { songs } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>List of songs shared</Text>
      <ScrollView>
        {mockData.map((song) => (
          <SongCard song={song} />
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <StyledPressable
          className="mx-auto border-2 bg-white rounded px-4 py-2 bg-black/80"
          onPress={() => {}}
        >
          <StyledText className="font-bold text-lg">Invite User</StyledText>
        </StyledPressable>
        <StyledPressable
          className="mx-auto border-2 bg-white rounded px-4 py-2"
          onPress={() => {}}
        >
          <StyledText className="font-bold text-lg">Share Song</StyledText>
        </StyledPressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
  },
  heading: {
    textAlign: "center",
    fontSize: 20,
    marginTop: 15,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
