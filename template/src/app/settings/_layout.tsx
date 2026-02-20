import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="about_us" />
      <Stack.Screen name="terms_and_conditions" />
      <Stack.Screen name="privacy_policy" />
    </Stack>
  );
}
