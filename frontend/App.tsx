import { StatusBar } from "expo-status-bar";
import { styled } from "nativewind";
import React from "react";
import { Text, View } from "react-native";

const StyledText = styled(Text);

export default function App() {
  return (
    <View>
      <StyledText className="text-red-900">
        Open up App.js to start asdyour app!
      </StyledText>
      <StatusBar style="auto" />
    </View>
  );
}
