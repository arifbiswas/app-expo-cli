import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { Stack } from "expo-router";
import store from "../redux/store";
import tw from "../lib/tailwind";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function RootLayout() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <Stack
          screenOptions={{
            headerShown: false,
            statusBarStyle: "light",
            contentStyle: tw`bg-base`,
          }}
        >
          <Stack.Screen name="index" options={{}} />
          <Stack.Screen name="auth" />
          <Stack.Screen name="home" />
          <Stack.Screen name="settings" />
          <Stack.Screen name="common/image" />

          {/*=========================== Modals  Start ============== */}

          <Stack.Screen
            name="modals/toaster"
            options={{
              presentation: "formSheet",
              sheetAllowedDetents: "fitToContents",
              contentStyle: tw`bg-base `,
            }}
          />

          <Stack.Screen
            name="modals/confirmation_logout_modal"
            options={{
              presentation: "containedTransparentModal",
              animation: "fade_from_bottom",
              contentStyle: tw`bg-base`,
            }}
          />

          <Stack.Screen
            name="modals/success_modal"
            options={{
              presentation: "transparentModal",
              animation: "fade_from_bottom",
            }}
          />

          {/*=========================== Modals End ============== */}
        </Stack>
      </GestureHandlerRootView>
    </Provider>
  );
}
