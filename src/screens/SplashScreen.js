import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {color, FONTS} from '../helpers/theme';
import {useDispatch} from 'react-redux';
import {getLocationData} from '../redux/Actions/WeatherActions';

const SplashScreen = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLocationData()).then().catch();
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
