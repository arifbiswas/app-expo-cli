import { router, useGlobalSearchParams } from "expo-router";
import { Pressable, Text, View } from "react-native";

import TButton from "@/src/lib/buttons/TButton";
import tw from "@/src/lib/tailwind";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ConfirmationModal = () => {
  const params = useGlobalSearchParams();

  const handleUnfollow = async () => {
    try {
      await AsyncStorage.removeItem("token");
      router.canDismiss() && router.dismissAll();
      router.replace("/auth");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Pressable
      onPress={() => {
        router.dismiss();
      }}
      style={tw`flex-1 bg-black/45 items-center justify-center`}
    >
      <View
        style={tw`w-[90%] bg-black/85 border border-secondary rounded-xl overflow-hidden items-center justify-center p-4`}
      >
        <View style={tw`items-center gap-5 w-full py-4`}>
          {/* <Text style={tw`text-white text-xl font-InterBold text-center`}>
          {subject || "subject"}
        </Text> */}
          {/* <SvgXml xml={Icon.unfriend} width={80} height={80} /> */}

          <View style={tw`gap-2 w-full items-center`}>
            <Text style={tw`text-white text-2xl font-InterBold text-center`}>
              Are you sure ?
            </Text>
            <Text
              style={tw`text-gray-400 text-xs font-InterRegular text-center `}
            >
              If want you to logout from the app. {"\n"} then press sure!
              otherwise press cancel
            </Text>
          </View>

          <View style={tw`flex-row gap-3`}>
            <TButton
              offGradient
              containerStyle={tw`w-[45%]  self-center bg-black border border-secondary rounded-xl h-13`}
              titleStyle={tw`text-sm font-InterSemiBold`}
              onPress={() => {
                router?.dismiss();
              }}
              title={"Cancel"}
            />
            <TButton
              containerStyle={tw`w-[45%]   self-center h-13`}
              titleStyle={tw`text-sm font-InterSemiBold`}
              gradinLayoutStyle={tw`rounded-xl`}
              onPress={() => {
                router?.dismiss();
                // router.push("/profile_setup");
                // route && router.push(route);
                handleUnfollow();
              }}
              title={"Sure"}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ConfirmationModal;
