import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import { getItem, setItem, removeItem } from '../helpers/localStorage';
import {
  signUpUser as signUpUserService,
  getUserDataById as getUserDataByIdService,
} from '../services/user';
import { signInUser as signInUserService } from '../services/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [authUserId, setAuthUserId] = useState('');
  const [jwtToken, setJwtToken] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [role, setRole] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const loadStorageData = () => {
      const userId = getItem('userId');
      const token = getItem('bearerToken');
      const userRole = getItem('userRole');

      if (userId && token) {
        setAuthUserId(userId);
        setJwtToken(token);
        setIsSignedIn(true);
      }

      if (userRole) {
        setRole(userRole);
        if (userRole === 'admin') setIsAdmin(true);
      }

      setIsLoading(false);
    };

    loadStorageData();
  }, [jwtToken, isSignedIn, role, isAdmin, authUserId, isLoading]);

  const signUpUser = async (userData) => {
    try {
      const data = await signUpUserService(userData);
      if (data && data.hasError) navigate('/error', { state: data });
      if (data && !data.hasError) navigate('/signin');
    } catch (error) {
      navigate('/error', {
        state: {
          hasError: true,
          message:
            'A serious error occurred while signing up.\nPlease try again.',
        },
      });
    }
  };

  const signInUser = async (userData) => {
    try {
      const data = await signInUserService(userData);
      if (data && data.hasError) navigate('/error', { state: data });
      if (data && !data.hasError) {
        const { token, user } = data;
        if (token && user) {
          setItem('bearerToken', token);
          setItem('userId', user._id);
          setItem('userRole', user.role);
          if (user.role) {
            setRole(user.role);
            if (user.role === 'admin') setIsAdmin(true);
          }
          setAuthUserId(user._id);
          setJwtToken(token);
          setIsSignedIn(true);
          navigate('/');
        } else {
          navigate('/error', {
            state: {
              hasError: true,
              message:
                'An error occurred while signing in.\nUser data or jwt token missing or corrupted',
            },
          });
        }
      }
    } catch (error) {
      navigate('/error', {
        state: {
          hasError: true,
          message:
            'A serious error occurred while signing in.\nPlease try again.',
        },
      });
    }
  };

  const signOutUser = async () => {
    removeItem('userId');
    removeItem('bearerToken');
    removeItem('userRole');

    setAuthUserId('');
    setJwtToken('');
    setRole('');
    setIsAdmin(false);
    setIsSignedIn(false);
    navigate('/');
  };

  const getCurrentUserData = async () => {
    try {
      const data = await getUserDataByIdService(authUserId, jwtToken);
      if (data && data.hasError) navigate('/error', { state: data });
      if (data && !data.hasError) {
        return data.user;
      }
    } catch (error) {
      navigate('/error', {
        state: {
          hasError: true,
          message: 'A serious error occurred.',
        },
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        authUserId,
        jwtToken,
        isSignedIn,
        isAdmin,
        signUpUser,
        signInUser,
        signOutUser,
        getCurrentUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
