// app/_layout.tsx
import { Stack } from "expo-router";
import "../../global.css";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { Provider } from "react-redux";
import { store, persistor } from '@/store';
import { PersistGate } from 'redux-persist/integration/react';
import { View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAppDispatch, useAuth } from "@/store/slices/hooks";
import { initializeAuthState } from "@/store/slices/redux/initializeAuth";

// Inner component that uses Redux hooks
function LayoutContent() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading, hasCompletedOnboarding } = useAuth();

  useEffect(() => {
    // Initialize auth state when app starts
    store.dispatch(initializeAuthState() as any);
  }, []);

  if (isLoading) {
    return <LoadingScreen message="Checking authentication..." />;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Stack>
        {/* Authenticated Routes */}
        <Stack.Protected guard={isAuthenticated}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack.Protected>

        {/* Unauthenticated Routes (After Onboarding) */}
        <Stack.Protected guard={!isAuthenticated && hasCompletedOnboarding}>
          <Stack.Screen
            name="sign-in"
            options={{
              headerShown: false,
              animation: 'fade',
              gestureEnabled: false
            }}
          />
          <Stack.Screen
            name="create-account"
            options={{
              headerShown: false,
              animation: 'slide_from_right',
              gestureEnabled: false
            }}
          />
        </Stack.Protected>

        {/* Onboarding Flow */}
        <Stack.Protected guard={!hasCompletedOnboarding}>
          <Stack.Screen
            name="onboarding"
            options={{
              headerShown: false,
              gestureEnabled: false
            }}
          />
        </Stack.Protected>
      </Stack>
    </SafeAreaProvider>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
          </View>
        }
        persistor={persistor}
      >
        <LayoutContent />
      </PersistGate>
    </Provider>
  );
}