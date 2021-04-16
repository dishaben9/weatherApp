import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {useSelector} from 'react-redux';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {FONTS} from '../helpers/theme';

const CityDetailScreen = ({navigation, route}) => {
  const cityData = useSelector(state => state?.weather?.cityList);
  const city = cityData.find(i => i?.id === route?.params?.cityId);
  console.log(city);

  const getTemperature = kelvin_temp => {
    return Math.round(kelvin_temp - 273.15).toString() + '° C';
  };

  const capitalize = s =>
    s
      .split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

  return (
    <View style={styles.container}>
      <MapView
        style={{
          width: '100%',
          flex: 1,
        }}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: city?.coord?.lat,
          longitude: city?.coord?.lon,
          latitudeDelta: 0.04,
          longitudeDelta: 0.05,
        }}>
        <Marker
          coordinate={{
            latitude: city?.coord?.lat,
            longitude: city?.coord?.lon,
          }}
          identifier={`${city.id}`}>
          <Image
            source={require('../assets/pointer.png')}
            resizeMode="contain"
            style={{
              width: 40,
              height: 40,
            }}
          />
          <Text style={{...FONTS.robotoLight, fontSize: 15}}>{city?.name}</Text>
        </Marker>
      </MapView>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1, padding: 30}}>
          <Text style={{...FONTS.robotoBold, fontSize: 30}}>{city?.name}</Text>
          <Text style={{...FONTS.robotoLight, fontSize: 20, marginTop: 20}}>
            {capitalize(city?.weather[0].description)}
          </Text>
          <Text style={{...FONTS.robotoLight, fontSize: 20, marginTop: 15}}>
            Humidity: {city?.main?.humidity}
          </Text>
          <Text style={{...FONTS.robotoLight, fontSize: 20, marginTop: 15}}>
            Wind Speed: {city?.wind?.speed}
          </Text>
          <Text style={{...FONTS.robotoLight, fontSize: 20, marginTop: 15}}>
            Max. Temp.: {getTemperature(city?.main?.temp_max)}
          </Text>
          <Text style={{...FONTS.robotoLight, fontSize: 20, marginTop: 15}}>
            Max. Temp.: {getTemperature(city?.main?.temp_min)}
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{...FONTS.robotoBold, fontSize: 30}}>
            {getTemperature(city?.main?.temp)}
          </Text>
          <View style={styles.weatherImage}>
            <Image
              source={{
                uri: `http://openweathermap.org/img/w/${city?.weather[0]?.icon}.png`,
              }}
              style={styles.weather}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  weatherImage: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  weather: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
});

export default CityDetailScreen;
