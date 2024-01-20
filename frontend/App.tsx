import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import ExplorePage from "./components/pages/Explore";
import HomePage from "./components/pages/Home";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}
