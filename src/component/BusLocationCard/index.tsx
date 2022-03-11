import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {busData} from '../../data/busList.json';
import {spacing, fontConfig, colorList} from '../../config';
import Icon from 'react-native-vector-icons/FontAwesome5';

const BusLocationCard = ({}) => {
  return (
    <View style={styles.continer}>
      <View style={styles.containerText}>
        <Text style={styles.busNameTxt}>{busData[7].busName}</Text>
        <View style={styles.containerLoc}>
          <Text style={styles.locationTxt}>GEC More</Text>
          <Text style={styles.updateTimeTxt}>Updated: 2 min ago</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.locationIconBox}>
        <Icon name="map-marked" size={40} color="#900000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  continer: {
    // width: '100%',
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    borderWidth: 1,
    // backgroundColor: 'green',
    margin: spacing.md,
    borderRadius: spacing.md,
    padding: spacing.md,
  },
  containerText: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'flex-start',
    // backgroundColor: 'blue',
    // margin: spacing.md,
    borderRadius: spacing.md,
    flex: 1,
    // height: 100,
  },
  containerLoc: {
    flexDirection: 'column',
    // alignItems: 'center',
    marginRight: spacing.lg,
    // flex: 1,
    // backgroundColor: 'blue',
    // justifyContent: 'center',
  },
  busNameTxt: {
    fontSize: fontConfig.xlg,
    color: 'black',
    marginRight: spacing.xlg,
  },
  locationTxt: {
    fontSize: fontConfig.lg,
    color: 'black',
  },
  updateTimeTxt: {
    fontSize: fontConfig.sm,
    color: colorList.darkSoft,
    textAlign: 'left',
  },
  locationIconBox: {
    // backgroundColor: 'blue',
    // padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'yellow',
  },
});

export default BusLocationCard;
