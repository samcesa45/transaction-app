import LoginForm from '@/features/auth/components/login-form';
import React from 'react';
import { Text, View } from 'react-native';

export default function LoginScreen() {
  return (
    // <View
    //   style={{
    //     flex: 1,
    //     justifyContent: 'center',
    //   }}
    // >
    //   <Text
    //     style={{
    //       color: '#fff',
    //       paddingBottom: 40,
    //     }}
    //   >
    //     Login
    //   </Text>
    // </View>
    <LoginForm />
  );
}
