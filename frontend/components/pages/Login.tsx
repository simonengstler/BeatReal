import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Text, View } from "react-native";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginPage({ navigation }: Props) {
  return (
    <View>
      <Text>Login page</Text>
      <Button
        title="Continue"
        onPress={() => navigation.navigate("CreateGroup")}
      />
    </View>
  );
}
