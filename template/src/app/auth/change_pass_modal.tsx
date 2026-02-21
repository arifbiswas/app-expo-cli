import { router, useGlobalSearchParams } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { Icon } from "@/assets/icon";
import TButton from "@/src/lib/buttons/TButton";
import tw from "@/src/lib/tailwind";

const Change_pass_modal = () => {
  const params = useGlobalSearchParams();
  // ?title='You’re All Set!'&subtitle='Your password has been changed successfully!'&buttonTitle='Back to login'&route='/auth
  const { title, subtitle, buttonTitle, route }: any = params;

  return (
    <Pressable
      onPress={() => {
        router.dismiss();
      }}
      style={tw`flex-1 bg-black/45 items-center justify-center`}
    >
      <View
        style={tw`w-[90%] h-[80] bg-black/85 border border-secondary rounded-xl overflow-hidden items-center justify-center p-4`}
      >
        <View style={tw`items-center gap-5 w-full`}>
          {/* for you custom icons use SvgXml */}
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
      </View>
    </Pressable>
  );
};

export default Change_pass_modal;
