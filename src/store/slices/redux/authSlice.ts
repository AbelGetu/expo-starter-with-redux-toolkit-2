// src/store/slices/redux/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types/auth';

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  hasCompletedOnboarding: boolean;
}

const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  hasCompletedOnboarding: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      AsyncStorage.multiRemove(['token', 'user']);
    },
    clearError: (state) => {
      state.error = null;
    },
    setCredentials: (state, action: PayloadAction<{ data: { user: User; token: string } }>) => {
      console.log('token:', action.payload.data.token);
      state.token = action.payload.data.token;
      state.user = action.payload.data.user;
      state.isAuthenticated = true;
      state.error = null;
      AsyncStorage.multiSet([
        ['token', action.payload.data.token],
        ['user', JSON.stringify(action.payload.data.user)]
      ]);
    },
    clearCredentials: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      AsyncStorage.multiRemove(['token', 'user']);
    },
    // Update user data
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        AsyncStorage.setItem('user', JSON.stringify(state.user));
      }
    },
    // Set user data directly
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      AsyncStorage.setItem('user', JSON.stringify(action.payload));
    },
    // Initialize auth state from storage (you'll call this on app start)
    initializeAuth: (state, action: PayloadAction<{ token?: string; user?: User; hasCompletedOnboarding?: boolean }>) => {
      if (action.payload.token && action.payload.user) {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      }
      if (action.payload.hasCompletedOnboarding !== undefined) {
        state.hasCompletedOnboarding = action.payload.hasCompletedOnboarding;
      }
    },
    completeOnboarding: (state) => {
      state.hasCompletedOnboarding = true;
      AsyncStorage.setItem('hasCompletedOnboarding', 'true');
    },
    resetOnboarding: (state) => {
      state.hasCompletedOnboarding = false;
      AsyncStorage.removeItem('hasCompletedOnboarding');
    },
    setOnboardingStatus: (state, action: PayloadAction<boolean>) => {
      state.hasCompletedOnboarding = action.payload;
      if (action.payload) {
        AsyncStorage.setItem('hasCompletedOnboarding', 'true');
      } else {
        AsyncStorage.removeItem('hasCompletedOnboarding');
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { 
  logout, 
  clearError, 
  setCredentials, 
  clearCredentials, 
  updateUser,
  setUser,
  initializeAuth,
  completeOnboarding, 
  resetOnboarding,
  setOnboardingStatus,
  setLoading,
} = authSlice.actions;

export default authSlice.reducer;