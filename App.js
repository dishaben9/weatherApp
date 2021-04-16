import React, {useEffect, useState} from 'react';
import MainStackNavigator from './src/AppNavigator';
import AppReducer from './src/redux/Reducers';
import {persistStore, persistReducer} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import Thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {getMessage} from './src/helpers/notificationmessage';

const PERSIST_CONFIG = {
  key: 'root',
  storage: AsyncStorage,
};

const PERSIST_REDUCER = persistReducer(PERSIST_CONFIG, AppReducer);
const STORE = createStore(PERSIST_REDUCER, applyMiddleware(Thunk));
let PERSIST_STORE = persistStore(STORE);

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },

  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);

    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);
  },

  onRegistrationError: function (err) {
    console.error(err.message, err);
  },

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,

  requestPermissions: true,
});

const App = () => {
  const [message, setMessage] = useState('abc');
  const sendMessage = () => {
    PushNotification.localNotification({
      title: message, // (optional)
      message: message, // (required)
      largeIcon: 'ic_cloud',
    });
  };

  useEffect(() => {
    sendMessage();
    getMessage().then(res => {
      setMessage(res);
    });
  }, []);

  PushNotification.localNotificationSchedule({
    message: message,
    date: new Date(Date.now() + 60 * 10000), // in 60 Min
    allowWhileIdle: false,
    largeIcon: 'ic_cloud',
  });

  return (
    <Provider store={STORE}>
      <PersistGate loading={null} persistor={PERSIST_STORE}>
        <MainStackNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
