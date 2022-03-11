import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BusLocationCard from '../../component/BusLocationCard';
import {colorList} from '../../config';

function Locationhistory() {
  return (
    <View style={styles.container}>
      <BusLocationCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorList.secondary,
  },
});

export default Locationhistory;
