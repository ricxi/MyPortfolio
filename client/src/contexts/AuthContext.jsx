import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import {
  signUpUser as signUpUserService,
  getUserDataById as getUserDataByIdService,
} from '../services/user';
import { signInUser as signInUserService } from '../services/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [authUserId, setAuthUserId] = useState('');
  const [token, setToken] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [role, setRole] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('bearerToken');
    const userRole = localStorage.getItem('userRole');
    if (userId && token) {
      setAuthUserId(userId);
      setToken(token);
      setIsSignedIn(true);
    }

    if (userRole) {
      setRole(userRole);
      if (userRole === 'admin') setIsAdmin(true);
    }

    // TODO: Are they actually authorized? Should I set this here?
    setIsAuthorized(true);
  }, [token, authUserId, isSignedIn]);

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
          localStorage.setItem('bearerToken', token);
          localStorage.setItem('userId', user._id);
          localStorage.setItem('userRole', user.role);
          if (user.role) {
            setRole(user.role);
            if (user.role === 'admin') setIsAdmin(true);
          }
          setAuthUserId(user._id);
          setToken(token);
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
    localStorage.removeItem('userId');
    localStorage.removeItem('bearerToken');
    localStorage.removeItem('userRole');
    setAuthUserId('');
    setToken('');
    setRole('');
    setIsAdmin(false);
    setIsSignedIn(false);
    navigate('/');
  };

  const getCurrentUserData = async () => {
    try {
      const data = await getUserDataByIdService(authUserId, token);
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
    <AuthContext
      value={{
        authUserId,
        token,
        isSignedIn,
        isAuthorized,
        signUpUser,
        signInUser,
        signOutUser,
        getCurrentUserData,
      }}
    >
      {children}
    </AuthContext>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
