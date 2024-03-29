import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import * as Linking from "expo-linking";
import { styled } from "nativewind";
import { useCallback, useState } from "react";
import {
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useGetGroups } from "../../hooks/useGetGroups";
import GroupCard from "../Group/GroupCard";
import Message from "../Group/Message";
import { RootStackParamList } from "../routes/RootNavigator";
import { JoinGroupModal } from "../Group/JoinGroupModal";

type Props = BottomTabScreenProps<RootStackParamList, "My Groups">;

const StyledView = styled(View);
const StyledScrollView = styled(ScrollView);
const StyledPressable = styled(Pressable);
const StyledText = styled(Text);

export default function MyGroupsPage({ navigation }: Props) {
  const [refreshing, setRefreshing] = useState(false);

  const { data, isLoading, isError, refetch } = useGetGroups();
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, []);

  const url = Linking.useURL();

  return (
    <StyledScrollView
      className="py-8 px-6 h-full"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={{ justifyContent: "space-between", flexGrow: 1 }}
    >
      <StyledScrollView className="h-full">
        {isLoading && <Message label="Loading..." />}
        {isError && (
          <Message label="Oops! Something went wrong in the server. Please try again later." />
        )}
        {data === undefined || data.length === 0 ? (
          <StyledText className="text-white text-lg">
            No groups found, please create one below!
          </StyledText>
        ) : (
          data.map((group, index) => (
            <GroupCard key={index} group={group} navigation={navigation} />
          ))
        )}
      </StyledScrollView>

      <StyledView className="">
        <StyledPressable
          className="mx-auto border-2 bg-white rounded-lg px-4 py-2"
          onPress={() => navigation.navigate("CreateGroup")}
        >
          <StyledText className="font-bold text-lg">
            Create New Group
          </StyledText>
        </StyledPressable>
      </StyledView>
      {url?.startsWith("beatreal://") && <JoinGroupModal url={url} />}
    </StyledScrollView>
  );
}
