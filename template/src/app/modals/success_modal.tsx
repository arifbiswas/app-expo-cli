import { router, useGlobalSearchParams } from "expo-router";
import { Pressable, Text, View } from "react-native";

import TButton from "@/src/lib/buttons/TButton";
import tw from "@/src/lib/tailwind";
import React from "react";

const Success_modal = () => {
  const params = useGlobalSearchParams();
  // ?title='You’re All Set!'&subtitle='Your password has been changed successfully!'&buttonTitle='Back to login'&route='/auth
  // const { title, subtitle, buttonTitle, route }: any = params;

  return (
    <Pressable
      onPress={() => {
        router.dismiss();
      }}
      style={tw`flex-1 bg-black/45 items-center justify-center`}
    >
      <View
        style={tw`w-[90%]  bg-black/85 border border-secondary rounded-xl overflow-hidden items-center justify-center p-6 pb-8`}
      >
        <View style={tw`items-center gap-5 w-full`}>
          {/* <SvgXml width={80} height={80} xml={Icon.check2} /> */}

          <View style={tw`gap-2 w-full items-center`}>
            <Text style={tw`text-white text-2xl font-semibold text-center`}>
              {params?.message || "Email sent successfully"}
            </Text>
          </View>

          <TButton
            containerStyle={tw`w-full  mt-3 h-13 self-center `}
            gradinLayoutStyle={tw`rounded-xl`}
            onPress={() => {
              router?.dismiss();
              // router.push("/home/tabs/account");
              if (params?.route as string) {
                router.push(params?.route as any);
              } else {
                router?.dismiss();
              }
            }}
            title={(params?.b_text as string) || "Done"}
          />
        </View>
      </View>
    </Pressable>
  );
};

export default Success_modal;
