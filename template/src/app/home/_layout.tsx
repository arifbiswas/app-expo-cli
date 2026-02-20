import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function RootLayout() {
  // const { top, bottom } = useSafeAreaInsets();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        // statusBarAnimation: "fade",
        statusBarStyle: "light",
      }}
    >
      <Stack.Screen name="tabs" options={{}} />
      <Stack.Screen name="other_user" options={{}} />
      <Stack.Screen name="post_vibe" options={{}} />
      <Stack.Screen name="post_music" options={{}} />
      <Stack.Screen name="post_podcast" options={{}} />
      <Stack.Screen name="create_mood" options={{}} />
      <Stack.Screen name="view_post" options={{}} />
      <Stack.Screen name="report" options={{}} />
      <Stack.Screen name="report_details" options={{}} />
      <Stack.Screen name="appeal" options={{}} />
    </Stack>
  );
}
