import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ExplorePage from "../pages/Explore";
import MyGroupsPage from "../pages/MyGroups";
import SettingsPage from "../pages/Settings";
import { RootStackParamList } from "./RootNavigator";

export type BottomNavigatorParamList = {
  Settings: undefined;
  "My Groups": undefined;
  Explore: undefined;
};
const Tab = createBottomTabNavigator<RootStackParamList>();

export function BottomNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="My Groups"
        component={MyGroupsPage}
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
      <Tab.Screen
        name="Settings"
        component={SettingsPage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
