import { styled } from "nativewind";
import { View, Text } from "react-native";

const StyledText = styled(Text);

export default function ExplorePage() {
  return (
    <View>
      <StyledText className="text-white">Explore Page</StyledText>
    </View>
  );
}
