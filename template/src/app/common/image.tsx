import { router, useGlobalSearchParams } from "expo-router";
import React, { useRef } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PinchGestureHandler,
  TapGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import tw from "@/src/lib/tailwind";
import { SvgXml } from "react-native-svg";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const AnimatedImage = Animated.createAnimatedComponent(Animated.Image);

const clamp = (value: number, min: number, max: number) => {
  "worklet";
  return Math.min(Math.max(value, min), max);
};

const ImageModal = () => {
  const { url }: { url?: string } = useGlobalSearchParams();

  console.log(url);

  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const pinchRef = useRef(null);
  const panRef = useRef(null);
  const doubleTapRef = useRef(null);

  const pinchHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startScale = scale.value;
    },
    onActive: (event, ctx: any) => {
      scale.value = clamp(ctx.startScale * event.scale, 0.8, 4);
    },
    onEnd: () => {
      if (scale.value < 1) scale.value = withTiming(1);
      if (scale.value > 4) scale.value = withTiming(4);

      // Adjust translation after pinch to stay in bounds
      const maxX = (SCREEN_WIDTH * scale.value - SCREEN_WIDTH) / 2;
      const maxY = (SCREEN_HEIGHT * scale.value - SCREEN_HEIGHT) / 2;

      translateX.value = withTiming(clamp(translateX.value, -maxX, maxX));
      translateY.value = withTiming(clamp(translateY.value, -maxY, maxY));
    },
  });

  const panHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx: any) => {
      const maxX = (SCREEN_WIDTH * scale.value - SCREEN_WIDTH) / 2;
      const maxY = (SCREEN_HEIGHT * scale.value - SCREEN_HEIGHT) / 2;

      translateX.value = clamp(ctx.startX + event.translationX, -maxX, maxX);
      translateY.value = clamp(ctx.startY + event.translationY, -maxY, maxY);
    },
    onEnd: () => {
      const maxX = (SCREEN_WIDTH * scale.value - SCREEN_WIDTH) / 2;
      const maxY = (SCREEN_HEIGHT * scale.value - SCREEN_HEIGHT) / 2;

      translateX.value = withSpring(clamp(translateX.value, -maxX, maxX));
      translateY.value = withSpring(clamp(translateY.value, -maxY, maxY));
    },
  });

  const doubleTapHandler = useAnimatedGestureHandler({
    onActive: () => {
      if (scale.value > 1.5) {
        scale.value = withTiming(1);
        translateX.value = withTiming(0);
        translateY.value = withTiming(0);
      } else {
        scale.value = withTiming(2);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <GestureHandlerRootView style={styles.flex}>
      {/* Close Button */}
      <TouchableOpacity
        onPress={() => router.dismiss()}
        style={tw`flex-row items-center gap-3 absolute bottom-4 right-4 z-50`}
      >
        <View
          style={[
            tw`bg-[#3D3D3D] w-12 h-12 justify-center items-center rounded-full `,
          ]}
        >
          <SvgXml
            xml={`<svg width="12" height="18" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.477124 9.99984L9.69575 18L12 16.0003L3.9335 9L12 1.99969L9.69575 0L0.477124 8.00016C0.171621 8.26536 0 8.625 0 9C0 9.375 0.171621 9.73464 0.477124 9.99984Z" fill="white"/>
</svg>



`}
          />
        </View>
      </TouchableOpacity>

      {/* Gesture Handlers */}
      <PanGestureHandler
        onGestureEvent={panHandler}
        minPointers={1}
        maxPointers={2}
        ref={panRef}
      >
        <Animated.View style={styles.flex}>
          <PinchGestureHandler
            onGestureEvent={pinchHandler}
            ref={pinchRef}
            simultaneousHandlers={[panRef, doubleTapRef]}
          >
            <Animated.View style={styles.flex}>
              <TapGestureHandler
                onGestureEvent={doubleTapHandler}
                numberOfTaps={2}
                ref={doubleTapRef}
                maxDelayMs={300}
              >
                <Animated.View style={styles.imageWrapper}>
                  {url ? (
                    <AnimatedImage
                      source={{ uri: url }}
                      style={[styles.image, animatedStyle]}
                      resizeMode="contain"
                    />
                  ) : (
                    <View style={styles.placeholder}>
                      <Text style={tw`text-white`}>No image URL provided</Text>
                    </View>
                  )}
                </Animated.View>
              </TapGestureHandler>
            </Animated.View>
          </PinchGestureHandler>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: tw.color("base") },
  closeRow: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
  },
  imageWrapper: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: { width: "100%", height: "100%", backgroundColor: "transparent" },
  placeholder: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ImageModal;
