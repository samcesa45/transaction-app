import { SplashScreen } from 'expo-router';
import { useSession } from './context/ctx';

SplashScreen.preventAutoHideAsync();

export default function SplashScreenController() {
  const { isLoading } = useSession();

  if (!isLoading) {
    SplashScreen.hide();
  }
  return null;
}
