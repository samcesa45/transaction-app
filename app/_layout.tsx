import { queryConfig } from '@/lib/react-query';
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
} from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { Toasts } from '@backpackapp-io/react-native-toast';
import SessionProvider from './context/ctx';
import { useCallback, useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import useTokenRefreshMonitor from '@/hooks/useTokenRefreshMonitor';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins: require('../assets/fonts/Poppins/Poppins-Regular.ttf'),
    PoppinsBold: require('../assets/fonts/Poppins/Poppins-Bold.ttf'),
    OpenSans: require('../assets/fonts/OpenSans/OpenSans-Regular.ttf'),
    OpenSansBold: require('../assets/fonts/OpenSans/OpenSans-Bold.ttf'),
    Montserrat: require('../assets/fonts/Montserrat/Montserrat-Regular.ttf'),
    MontserratBold: require('../assets/fonts/Montserrat/Montserrat-Bold.ttf'),
  });

  const queryClient = new QueryClient({ defaultOptions: queryConfig });
  // Set up the auth context and render your layout inside of it.

  const onReady = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    onReady();
  }, [onReady]);

  if (!fontsLoaded) return null;
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <PaperProvider>
          <SessionProvider>
            <RootNavigator />
            <Toasts />
          </SessionProvider>
        </PaperProvider>
      </QueryClientProvider>
      <StatusBar style="dark" />
    </GestureHandlerRootView>
  );
}

// Create a new component that can access the SessionProvider context later.
function RootNavigator() {
  useTokenRefreshMonitor();
  return (
    <Stack
    // screenOptions={{
    //   headerShown: false,
    // }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle: 'hi',
        }}
      />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
