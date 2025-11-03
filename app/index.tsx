import { useAuthStore } from '@/store/use-auth-store';
import { Redirect } from 'expo-router';
import { useSession } from './context/ctx';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function Index() {
  const { user, isLoading } = useSession();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  //Redirect to login if not authenticated, otherwise to home
  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return <Redirect href="/(tabs)/home" />;
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
