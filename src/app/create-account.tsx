// app/create-account.tsx
import { View, ScrollView } from "react-native";
import { Link, Redirect } from "expo-router";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Alert } from "@/components/ui/Alert";
import { AppText } from "@/components/AppText";
import { useState } from "react";

export default function CreateAccountScreen() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });


    // if (!shouldCreateAccount) {
    //     console.log('shouldCreateAccount', shouldCreateAccount);
    //     return <Redirect href="/sign-in" />;
    // }

    const handleChange = (field: keyof typeof formData) => (value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        // if (error) {
        //     // clearError();
        //     console.log(error);
        // }
    };

    const handleRegister = async () => {
        if (formData.password !== formData.confirmPassword) {
            // You could set this error in the store or handle locally
            return;
        }

        try {
            // await registerUser(formData);
            // On successful registration, redirect to sign-in or auto-login
            // For now, just log the form data
            console.log('Registering user with data:', formData);
            // Redirect to sign-in page after successful registration
            // <Redirect href="/sign-in" />;
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    const isFormValid = formData.name && formData.email && formData.password && formData.confirmPassword;
    const passwordsMatch = formData.password === formData.confirmPassword;

    return (
        <ScrollView className="flex-1 bg-gray-50">
            <View className="flex-1 min-h-screen">
                {/* Header Section */}
                <View className="bg-white pt-16 pb-8 px-6 rounded-b-3xl shadow-sm">
                    <AppText center size="heading" className="text-7xl font-bold text-gray-900 mb-2">
                        Logo
                    </AppText>
                    <AppText center size="heading" className="text-3xl font-bold text-gray-900 mb-2">
                        Create Account
                    </AppText>
                    <AppText center size="large" className="text-gray-600 text-base">
                        Join our community today
                    </AppText>
                </View>

                {/* Registration Form */}
                <View className="flex-1 px-1 pt-8">
                    <View className="bg-white rounded-lg p-6 border border-gray-200 mb-6">
                        <Input
                            label="Full Name"
                            value={formData.name}
                            onChangeText={handleChange('name')}
                            placeholder="Enter your full name"
                            autoComplete="name"
                            className="mb-4"
                        />

                        <Input
                            label="Email"
                            value={formData.email}
                            onChangeText={handleChange('email')}
                            placeholder="Enter your email"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            autoComplete="email"
                            className="mb-4"
                        />

                        <Input
                            label="Password"
                            value={formData.password}
                            onChangeText={handleChange('password')}
                            placeholder="Create a password"
                            secureTextEntry
                            autoComplete="password-new"
                            className="mb-4"
                        />

                        <Input
                            label="Confirm Password"
                            value={formData.confirmPassword}
                            onChangeText={handleChange('confirmPassword')}
                            placeholder="Confirm your password"
                            secureTextEntry
                            autoComplete="password-new"
                            error={!passwordsMatch && formData.confirmPassword ? "Passwords don't match" : undefined}
                            className="mb-6"
                        />

                        {/* Register Button */}
                        <Button
                            title="Create Account"
                            onPress={handleRegister}
                            disabled={!isFormValid || !passwordsMatch}
                        />
                    </View>



                    {/* Sign Up Link */}
                    <View className="flex-column justify-center items-center my-4 pt-2">
                        <AppText className="text-gray-600">Already have an account?</AppText>
                        <Link href="/sign-in" asChild>
                            <Button title="Sign in" className="p-2 border-md border-dark" variant="tertiary"
                                size="sm" />
                        </Link>
                    </View>

                    {/* Additional Info */}
                    {/* <View className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <AppText size="large" className="text-blue-800 text-sm text-center">
                            By creating an account, you agree to our Terms of Service and Privacy Policy
                        </AppText>
                    </View> */}
                </View>
            </View>
        </ScrollView>
    );
}