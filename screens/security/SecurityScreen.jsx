import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  View,
  Button,
} from "react-native";

import EmergencyContactItem from "./components/EmergencyContactItem";
import MapView, { Marker } from "react-native-maps";

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

export default function SecurityScreen({ navigation }) {
  const [emergencyModeOn, setEmergencyModeOn] = useState(false);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text
          style={[styles.title, { color: emergencyModeOn ? "red" : "black" }]}
        >
          Security
        </Text>
        {emergencyModeOn ? (
          <View style={styles.cancelButton}>
            <Button
              title="Cancel"
              onPress={() => setEmergencyModeOn(false)}
            ></Button>
          </View>
        ) : (
          <View style={styles.backButton}>
            <Button title="Back" onPress={() => navigation.pop()}></Button>
          </View>
        )}

        <View style={styles.middleContainer}>
          {emergencyModeOn ? (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: 40.62305,
                longitude: -96.94977,
                latitudeDelta: 0.002,
                longitudeDelta: 0.002,
              }}
            >
              <Marker
                coordinate={{ latitude: 40.62305, longitude: -96.94977 }}
                pinColor="#3388ff"
                title="You"
              />
              <Marker
                coordinate={{ latitude: 40.62321, longitude: -96.94911 }}
                title="Campus Police"
              />
              <Marker
                coordinate={{ latitude: 40.62234, longitude: -96.94875 }}
                title="Campus Police"
              />
            </MapView>
          ) : (
            <TouchableOpacity
              style={styles.securityButtonContainer}
              onPress={() => setEmergencyModeOn(true)}
            >
              <Text style={styles.sosText}>SOS</Text>
            </TouchableOpacity>
          )}
        </View>

        <View
          style={{
            ...styles.contactsContainer,
            backgroundColor: emergencyModeOn ? "#cc2f2f" : "#f5f5f5",
          }}
        >
          <Text
            style={[
              styles.contactMainTitle,
              { color: emergencyModeOn ? "white" : "black" },
            ]}
          >
            {emergencyModeOn
              ? "Help is on the way!"
              : "Your Emergency Contacts"}
          </Text>
          <Text
            style={[
              styles.contactMainSubtitle,
              { color: emergencyModeOn ? "white" : "black" },
            ]}
          >
            {emergencyModeOn
              ? "All the contacts below have been alerted! "
              : "When press the sos button, all the contacts below will be alerted"}
          </Text>
          {contacts.map((contact) => (
            <EmergencyContactItem
              key={contact.name}
              contact={contact}
              emergencyModeOn={emergencyModeOn}
            />
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
  appBar: {
    width: "100%",
    flexDirection: "row",
  },
  appBarButton: {
    fontSize: 20,
    marginTop: 60,
    color: "black",
  },
  title: {
    fontSize: 30,
    margin: 30,
    marginTop: 60,
    color: "black",
    fontWeight: "bold",
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 15,
  },
  cancelButton: {
    position: "absolute",
    top: 60,
    right: 15,
  },

  middleContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
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
  map: {
    width: "100%",
    height: 256,
  },
});
