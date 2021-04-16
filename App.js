import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FONTS} from './src/helpers/theme';

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, fontFamily: 'Roboto-Bold'}}>Weather App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
