import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateGroupPage from "../pages/CreateGroup";
import CreateUsernamePage from "../pages/CreateUsername";
import GroupDetailsPage from "../pages/GroupDetails";
import LandingPage from "../pages/Landing";
import LoginPage from "../pages/Login";
import { BottomNavigator, BottomNavigatorParamList } from "./BottomNavigator";

export type RootStackParamList = {
  Landing: undefined;
  Main: undefined;
  CreateGroup: undefined;
  Login: undefined;
  CreateUsername: undefined;
  GroupDetails: undefined;
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
          name="CreateGroup"
          options={{
            header: () => null,
          }}
          component={CreateGroupPage}
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
            headerShown: false
          }}
          component={BottomNavigator}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
