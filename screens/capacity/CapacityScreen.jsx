import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Progress from 'react-native-progress';
const gym = require('./gymTimes.json');

function getProgress(location) {
  var time = new Date();
  var dataset = gym;
  switch (location) {
    case 'gym':
      dataset = gym;
  }
  if (time.getDay() >= 1 && time.getDay() < 6) {
    // It is a weekday
    return ((dataset.peopleAtTimes[0].weekdays[time.getHours()][time.getHours().toString() + "00"]) / dataset.maxCapacity);
  } else {
    return ((dataset.peopleAtTimes[0].weekends[time.getHours()][time.getHours().toString() + "00"]) / dataset.maxCapacity);

  }
}
export default function CapacityScreen() {
  return (
    <View>
      <Text>This is Capacity screen</Text>
      <Text>Gym Capacity</Text>
      <Progress.Bar progress={getProgress('gym')} />
    </View>

  );
}
