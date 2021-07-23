import React from "react";
import { StyleSheet, Text, SafeAreaView, ScrollView, StatusBar, View } from 'react-native';
import * as Progress from 'react-native-progress';
const gym = require('./data/gymTimes.json');
const caf = require('./data/cafTimes.json');
const lot = require('./data/lotTimes.json');
import { Dimensions } from "react-native";
import CollapsibleView from "@eliav2/react-native-collapsible-view";

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
    console.log('Capacity is: ' + capacity);
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

  let labelValues = ["Now"];
  let dataValues = [];
  let datapoints = [];
  if (time.getDay() >= 1 && time.getDay() < 6) {
    for (var i = 0; i < 5; i++) {

      let currentHour24Format = ((time.getHours() + i).toString() + "00").padStart(4, '0');
      if (i > 0) {
        labelValues.push(currentHour24Format.substr(0, 2));
      }
      dataValues.push((dataset.peopleAtTimes[0].weekdays[i + time.getHours()][currentHour24Format] / dataset.maxCapacity) * 100);

    }
  } else {
    for (var i = 0; i < 5; i++) {
      let currentHour24Format = ((time.getHours() + i).toString() + "00").padStart(4, '0');
      if (i > 0) {
        labelValues.push(currentHour24Format.substr(0, 2));
      }
      dataValues.push((dataset.peopleAtTimes[0].weekends[i + time.getHours()][currentHour24Format] / dataset.maxCapacity) * 100);
    }
  }
  dataValues.push(100);
  labelValues.push('Max')
  const data = {
    labels: labelValues,
    datasets: [

      {
        data: dataValues,
      }]
  };
  return data;
}
export default function CapacityScreen() {

  // Doane Orang is #FFA74C
  const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    backgroundGradientToOpacity: .6,
    fillShadowGradient: '#ffffff',
    fillShadowGradientOpacity: 1,
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(0, 0, 0, 1)`,
    strokeWidth: 1, // optional, default 3
    barPercentage: .8,
    useShadowColorFromDataset: false,// optional


  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
      backgroundColor: 'white',
      marginHorizontal: 5,

    },
    text: {
      fontSize: 42,
    },
    titleText: {
      fontSize: 20,
      fontWeight: "bold"
    },
    collapsibleTitleText: {
      fontSize: 18,
      color: "#000000"
    },
    collapseHeader: {
      backgroundColor: "#f09624",

    },
    collapseBody: {
      backgroundColor: "#fff",
      paddingTop: 0,
      marginTop: 0
    }
  });
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.titleText} >
          Business of buildings around campus      </Text>
        <CollapsibleView style={styles.collapseHeader} title={<Text style={styles.collapsibleTitleText}>Gym Capacity</Text>}>
          <View style={styles.collapseBody}>
            <BarChart
              style={{
                marginVertical: 8,
              }}
              data={generateDataForBarChart('gym')}
              width={screenWidth}
              height={220}
              yAxisSuffix="%"
              fromZero={true}
              chartConfig={chartConfig}
              verticalLabelRotation={30}
            />
            <Text>Above is the percentage full for the Gym both now and the expectation over the next four hours.</Text>
          </View>
        </CollapsibleView>
        <CollapsibleView style={styles.collapseHeader} title={<Text style={styles.collapsibleTitleText}>Cafeteria Capacity</Text>}>

          <View style={styles.collapseBody}>
            <BarChart
              style={{
                marginVertical: 8,
              }}
              data={generateDataForBarChart('caf')}
              width={screenWidth}
              height={220}
              yAxisSuffix="%"
              fromZero={true}

              chartConfig={chartConfig}
              verticalLabelRotation={30}
            />
            <Text>Above is the percentage full for the Cafeteria both now and the expectation over the next four hours.</Text>
          </View>
        </CollapsibleView>
        <CollapsibleView style={styles.collapseHeader} title={<Text style={styles.collapsibleTitleText}>Parking Lot Capacity</Text>}>
          <View style={styles.collapseBody}>
            <BarChart
              style={{
                marginVertical: 8,
              }}
              data={generateDataForBarChart('lot')}
              width={screenWidth}
              height={220}
              yAxisSuffix="%"
              fromZero={true}

              chartConfig={chartConfig}
              verticalLabelRotation={30}
            />

            <Text>Above is the percentage of parking spots filled now and the expected amount over the next four hours.</Text>
          </View>
        </CollapsibleView>
      </ScrollView>
    </SafeAreaView>
  );

}
