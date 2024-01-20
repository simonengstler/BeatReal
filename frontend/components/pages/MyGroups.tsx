import { BACKEND_URL } from "@env";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useQuery } from "@tanstack/react-query";
import { styled } from "nativewind";
import { Pressable, ScrollView, Text, View } from "react-native";
import GroupCard from "../Group/GroupCard";
import Message from "../Group/Message";
import { useAuth } from "../context/AuthContext";
import { RootStackParamList } from "../routes/RootNavigator";

type Props = BottomTabScreenProps<RootStackParamList, "My Groups">;

const StyledView = styled(View);
const StyledPressable = styled(Pressable);
const StyledText = styled(Text);

async function fetchData(userId: string) {
  const response = await fetch(`${BACKEND_URL}/api/groups?userId=${userId}`);
  const data = await response.json();
  return Object.values(data);
}

export default function MyGroupsPage({ navigation }: Props) {
  const { user } = useAuth();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["groups", user.uid],
    queryFn: () => fetchData(user.uid),
  });

  return (
    <StyledView className="py-8 px-6 h-full bg-black">
      <ScrollView>
        {isLoading && <Message label="Loading..." />}
        {isError && (
          <Message label="Oops! Something went wrong in the server. Please try again later." />
        )}
        {data?.length === 0 ? (
          <StyledText className="text-white text-lg">
            No groups found, please create one below!
          </StyledText>
        ) : (
          data.map((group, index) => (
            <GroupCard key={index} group={group} navigation={navigation} />
          ))
        )}
      </ScrollView>

      <StyledView className="mb-0">
        <StyledPressable
          className="mx-auto border-2 bg-white rounded px-4 py-2"
          onPress={() => navigation.navigate("CreateGroup")}
        >
          <StyledText className="font-bold text-lg">
            Create New Group
          </StyledText>
        </StyledPressable>
      </StyledView>
    </StyledView>
  );
}
