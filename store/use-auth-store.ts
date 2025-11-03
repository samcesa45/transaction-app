import * as SecureStore from 'expo-secure-store'
import {create} from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'
type AuthState  = {
    isAuthenticated: boolean;
    setIsAuthenticated: (val:boolean) => void;
    token: string | null;
    refreshToken: string | null;
    setToken: (token: string) => void;
    setRefreshTkn: (resetTkn: string) => void;
    setTokens:(token:string,refreshToken:string) => void;
    login: (token: string) => void;
    logout: () => void;
}

//secure wrapper for zustand persistence 
const secureStoreStorage = {
    getItem: async (key: string): Promise<string | null> => {
        return SecureStore.getItemAsync(key);
    },
    setItem: async (key:string, value: string): Promise<void> => {
        await SecureStore.setItemAsync(key,value)
    },
    removeItem: async (key:string): Promise<void> => {
        await SecureStore.deleteItemAsync(key)
    }
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isAuthenticated:false,
            setIsAuthenticated: (val) => set({isAuthenticated: val}),
            token:null,
            refreshToken:null,
            setToken:(token) =>set({token}),
            setRefreshTkn: (refreshToken) => set({refreshToken}),
            setTokens: (token,refreshToken) => set({token,refreshToken}),
            //Action to log the user in and set the token
            login: (token:string) => set({
                token: token,
                isAuthenticated: true
            }),

            //Action to log the user out and clear state
            logout: () => {
                set({
                token: null,
                refreshToken: null,
                isAuthenticated: false
                });

                //Clear storage
                secureStoreStorage.removeItem('auth-storage');
            },

            //Action to handle session expiry without explicit user logout
            setUnauthenticated: () => set({
                token: null,
                isAuthenticated: false
            })
        }),
        {
            name:'auth-storage',
            storage: createJSONStorage(() => secureStoreStorage),
            //only persist the accessToken 
            partialize: (state)=> ({
                token: state.token, 
                refreshToken: state.refreshToken,
                isAuthenticated:state.isAuthenticated
            })
        }
    )
)