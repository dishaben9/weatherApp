import AsyncStorage from '@react-native-async-storage/async-storage';

export const getTemperature = kelvin_temp => {
  return Math.round(kelvin_temp - 273.15).toString() + '° C';
};

export const getMessage = async () => {
  const value = await AsyncStorage.getItem('TEMPERATURE');
  if (value !== null) {
    return `Current Temperature: ${value}° C`;
  } else {
    return 'Unable to get your location';
  }
};
