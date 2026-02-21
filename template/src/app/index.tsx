import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";

import { ActivityIndicator, Image, Pressable, View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

import { ImageAssets } from "@/assets/images";
import { router } from "expo-router";
import tw from "../lib/tailwind";

// Import tw from twrnc

SplashScreen.preventAutoHideAsync();
const Splash = () => {
  // =============== If you setup you custom font then add here and in assets/fonts folder =================
  const [fontsLoaded] = Font.useFonts({
    InterBlack: require("@/assets/fonts/Inter_18pt-Black.ttf"),
    InterBlackItalic: require("@/assets/fonts/Inter_18pt-BlackItalic.ttf"),
  });

  // const [tokenChecker] = useTokenCheckMutation();

  const handleTokenChecker = React.useCallback(async () => {
    //  ========= API CALL PLACEHOLDER FOR TOKEN CHECKER =========

    // const response = await tokenChecker({}).unwrap();
    // console.log(response);
    // if (response?.data?.isVerified) {
    // console.log(response);
    // SplashScreen.hideAsync();
    // router.replace("/home/tabs");
    // router.replace("/auth/location_access");
    // router.replace("/auth");
    // } else {
    //   SplashScreen.hideAsync();
    //   router.replace("/auth");
    // }

    //  === NORMAL LOGIC ===
    SplashScreen.hideAsync();
    router.replace("/auth");
  }, []);

  React.useEffect(() => {
    if (fontsLoaded) {
      handleTokenChecker();
    }
  }, [handleTokenChecker, fontsLoaded]);

  return (
    <Pressable
      style={tw`flex-1 z-2   w-full  overflow-hidden justify-center items-center`}
      onPress={() => {}}
    >
      <Animated.View
        entering={FadeInUp.duration(1000)}
        exiting={FadeInDown.duration(1000)}
        style={tw``}
      >
        <Image
          style={tw`h-45 w-45 mb-[20%]`}
          resizeMode="contain"
          source={ImageAssets.logo}
        />
      </Animated.View>
      <View style={tw`absolute bottom-[15%] left-[45%]`}>
        <ActivityIndicator size="large" color={tw.color("white")} />
      </View>
    </Pressable>
  );
};

export default Splash;
