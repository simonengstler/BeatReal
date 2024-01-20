import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { styled } from "nativewind";
import { Button, Text, View } from "react-native";
import { RootStackParamList } from "../../App";

const StyledView = styled(View);
const StyledText = styled(Text);

type Props = NativeStackScreenProps<RootStackParamList, "Landing">;

export default function LandingPage({ navigation }: Props) {
  return (
    <StyledView className="flex flex-col justify-between py-12">
      <StyledText className="text-3xl font-bold">Landing page</StyledText>
      <Button
        title="Continue"
        onPress={() => navigation.navigate("Login")}
      />
    </StyledView>
  );
}
