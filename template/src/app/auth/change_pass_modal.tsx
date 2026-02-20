import { router, useGlobalSearchParams } from "expo-router";
import { Platform, Pressable, Text, View } from "react-native";

import { Icon } from "@/assets/icons/Icon";
import TButton from "@/src/lib/buttons/TButton";
import tw from "@/src/lib/tailwind";
import { BlurView } from "expo-blur";
import React from "react";
import { SvgXml } from "react-native-svg";

const Change_pass_modal = () => {
  const params = useGlobalSearchParams();
  // ?title='You’re All Set!'&subtitle='Your password has been changed successfully!'&buttonTitle='Back to login'&route='/auth
  const { title, subtitle, buttonTitle, route }: any = params;
  const CommonContent = () => {
    return (
      <View style={tw`items-center gap-5 w-full`}>
        <SvgXml xml={Icon.check} />

        <View style={tw`gap-2 w-full items-center`}>
          <Text style={tw`text-white text-xl font-semibold text-center`}>
            {title || "You’re All Set!"}
          </Text>
          <Text style={tw`text-gray-400 text-sm font-semibold text-center`}>
            {subtitle || "Your password has been changed successfully!"}
          </Text>
        </View>

        <TButton
          containerStyle={tw`w-4/5  mt-3 self-center`}
          onPress={() => {
            router?.dismiss();
            // router.push("/profile_setup");
            if (route as string) {
              router.push(route as any);
            } else {
              router?.dismiss();
            }
          }}
          title={buttonTitle || "Back to login"}
        />
      </View>
    );
  };

  return (
    <Pressable
      onPress={() => {
        router.dismiss();
      }}
      style={tw`flex-1 bg-black/45 items-center justify-center`}
    >
      {Platform.OS === "ios" ? (
        <BlurView
          style={tw`w-[90%] h-[80]  rounded-xl overflow-hidden items-center justify-center p-4`}
          tint="dark"
          blurReductionFactor={5}
          intensity={100}
          experimentalBlurMethod="dimezisBlurView"
        >
          <CommonContent />
        </BlurView>
      ) : (
        <View
          style={tw`w-[90%] h-[80] bg-black/85 border border-secondary rounded-xl overflow-hidden items-center justify-center p-4`}
        >
          <CommonContent />
        </View>
      )}
    </Pressable>
  );
};

export default Change_pass_modal;
