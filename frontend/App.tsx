import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import CreateGroupPage from "./components/pages/CreateGroup";
import ExplorePage from "./components/pages/Explore";
import HomePage from "./components/pages/Home";
import LandingPage from "./components/pages/Landing";
import LoginPage from "./components/pages/Login";
import { AuthProvider } from "./components/context/AuthContext";

export type RootStackParamList = {
  Landing: undefined;
  Main: undefined;
  CreateGroup: undefined;
  Login: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="My Groups"
        component={HomePage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="group" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExplorePage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="explore" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName="Landing"
          screenOptions={{
            headerShown: false,
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
          <RootStack.Screen name="Main" component={TabNavigator} />
        </RootStack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
