import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth } from './authSlice';
import { AppDispatch } from '@/store';

export const initializeAuthState = () => async (dispatch: AppDispatch) => {
  try {
    const [token, userString, hasCompletedOnboarding] = await Promise.all([
      AsyncStorage.getItem('token'),
      AsyncStorage.getItem('user'),
      AsyncStorage.getItem('hasCompletedOnboarding'),
    ]);

    const user = userString ? JSON.parse(userString) : undefined;
    
    dispatch(initializeAuth({
      token: token || undefined,
      user,
      hasCompletedOnboarding: hasCompletedOnboarding === 'true',
    }));
  } catch (error) {
    console.error('Failed to initialize auth state:', error);
  }
};