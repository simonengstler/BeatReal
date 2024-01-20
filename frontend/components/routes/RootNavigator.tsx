import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Song } from "../../types/database";
import CreateGroupPage from "../pages/CreateGroup";
import CreateUsernamePage from "../pages/CreateUsername";
import GroupDetailsPage from "../pages/GroupDetails";
import LandingPage from "../pages/Landing";
import LoginPage from "../pages/Login";
import { BottomNavigator, BottomNavigatorParamList } from "./BottomNavigator";
import ShareSongPage from "../pages/ShareSong";
import { Button, Text } from "react-native";

export type RootStackParamList = {
  Landing: undefined;
  Main: undefined;
  CreateGroup: undefined;
  Login: undefined;
  CreateUsername: undefined;
  GroupDetails: {
    groupId: string;
  };
  ShareSong: { groupId: string };
  SongDetails: { spotifySongId: string };
} & BottomNavigatorParamList;

const RootStack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Landing"
        screenOptions={{
          headerLeft: () => null,
        }}
      >
        <RootStack.Screen
          name="Landing"
          options={{
            header: () => null,
          }}
          component={LandingPage}
        />
        <RootStack.Screen
          name="Login"
          options={{
            header: () => null,
          }}
          component={LoginPage}
        />
        <RootStack.Screen
          name="CreateUsername"
          options={{
            header: () => null,
          }}
          component={CreateUsernamePage}
        />
        <RootStack.Screen
          name="GroupDetails"
          options={{
            header: () => null,
          }}
          component={GroupDetailsPage}
        />
        <RootStack.Screen
          name="Main"
          options={{
            headerShown: false,
          }}
          component={BottomNavigator}
        />
        <RootStack.Screen
          name="CreateGroup"
          options={{
            headerTitle: "",
            headerTitleStyle: {
              color: "#fff",
            },
            headerStyle: {
              backgroundColor: "#000000ee",
            },
          }}
          component={CreateGroupPage}
        />
        <RootStack.Screen
          name="ShareSong"
          options={({ navigation }) => ({
            headerLeft: () => (
              <Button title={"Back"} onPress={() => navigation.goBack()} />
            ),
            headerTitle: "",
            headerTitleStyle: {
              color: "#fff",
            },
            headerStyle: {
              backgroundColor: "#000000ee",
            },
          })}
          component={ShareSongPage}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
