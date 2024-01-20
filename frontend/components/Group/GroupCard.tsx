import { styled } from "nativewind";
import { Text, StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { Group } from "../../types/database";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RootStackParamList } from "../routes/RootNavigator";
import { SvgUri } from "react-native-svg";

const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);
const StyledView = styled(View);

interface Props {
  group: Group;
  navigation: BottomTabNavigationProp<
    RootStackParamList,
    "My Groups",
    undefined
  >;
}

export default function GroupCard({ group, navigation }: Props) {
  return (
    <StyledTouchableOpacity
      className="mx-auto p-4 mb-4 bg-transparent border-2 border-white w-full rounded-lg"
      onPress={() =>
        navigation.navigate("GroupDetails", { sharedSongs: group.sharedSongs })
      }
    >
      <StyledText className="font-bold text-lg tracking-tight text-white mb-2">
        {group.name}
      </StyledText>
      {group.members.map((member) => (
        <StyledView className="flex-row items-center" key={member}>
          <SvgUri
            width={20}
            height={20}
            style={{ marginRight: 2 }}
            uri={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${member}`}
          />
          <StyledText className="text-white">{member}</StyledText>
        </StyledView>
      ))}
    </StyledTouchableOpacity>
  );
}
