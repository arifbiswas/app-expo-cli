import { _HIGHT, _WIDTH } from "@/src/utils/utils";
import { router, useGlobalSearchParams } from "expo-router";
import { Alert, View } from "react-native";

import ModalHeader from "@/src/components/ModalHeader";
import tw from "@/src/lib/tailwind";
import React from "react";
import { WebView } from "react-native-webview";

const userAgent =
  "Mozilla/5.0 (Linux; Android 10; SM-G975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36";

// --- This JavaScript will try to force the loaded website's background to black ---
// This is useful if the website itself doesn't have a dark mode.

// --- Main Purchase Screen Component ---
const PurchaseScreen = () => {
  const [data, setData] = React.useState<any>(null);

  const handlePurchase = (values: any) => {
    // console.log("Payment Details:", values);
    Alert.alert("Payment Successful", "Your plan has been purchased.");
    router.dismiss();
  };

  const param = useGlobalSearchParams();

  React.useLayoutEffect(() => {
    try {
      const parsedData = JSON?.parse(
        Array.isArray(param.data) ? param.data[0] : param.data || "{}"
      );
      setData(parsedData);
    } catch (e) {
      console.error("Failed to parse data:", e);
      setData({}); // Set to empty object on error
    }
  }, [param.data]);

  // console.log(data);

  return (
    <View style={tw`flex-1 bg-black/60 justify-end items-center w-full`}>
      <View
        style={[
          // Changed bg-base to bg-black to make the modal background dark
          tw`bg-black rounded-t-2xl`,
          {
            height: _HIGHT * 0.9,
            width: _WIDTH,
          },
        ]}
      >
        {/* Header */}
        <ModalHeader title="Payment" onPress={() => router.dismiss()} />
        {data?.session_url || data?.url ? (
          <WebView
            // Changed bg-base to bg-black and added flex-1
            // This makes the WebView's own background black and ensures it fills the space
            style={tw`bg-black flex-1`}
            source={
              param.type === "subscription"
                ? {
                    uri: data?.session_url,
                  }
                : {
                    uri: data?.url,
                  }
            }
            startInLoadingState={true}
            userAgent={userAgent}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            forceDarkOn={true} // You already had this, which is correct!
            // --- Injected JavaScript ---
            // This runs the code from `forceDarkJS` to force the website content
            // to have a black background, just in case forceDarkOn isn't enough.
            // injectedJavaScript={forceDarkJS}
            // Run this on the first load
            onMessage={() => {}} // Required for injectedJavaScript to run on first load
            directionalLockEnabled
            sharedCookiesEnabled={true}
            thirdPartyCookiesEnabled={true}
            originWhitelist={["*"]}
            onNavigationStateChange={(navState) => {
              if (navState.url.includes("success")) {
                handlePurchase(data);
              }
              if (navState.url.includes("cancel")) {
                router.dismiss();
              }
            }}
          />
        ) : (
          // Added a fallback view in case session_url is missing
          <View style={tw`flex-1 items-center justify-center bg-black`}>
            {/* You could put a loading spinner or error message here */}
          </View>
        )}
      </View>
    </View>
  );
};

export default PurchaseScreen;
