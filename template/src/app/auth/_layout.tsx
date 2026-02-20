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
      <Stack.Screen
        name="index"
        options={{
          statusBarStyle: "light",
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          statusBarStyle: "light",
        }}
      />

      <Stack.Screen
        name="change_pass"
        options={{
          statusBarStyle: "light",
        }}
      />
      <Stack.Screen
        name="change_pass_modal"
        options={{
          presentation: "transparentModal",
        }}
      />
    </Stack>
  );
}
