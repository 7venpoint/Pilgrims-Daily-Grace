import React, { useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';

export default function App() {
  useEffect(() => {
    registerForPush();
  }, []);

  async function registerForPush() {
    const { status } = await Notifications.requestPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission not granted!');
      return;
    }

    const tokenData = await Notifications.getExpoPushTokenAsync();
    const token = tokenData.data;

    console.log("Push Token:", token);

    // Save token to Supabase
    await fetch('https://YOUR_PROJECT_ID.supabase.co/rest/v1/push_tokens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'sb_publishable_e5xeYMVkzpIekQNv2N29Hw_bInB2EoO',
        'Authorization': 'Bearer sb_publishable_e5xeYMVkzpIekQNv2N29Hw_bInB2EoO'
      },
      body: JSON.stringify({ token })
    });

    console.log("Token saved to Supabase!");
  }

  return (
    <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
      <Text>Pilgrim's Daily Grace App</Text>
    </View>
  );
}