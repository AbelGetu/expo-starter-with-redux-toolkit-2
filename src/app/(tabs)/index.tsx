import { View } from "react-native";
import { AppText } from "@/components/AppText";
import { useAuth } from "@/store/slices/hooks";
import { SafeAreaView } from "react-native-safe-area-context";

export default function IndexScreen() {
  const { isAuthenticated, isLoading, hasCompletedOnboarding, user } = useAuth();
  // console.log('User in IndexScreen:', user);
  return (
    <SafeAreaView>
      <View className="px-2">
        {user && (
          <AppText center size="large" className="mt-4">
            Welcome, {user.full_name}
          </AppText>
        )}
      </View>
    </SafeAreaView>
  );
}
