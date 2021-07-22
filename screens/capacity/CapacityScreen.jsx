import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Progress from 'react-native-progress';
const gym = require('./data/gymTimes.json');
const caf = require('./data/cafTimes.json');
const lot = require('./data/lotTimes.json');
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

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
    return capacity;
  } else {
    let capacity = ((dataset.peopleAtTimes[0].weekends[time.getHours()][time.getHours().toString() + "00"]) / dataset.maxCapacity);
    return capacity;

  }
}
function generateDataForBarChart(location) {
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
  var time = new Date();

  let labelValues = [];
  let dataValues = [];
  let count = 0;
  if (time.getDay() >= 1 && time.getDay() < 6) {

    for (var hour of dataset.peopleAtTimes[0].weekdays) {
      let currentHour24Format = (count.toString() + "00").padStart(4, '0');
      labelValues.push(currentHour24Format.substr(0, 2));
      dataValues.push((hour[currentHour24Format] / dataset.maxCapacity) * 100);

      count += 1;
    }
  } else {
    for (var hour of dataset.peopleAtTimes[0].weekends) {
      let currentHour24Format = (count.toString() + "00").padStart(4, '0');
      labelValues.push(currentHour24Format.substr(0, 2));
      dataValues.push((hour[currentHour24Format] / dataset.maxCapacity) * 100);
      count += 1;
    }
  }

  const data = {
    labels: labelValues,
    datasets: [
      {
        data: dataValues,
      }
    ]
  };
  return data;
}
export default function CapacityScreen() {
  const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    backgroundGradientToOpacity: .6,
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(0, 0, 0, 1)`,
    strokeWidth: 1, // optional, default 3
    barPercentage: 0.1,
    useShadowColorFromDataset: false,// optional

  };

  return (
    <View>
      <Text>This is Capacity screen</Text>
      <Text>Gym Capacity</Text>
      <Progress.Bar progress={getProgress('gym')} />
      <BarChart
        style={{
          marginVertical: 8,
        }}
        data={generateDataForBarChart('gym')}
        width={screenWidth}
        height={220}
        yAxisSuffix="%"

        chartConfig={chartConfig}
        verticalLabelRotation={30}
      />
      <Text>Cafeteria Capacity</Text>
      <Progress.Bar progress={getProgress('caf')} />
      <BarChart
        style={{
          marginVertical: 8,
        }}
        data={generateDataForBarChart('caf')}
        width={screenWidth}
        height={220}
        yAxisSuffix="%"

        chartConfig={chartConfig}
        verticalLabelRotation={30}
      />
      <Text>Parking Lot Capacity</Text>
      <Progress.Bar progress={getProgress('lot')} />
      <BarChart
        style={{
          marginVertical: 8,
        }}
        data={generateDataForBarChart('lot')}
        width={screenWidth}
        height={220}
        yAxisSuffix="%"

        chartConfig={chartConfig}
        verticalLabelRotation={30}
      />
    </View>

  );
}
