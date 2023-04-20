import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useMutation } from 'react-query';
import { login, register } from 'shared/services/auth';
import Cookies from 'js-cookie';
import Api from 'shared/config/api';
import { useRouter } from 'next/router';

type AuthFormData = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: any;
  error: string;
  handleLogin: (data: AuthFormData) => void;
  handleRegister: (data: AuthFormData) => void;
  handleLogout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

interface Props {
  children: ReactNode;
}

type Auth = {
  accessToken: string;
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get('accessToken');
      if (token) {
        console.log("Got a token in the cookies, let's see if it is valid");
        const { data } = await Api.get('auth/me');

        if (data) {
          setUser(data?.user);
        }
      }
    }
    loadUserFromCookies();
  }, []);

  const requestLoginMutation = useMutation('requestLogin', login, {
    onSuccess: async (response: Auth) => {
      const { accessToken } = response;
      Cookies.set('accessToken', accessToken);
      const { data } = await Api.get('auth/me');
      if (data) {
        setUser(data?.user);
      }

      setError('');
    },
    onError: (error: { response: { data: { message: string } } }) => {
      setError(error?.response?.data?.message);
    },
  });

  const requestRegisterMutation = useMutation('requestRegister', register, {
    onSuccess: async (response: Auth) => {
      const { accessToken } = response;
      Cookies.set('accessToken', accessToken);
      const { data } = await Api.get('auth/me');
      if (data) {
        setUser(data?.user);
      }

      setError('');
    },
    onError: (error: { response: { data: { message: string } } }) => {
      setError(error?.response?.data?.message);
    },
  });

  const handleLogin = (param: AuthFormData) => {
    requestLoginMutation.mutate(param);
  };

  const handleRegister = (param: AuthFormData) => {
    requestRegisterMutation.mutate(param);
  };

  const handleLogout = () => {
    Cookies.remove('accessToken');
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        error,
        handleLogin,
        handleRegister,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
