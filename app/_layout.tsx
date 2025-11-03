import { queryConfig } from '@/lib/react-query';
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
} from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { PaperProvider, Portal } from 'react-native-paper';
import SessionProvider from './context/ctx';
import SplashScreenController from './splash';
import { useEffect } from 'react';
import { AppStateStatus, Platform } from 'react-native';
import useTokenRefreshMonitor from '@/hooks/useTokenRefreshMonitor';

function onAppStateChange(status: AppStateStatus) {
  // React Query already supports in web browser refetch on window focus by default
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Poppins: require('../assets/fonts/Poppins/Poppins-Regular.ttf'),
    PoppinsBold: require('../assets/fonts/Poppins/Poppins-Bold.ttf'),
    OpenSans: require('../assets/fonts/OpenSans/OpenSans-Regular.ttf'),
    OpenSansBold: require('../assets/fonts/OpenSans/OpenSans-Bold.ttf'),
    Montserrat: require('../assets/fonts/Montserrat/Montserrat-Regular.ttf'),
    MontserratBold: require('../assets/fonts/Montserrat/Montserrat-Bold.ttf'),
  });
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  const queryClient = new QueryClient({ defaultOptions: queryConfig });
  // Set up the auth context and render your layout inside of it.
  return (
    <SessionProvider>
      <SplashScreenController />
      <QueryClientProvider client={queryClient}>
        <PaperProvider>
          <RootNavigator />
        </PaperProvider>
      </QueryClientProvider>
      {/* <Stack>
      <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
    </Stack>
    <StatusBar style="light"/> */}
    </SessionProvider>
  );
}

// Create a new component that can access the SessionProvider context later.
function RootNavigator() {
  useTokenRefreshMonitor();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
