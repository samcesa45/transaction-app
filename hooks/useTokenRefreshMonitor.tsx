import { useAuthStore } from "@/store/use-auth-store"
import { useEffect } from "react"
import { AppState } from "react-native"

export default function useTokenRefreshMonitor() {
    const token = useAuthStore((state) => state.token)

    useEffect(() => {
        const subscription = AppState.addEventListener('change', (nextAppState) => {
            if(nextAppState === 'active' && token) {
                console.log('App became active , token will be validated on next request')
            }
        });
        return () => {
            subscription.remove();
        }
    },[token]);
}
