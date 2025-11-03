import { Stack } from 'expo-router';
import React from 'react';

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: 'Main',
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerBackTitle: 'Back',
          headerShadowVisible: false,
          headerTintColor: 'red',
        }}
      />
    </Stack>
  );
}
