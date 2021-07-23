import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>On Campus</Text>
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={styles.securityButton}
                onPress={() => {navigation.push("Security")}}>
                <Text style={styles.securityText}>Security</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.capacityButton}
                onPress={() => {navigation.push("Capacity")}}>
                <Text style={styles.capacityText}>Capacity</Text>
            </TouchableOpacity>

        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#337ab7"
    },
    title: {
        fontSize: 30,
        margin: 30,
        marginTop: 60,
        color: "white",
        fontWeight: "bold",
        justifyContent: "flex-start",
    },
    buttonContainer: {
        width: "100%",
        elevation: 30,
        alignItems: "center",
    },
    securityText: {
        fontSize: 18,
        color: "red",
    },
    securityButton: {
        width: 225,
        height: 100,
        marginBottom: 30,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 10,
    },
    capacityText: {
        fontSize: 18,
        color: "black",
    },
    capacityButton: {
        width: 225,
        height: 100,
        marginBottom: 30,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 10,
    },
});
