import { View } from "react-native";
import { AppText } from "@/components/AppText";
import { Button } from "@/components/Button";
import { useAppDispatch } from "@/store/slices/hooks";
import { logout } from "@/store/slices/redux/authSlice";

export default function VipScreen() {
    const dispatch = useAppDispatch();
    const logOut = () => {
        // Dispatch log out action
        dispatch(logout());
    };
    return (
        <View className="justify-center flex-1 p-4">
            <AppText center size="heading">
                Profile Screen
            </AppText>

            <Button title="Sign out" onPress={logOut} />
        </View>
    );
}
