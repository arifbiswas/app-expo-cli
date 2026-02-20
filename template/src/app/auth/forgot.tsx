import * as Yup from "yup";

import { Image, Text, View } from "react-native";

import AppBgWrapper from "@/src/components/common/AppBgWrapper";
import BackButton from "@/src/lib/backHeader/BackButton";
import { Formik } from "formik";
import { Icon } from "@/assets/icons/Icon";
import { ImageAssets } from "@/assets/images/image";
import InputText from "@/src/lib/inputs/InputText";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import React from "react";
import TButton from "@/src/lib/buttons/TButton";
import { router } from "expo-router";
import tw from "@/src/lib/tailwind";
import { useForgotMutation } from "@/src/redux/apiSlices/authSlices";

const Forgot = () => {
  const [forgot, { isLoading }] = useForgotMutation();

  const handleForgot = async (values: any) => {
    try {
      const res = await forgot(values).unwrap();
      if (res?.success) {
        router.push(`/modals/toaster?content=${res?.message}`);
        router.replace(`/auth/opt_verify?email=${values.email}&forgot=true`);
      } else {
        router.push(`/modals/toaster?content=${res?.message}`);
      }
    } catch (error: any) {
      router.push(`/modals/toaster?content=${error?.message}`);
    }
  };

  // Define validation schema using Yup
  const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
  });

  return (
    <AppBgWrapper>
      <BackButton
        onPress={() => router.dismiss()}
        containerStyle={tw`absolute top-5`}
      />
      <KeyboardAwareScrollView
        style={tw`z-10 flex-1`}
        contentContainerStyle={tw`items-center justify-center flex-1`}
      >
        <View style={tw`z-10 flex-1 items-center justify-center  p-5`}>
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
                Forgot password ?
              </Text>
              <Text
                style={tw`text-white text-base text-center font-InterRegular -tracking-[1px]`}
              >
                Enter the email address that you used to create your account. We
                will send an OTP to reset your password.
              </Text>
            </View>
          </View>

          {/* Formik Wrapper */}
          <Formik
            initialValues={{ email: "" }}
            validationSchema={loginValidationSchema}
            onSubmit={handleForgot}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isValid,
            }) => (
              <View style={tw`w-full py-8 gap-6`}>
                <View style={tw`gap-3`}>
                  <InputText
                    svgFirstIcon={Icon.email}
                    textInputProps={{
                      placeholder: "Email",
                      placeholderTextColor: "#A9A9A9",
                    }}
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    touched={touched.email}
                    errorText={errors.email}
                  />
                </View>

                {/* Submit button calls handleSubmit from Formik */}
                <TButton
                  title="Get OTP"
                  isLoading={isLoading}
                  onPress={() => {
                    handleSubmit();
                    // router.push("/auth/opt_verify");
                  }}
                  disabled={!isValid}
                />
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAwareScrollView>
    </AppBgWrapper>
  );
};

export default Forgot;
