import { View } from "react-native";
import { AppText } from "@/components/AppText";
import { Button } from "@/components/Button";
import { useAppDispatch } from "@/store/slices/hooks";
import { completeOnboarding } from "@/store/slices/redux/authSlice";
// import { useAuthState } from "@/utils/authStore";

export default function OnboardingFinalScreen() {
  const dispatch = useAppDispatch();
  const completeOnboardingHandler = () => {
    dispatch(completeOnboarding());
  }
  return (
    <View className="justify-center flex-1 p-4">
      <AppText center size="heading">
        Onboarding Screen 2
      </AppText>
      <Button title="Complete onboarding" onPress={completeOnboardingHandler} />
    </View>
  );
}
