import { useSession } from "@/app/context/ctx";
import { useAuthStore } from "@/store/use-auth-store"
import { useEffect } from "react";

export default function useAuthDebug() {
    const token = useAuthStore((state) => state.token);
    const refreshToken = useAuthStore((state) => state.refreshToken);
    const {user, isLoading} = useSession()
    
    useEffect(() => {
        console.log('=== AUTH STATE ===');
        console.log('Has token:', !!token);
        console.log('Has refresh token:', !!refreshToken);
        console.log('User:', user?.id || 'null');
        console.log('Loading:', isLoading);
        console.log('==================');
      }, [token, refreshToken, user, isLoading]);
}
