// App.js
import React, { useEffect } from 'react';
import { View, Text, Alert, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

export default function App() {

  useEffect(() => {
    registerForPush();
  }, []);

  async function registerForPush() {
    try {
      // Request notification permissions
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        Alert.alert('Permission not granted for notifications!');
        return;
      }

      // Get the Expo push token
      const tokenData = await Notifications.getExpoPushTokenAsync();
      const token = tokenData.data;
      console.log('Expo Push Token:', token);

      // Save token to Supabase
      const response = await fetch(
        'https://trvzirhhtnwdcrolglgn.supabase.co/rest/v1/push_tokens',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': 'sb_publishable_e5xeYMVkzpIekQNv2N29Hw_bInB2EoO',
            'Authorization': 'Bearer sb_publishable_e5xeYMVkzpIekQNv2N29Hw_bInB2EoO'
          },
          body: JSON.stringify({ token })
        }
      );

      if (!response.ok) {
        console.error('Failed to save token to Supabase:', await response.text());
      } else {
        console.log('Token saved successfully to Supabase!');
      }

    } catch (error) {
      console.error('Error registering for push notifications:', error);
    }
  }

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text>Pilgrim's Daily Grace App</Text>
      <Text>Push notifications are enabled!</Text>
    </View>
  );
}