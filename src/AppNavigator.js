import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import CityDetailScreen from './screens/CityDetailScreen';
import {color} from './helpers/theme';

const navigationOption = {
  headerLeft: false,
  headerTitle: 'WeatherApp',
  headerTitleStyle: {alignSelf: 'center'},
  headerStyle: {backgroundColor: color.green},
  headerTintColor: color.white,
};

const MainStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false, headerLeft: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={navigationOption}
        />
        <Stack.Screen
          name="CityDetail"
          component={CityDetailScreen}
          options={{
            headerLeft: () => {},
            ...navigationOption,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigator;
