import { getUser } from '@/features/auth/api/get-user';
import { LoginInput, login } from '@/features/auth/api/login';
import { logout } from '@/features/auth/api/logout';
import { LoginResponse, User } from '@/model/api';
import { useAuthStore } from '@/store/use-auth-store';
import {
  PropsWithChildren,
  createContext,
  use,
  useEffect,
  useState,
} from 'react';

const AuthContext = createContext<{
  signIn: (data: LoginInput) => Promise<LoginResponse | undefined>;
  signOut: () => Promise<void>;
  session?: string | null;
  isLoading: boolean;
  user?: User | null;
}>({
  signIn: async () => ({ userId: '' }) as LoginResponse,
  signOut: async () => {},
  session: null,
  isLoading: false,
  user: null,
});

export function useSession() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error('useSession must be wrapped in a <SessionProvider/>');
  }
  return value;
}

export default function SessionProvider({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const { token, setTokens, logout: storeLogout } = useAuthStore();

  useEffect(() => {
    async function init() {
      //only try to get user if we have a token
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await getUser();
        setUser(response);
      } catch (error: any) {
        // console.error(error);
        if (error?.response?.status !== 401) {
          console.error(error);
        }
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        signIn: async (data) => {
          setIsLoading(true);
          try {
            const logindata = {
              ...data,
              email: data.email.toLowerCase(),
            };
            const response = await login({ data: logindata });

            //Store tokens inzustand store
            if (response.accessToken && response.refreshToken) {
              setTokens(response.accessToken, response.refreshToken);
            }

            //fetch the full user object after login
            const userResponse = await getUser();
            setUser(userResponse);

            return response;
          } catch (error) {
            console.error(error);
          } finally {
            setIsLoading(false);
          }
        },
        signOut: async () => {
          setIsLoading(true);
          try {
            await logout();
            setUser(null);
          } catch (error) {
            console.error(error);
          } finally {
            setIsLoading(false);
          }
        },
        session: user?.id,
        isLoading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
