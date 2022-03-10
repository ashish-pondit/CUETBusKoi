import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  return (
    <View style={styles.continer}>
      <Text>Hello Cuet Bus</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  continer: {
    flex: 1,
  },
});

export default App;
