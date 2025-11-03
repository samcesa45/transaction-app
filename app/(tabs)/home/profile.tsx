import { useSignout } from '@/features/auth/api/logout';
import { useAuthStore } from '@/store/use-auth-store';
import { router } from 'expo-router';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  const { refreshToken, setRefreshTkn, setToken } = useAuthStore();
  const logout = useSignout();
  const handleLogout = () => {
    // If no refresh token, just clear local state
    if (!refreshToken) {
      setToken('');
      setRefreshTkn('');
      router.replace('/login');
      return;
    }

    logout.mutate(refreshToken, {
      onSuccess(response) {
        setToken(null ?? '');
        setRefreshTkn(null ?? '');
        router.replace('/login');
      },
      onError(error) {
        console.error('logout error', error);
      },
    });
  };
  return (
    <View>
      <Text>Profile Screen</Text>
      <Pressable
        onPress={handleLogout} // Direct call, no handleSubmit wrapper
        style={[styles.button, logout.isPending && styles.buttonDisabled]}
        disabled={logout.isPending}
      >
        {logout.isPending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.text}>Logout</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: '#FF0083',
    borderRadius: 30,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00000040',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  text: {
    fontFamily: 'Poppins',
    fontSize: 18,
    color: '#FFF2F2',
    fontWeight: 'bold',
    lineHeight: 21,
    letterSpacing: 2,
  },
});
