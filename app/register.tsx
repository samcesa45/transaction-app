import RegisterForm from '@/features/auth/components/register-form';
import React from 'react';
import { ScrollView } from 'react-native';

export default function RegisterScreen() {
  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <RegisterForm />
    </ScrollView>
  );
}
