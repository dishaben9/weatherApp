import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {color, FONTS} from '../helpers/theme';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home');
    }, 3000);
  });

  return (
    <View style={styles.container}>
      <Text style={styles.weatherText}>Weather App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherText: {
    ...FONTS.robotoBold,
    color: color.green,
    fontSize: 40,
  },
});

export default SplashScreen;
