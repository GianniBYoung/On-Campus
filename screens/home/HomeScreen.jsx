import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>This is Home screen</Text>
      <Button
        title="Capacity"
        onPress={() => {
          navigation.push("Capacity");
        }}
      ></Button>
      <Button
        title="Security"
        onPress={() => {
          navigation.push("Security");
        }}
      ></Button>
    </View>
  );
}
