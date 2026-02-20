import { Image, Text, View } from "react-native";
import { router, useGlobalSearchParams } from "expo-router";

import AppBgWrapper from "@/src/components/common/AppBgWrapper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ImageAssets } from "@/assets/images/image";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { OtpInput } from "react-native-otp-entry";
import React from "react";
import TButton from "@/src/lib/buttons/TButton";
import tw from "@/src/lib/tailwind";
import { useEmailVerifyMutation } from "@/src/redux/apiSlices/authSlices";

const Otp_verify = () => {
  // Define validation schema using Yup

  const [Otp, setOtp] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [emailVerify, { isLoading }] = useEmailVerifyMutation();

  const params = useGlobalSearchParams();

  console.log(params);

  const handleVerify = async (value: any) => {
    try {
      const verifyInfo = {
        email: params?.email,
        code: value,
      };

      console.log(verifyInfo);
      const res = await emailVerify(verifyInfo).unwrap();
      if (res?.success) {
        if (params?.forgot) {
          router?.push(`/auth/reset_pass?email=${params?.email}`);
        } else if (params?.account) {
          console.log(res);
          await AsyncStorage.setItem("token", res?.data?.token);
          router?.replace(`/auth/location_access`);
        } else {
          router?.push(`/auth`);
        }
      } else {
        router.push(`/modals/toaster?content=${res?.message}`);
      }
    } catch (error: any) {
      router.push(`/modals/toaster?content=${error?.message}`);
    }
  };

  React.useLayoutEffect(() => {
    if (params?.email) {
      setEmail(params?.email as any);
    }
  }, [params?.email]);

  return (
    <AppBgWrapper>
      <KeyboardAwareScrollView
        style={tw`z-10 flex-1`}
        contentContainerStyle={tw`items-center justify-center flex-1`}
      >
        <View style={tw`z-10 flex-1 items-center justify-center gap-8  p-5 `}>
          <View style={tw`justify-center items-center  gap-2`}>
            <Image
              source={ImageAssets.logo}
              style={tw`h-30 aspect-square mb-5`}
              resizeMode="contain"
            />
            <View style={tw`items-center justify-center gap-2`}>
              <Text
                style={tw`text-white font-InterSemiBold text-2xl -tracking-[1px]`}
              >
                Enter OTP
              </Text>
              <Text
                style={tw`text-white text-base text-center font-InterRegular -tracking-[1px]`}
              >
                We’ve sent you a 4 digit OTP to {`\n`}{" "}
                {(email as any)?.split("@")[0]?.slice(0, 3) +
                  "****@" +
                  (email as any)?.split("@")[1]}
              </Text>
            </View>
          </View>

          <View style={tw` w-full items-center `}>
            <View style={tw` w-full items-center`}>
              {/* OTP Fields */}
              <View style={tw` mb-4`}>
                <OtpInput
                  numberOfDigits={4}
                  focusColor={tw.color("primary")}
                  autoFocus={false}
                  hideStick={true}
                  placeholder="-"
                  blurOnFilled={true}
                  disabled={false}
                  type="numeric"
                  secureTextEntry={false}
                  focusStickBlinkingDuration={500}
                  onTextChange={async (text) => {
                    // setValue(text);
                    setOtp(text);
                  }}
                  // onFocus={() => console.log("Focused")}
                  // onBlur={() => console.log("Blurred")}
                  // onTextChange={(text) => console.log(text)}
                  onFilled={async (text) => {
                    console.log(`OTP is ${text}`);
                    // router.push("/home/tabs");
                    handleVerify(text);
                  }}
                  textInputProps={{
                    accessibilityLabel: "One-Time Password",
                  }}
                  theme={{
                    containerStyle: tw`rounded-full px-2 gap-2.5 mb-4`,
                    pinCodeContainerStyle: tw`h-20 w-20 justify-center border-0 items-center bg-secondary rounded-2xl `,
                    pinCodeTextStyle: tw`text-white text-2xl font-InterSemiBold `,
                    placeholderTextStyle: tw`text-white text-2xl font-InterSemiBold `,
                  }}
                />
              </View>
              {/* Verify Button */}
              <TButton
                isLoading={isLoading}
                title="Verify"
                onPress={() => {
                  // router.push("/auth/reset_pass");
                  handleVerify(Otp);
                }}
                containerStyle={tw`w-full`}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </AppBgWrapper>
  );
};

export default Otp_verify;
