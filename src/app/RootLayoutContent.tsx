// app/RootLayoutContent.tsx
import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { useAppDispatch, useAuth } from "@/store/slices/hooks";
// import { checkAuthStatus } from "@/store/slices/redux/authSlice"; // If you're using this

// Change from named export to default export
export default function RootLayoutContent() {
    const dispatch = useAppDispatch();
    const { isAuthenticated, isLoading, hasCompletedOnboarding } = useAuth();

    // Load initial auth state on component mount
    useEffect(() => {
        // If you're using the checkAuthStatus thunk, dispatch it here
        // dispatch(checkAuthStatus());

        // Or if you're handling it manually, you can dispatch actions to set initial state
        // based on what's in AsyncStorage
    }, [dispatch]);

    // Show loading screen while checking authentication state
    if (isLoading) {
        return <LoadingScreen message="Checking authentication..." />;
    }

    return (
        <React.Fragment>
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
        </React.Fragment>
    );
}