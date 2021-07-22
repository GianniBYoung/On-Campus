import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Progress from 'react-native-progress';
const gym = require('./data/gymTimes.json');
const caf = require('./data/cafTimes.json');
const lot = require('./data/lotTimes.json');
import {
  BarChart
} from "react-native-chart-kit";
function getProgress(location) {
  var time = new Date();
  let dataset = gym;
  switch (location) {
    case 'gym':
      dataset = gym;
      break;
    case 'lot':
      dataset = lot;
      break;
    case 'caf':
      dataset = caf;
      break;
    default:
      console.log('Please pass a valid location')
  }

  if (time.getDay() >= 1 && time.getDay() < 6) {
    // It is a weekday
    let capacity = ((dataset.peopleAtTimes[0].weekdays[time.getHours()][time.getHours().toString() + "00"]) / dataset.maxCapacity);
    console.log(`${location} at ${capacity} of capacity`)
    return capacity;
  } else {
    let capacity = ((dataset.peopleAtTimes[0].weekends[time.getHours()][time.getHours().toString() + "00"]) / dataset.maxCapacity);
    console.log(`${location} at ${capacity} of capacity`)
    return capacity;

  }
}
export default function CapacityScreen() {
  let labelValues = [];
  let dataValues = [];
  let count = 0;
  for (var hour of gym.peopleAtTimes[0].weekdays) {
    let currentHour24Format = (count.toString() + "00").padStart(4, '0');
    labelValues.push(currentHour24Format);
    dataValues.push(hour[currentHour24Format]);
    count += 1;
  }
  console.log(dataValues);
  const data = {
    labels: labelValues,
    datasets: [
      {
        data: dataValues,
      }
    ]
  };
  return (
    <View>
      <Text>This is Capacity screen</Text>
      <Text>Gym Capacity</Text>
      <Progress.Bar progress={getProgress('gym')} />

      <Text>Cafeteria Capacity</Text>
      <Progress.Bar progress={getProgress('caf')} />
      <Text>Parking Lot Capacity</Text>
      <Progress.Bar progress={getProgress('lot')} />
    </View>

  );
}
