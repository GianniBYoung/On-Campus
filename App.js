import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { enableScreens } from "react-native-screens";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import HomeScreen from "./screens/home/HomeScreen";
import CapacityScreen from "./screens/capacity/CapacityScreen";
import SecurityScreen from "./screens/security/SecurityScreen";
import { NavigationContainer } from "@react-navigation/native";

enableScreens();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Capacity" component={CapacityScreen} />
        <Stack.Screen
          name="Security"
          component={SecurityScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
