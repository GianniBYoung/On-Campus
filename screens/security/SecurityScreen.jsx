import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import EmergencyContactItem from "./components/EmergencyContactItem";

const contacts = [
  {
    name: "Campus Police",
    phone: "555-555-5555",
    distance: 0.3,
    icon: require("../../assets/police.png"),
    location: {
      latitude: 10.39201,
      longitude: 10.392991,
    },
  },
  {
    name: "Campus Alert Center",
    phone: "555-555-5555",
    distance: 0.3,
    icon: require("../../assets/school.png"),
    location: {
      latitude: 10.39201,
      longitude: 10.392991,
    },
  },
  {
    name: "Jack (Roommate)",
    phone: "555-555-5555",
    distance: 0.3,
    icon: require("../../assets/person.png"),
    location: {
      latitude: 10.39201,
      longitude: 10.392991,
    },
  },
  {
    name: "John",
    phone: "555-555-5555",
    distance: 0.3,
    icon: require("../../assets/person.png"),
    location: {
      latitude: 10.39201,
      longitude: 10.392991,
    },
  },
];

export default function SecurityScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Security</Text>
        <TouchableOpacity style={styles.securityButtonContainer}>
          <Text style={styles.sosText}>SOS</Text>
        </TouchableOpacity>

        <View style={styles.contactsContainer}>
          <Text style={styles.contactMainTitle}>Your Emergency Contacts</Text>
          <Text style={styles.contactMainSubtitle}>
            When press the sos button, all the contacts below will be alert
          </Text>
          {contacts.map((contact) => (
            <EmergencyContactItem key={contacts.phone} contact={contact} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",

    flexDirection: "column",
  },
  title: {
    fontSize: 30,
    margin: 30,
    marginTop: 60,
    color: "black",
    fontWeight: "bold",
    justifyContent: "flex-start",
  },
  securityButtonContainer: {
    width: 256,
    height: 256,
    backgroundColor: "red",
    borderRadius: 256,
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  sosText: {
    fontSize: 30,
    margin: 30,
    color: "#fff",
    fontWeight: "bold",
  },
  contactsContainer: {
    width: "100%",

    elevation: 30,
    backgroundColor: "#f5f5f5",
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "black",
    shadowOpacity: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  contactMainTitle: {
    fontSize: 24,
    marginStart: 15,
    marginTop: 15,
    color: "black",
    fontWeight: "bold",
    justifyContent: "flex-start",
  },
  contactMainSubtitle: {
    marginStart: 15,
    marginTop: 5,
    color: "black",
    justifyContent: "flex-start",
  },
});
