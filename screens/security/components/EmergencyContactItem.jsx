import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { Dimensions } from "react-native";

export default function EmergencyContactItem({ contact, emergencyModeOn }) {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: emergencyModeOn ? "#ff5630" : "#8dce19" },
        ]}
      >
        <Image style={styles.icon} source={contact.icon}></Image>
      </View>
      <View style={styles.contactInfoContainer}>
        <Text
          style={[styles.title, { color: emergencyModeOn ? "white" : "black" }]}
        >
          {contact.name}
        </Text>
        <Text
          style={[
            styles.subtitle,
            { color: emergencyModeOn ? "white" : "black" },
          ]}
        >
          {contact.phone}
        </Text>
        <Text
          style={[
            styles.subtitle,
            { color: emergencyModeOn ? "white" : "black" },
          ]}
        >
          {contact.distance} miles away
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
    paddingHorizontal: 15,
    paddingBottom: 5,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 64,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 40,
    height: 40,
  },
  contactInfoContainer: {
    marginStart: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
  },
});
