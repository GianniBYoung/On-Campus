import React from "react";
import { StyleSheet, Text, SafeAreaView, ScrollView, StatusBar, View } from 'react-native';
import * as Progress from 'react-native-progress';
const gym = require('./data/gymTimes.json');
const caf = require('./data/cafTimes.json');
const lot = require('./data/lotTimes.json');
import { Dimensions } from "react-native";
import CollapsibleView from "@eliav2/react-native-collapsible-view";
import { ProgressBar, Colors } from 'react-native-paper';

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
function roundToMult5(x) {
  return Math.ceil(x / 5) * 5;
}
function getCapacityMessage(capacity) {
  if (capacity <= .20) {
    return 'Nearly Empty';
  } else if (capacity <= .40) {
    return 'Not Busy';
  } else if (capacity <= .60) {
    return 'Normal';
  } else if (capacity <= .80) {
    return 'Busy';
  } else {
    return 'Crowded';
  }
}
export default function CapacityScreen() {
  const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#5A9B00",
    backgroundGradientTo: "#8dce19",
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
      backgroundColor: '#337ab7',

    },
    scrollView: {
      backgroundColor: '#337ab7',
      marginHorizontal: 5,

    },
    text: {
      fontSize: 42,
    },
    titleText: {
      fontSize: 20,
      fontWeight: "bold", color: "#ffffff",
      textAlign: "center",
      margin: 5
    },
    collapsibleTitleText: {
      fontSize: 18,
      color: "#000000"
    },
    collapseHeader: {
      backgroundColor: "#8dce19",

    },
    collapseBody: {
      backgroundColor: "#fff",
      paddingTop: 0,
      marginTop: 0
    },
    progressBar: {
      marginTop: 10,
      marginBottom: 5,
      height: 10,
      marginHorizontal: 20
    }, locationDescriptionText: {
      padding: 5,
      paddingBottom: 0,
      textAlign: "center"
    }, graphDescriptionText: {
      padding: 5,
      textAlign: "center",
      paddingTop: 0
    }
  });
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.titleText} >
          Current Capacities Of Buildings On Campus</Text>
        <CollapsibleView style={styles.collapseHeader} title={<Text style={styles.collapsibleTitleText}>Gym Capacity {roundToMult5(Math.round(getProgress('gym') * 100))}%</Text>}>
          <View style={styles.collapseBody}>
            <Text style={styles.locationDescriptionText}>The Gym is {getCapacityMessage(getProgress('gym'))}</Text>
            <ProgressBar style={styles.progressBar} progress={getProgress('gym')} color={Colors.green700} />
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
            <Text style={styles.graphDescriptionText}>Percent of max capacity being used now(actual) and expected over the next four hours.</Text>
          </View>
        </CollapsibleView>
        <CollapsibleView style={styles.collapseHeader} title={<Text style={styles.collapsibleTitleText}>Cafeteria Capacity {roundToMult5(Math.round(getProgress('caf') * 100))}%</Text>}>
          <View style={styles.collapseBody}>
            <Text style={styles.locationDescriptionText}>The Cafeteria is {getCapacityMessage(getProgress('caf'))}</Text>

            <ProgressBar style={styles.progressBar} progress={getProgress('caf')} color={Colors.green700} />

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
            <Text style={styles.graphDescriptionText}>Percent of max capacity being used now(actual) and expected over the next four hours.</Text>
          </View>
        </CollapsibleView>
        <CollapsibleView style={styles.collapseHeader} title={<Text style={styles.collapsibleTitleText}>Parking Lot Usage {roundToMult5(Math.round(getProgress('lot') * 100))}%</Text>}>
          <View style={styles.collapseBody}>
            <Text style={styles.locationDescriptionText}>The Parking Lot is {getCapacityMessage(getProgress('lot'))}</Text>
            <ProgressBar style={styles.progressBar} progress={getProgress('lot')} color={Colors.green700} />
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
            <Text style={styles.graphDescriptionText}>Percent of total parking spaces being used now(actual) and expected over the next four hours.</Text>
          </View>
        </CollapsibleView>
      </ScrollView>
    </SafeAreaView>
  );

}
