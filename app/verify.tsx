import VerifyForm from '@/features/auth/components/verify-form';
import React from 'react';
import { View } from 'react-native';

export default function VerifyScreen() {
  return (
    <View style={{ flex: 1, paddingVertical: 40 }}>
      <VerifyForm />
    </View>
  );
}
