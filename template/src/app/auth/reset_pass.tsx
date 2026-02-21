import * as Yup from "yup";

import { router, useGlobalSearchParams } from "expo-router";
import { Image, Text, View } from "react-native";

import { Icon } from "@/assets/icon";
import { ImageAssets } from "@/assets/images";
import BackButton from "@/src/lib/backHeader/BackButton";
import TButton from "@/src/lib/buttons/TButton";
import InputText from "@/src/lib/inputs/InputText";
import tw from "@/src/lib/tailwind";
import { Formik } from "formik";
import React from "react";

const Rest_pass = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordTwo, setShowPasswordTwo] = React.useState(false);
  // const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const { email } = useGlobalSearchParams();
  const handleResetPassword = async (values: any) => {
    try {
      values.email = email;

      // const res = await resetPassword(values).unwrap();
      // if (res?.success) {
      router.push(
        "/auth/change_pass_modal?title=You’re All Set!&subtitle=Your password has been changed successfully!&buttonTitle=Back to login&route=/auth",
      );
      // } else {
      // router.push(`/modals/toaster?content=${res?.message}`);
      // }
    } catch (error: any) {
      router.push(`/modals/toaster?content=${error?.message}`);
    }
  };

  // Define validation schema using Yup
  const loginValidationSchema = Yup.object().shape({
    new_password: Yup.string()
      .min(6, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required"),
    c_password: Yup.string()
      .min(6, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required")
      .oneOf([Yup.ref("new_password")], "Passwords do not match"),
    //   show match password to confirm password
  });

  return (
    <View style={tw`flex-1`}>
      <BackButton
        onPress={() => router.dismiss()}
        containerStyle={tw`absolute top-5`}
      />

      <View style={tw`z-10 flex-1 items-center justify-center  p-5`}>
        <View style={tw`justify-center items-center  gap-2`}>
          {/* IF want to add logo here */}
          <Image
            source={ImageAssets.logo}
            style={tw`h-30 aspect-square mb-5`}
            resizeMode="contain"
          />
          <View style={tw`items-center justify-center gap-2`}>
            <Text
              style={tw`text-white font-InterSemiBold text-2xl -tracking-[1px]`}
            >
              Reset Password
            </Text>
            <Text
              style={tw`text-white text-base text-center font-InterRegular -tracking-[1px]`}
            >
              Enter a new password for your account
            </Text>
          </View>
        </View>

        {/* Formik Wrapper */}
        <Formik
          initialValues={{ new_password: "", c_password: "" }}
          validationSchema={loginValidationSchema}
          onSubmit={handleResetPassword}
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
                  // === Place icons here ===
                  svgFirstIcon={Icon.lock}
                  textInputProps={{
                    placeholder: "New Password",
                    placeholderTextColor: "#A9A9A9",
                    secureTextEntry: !showPassword,
                  }}
                  // === Place icons here ===
                  svgSecondIcon={showPassword ? Icon.eye : Icon.eyeOff}
                  svgSecondOnPress={() => setShowPassword(!showPassword)}
                  value={values.new_password}
                  onChangeText={handleChange("new_password")}
                  onBlur={handleBlur("new_password")}
                  touched={touched.new_password}
                  errorText={errors.new_password}
                />
                <InputText
                  // === Place icons here ===
                  svgFirstIcon={Icon.lock}
                  textInputProps={{
                    placeholder: "Confirm New Password",
                    placeholderTextColor: "#A9A9A9",
                    secureTextEntry: !showPasswordTwo,
                  }}
                  // === Place icons here ===
                  svgSecondIcon={showPasswordTwo ? Icon.eye : Icon.eyeOff}
                  svgSecondOnPress={() => setShowPasswordTwo(!showPasswordTwo)}
                  value={values.c_password}
                  onChangeText={handleChange("c_password")}
                  onBlur={handleBlur("c_password")}
                  touched={touched.c_password}
                  errorText={errors.c_password}
                />
              </View>

              {/* Submit button calls handleSubmit from Formik */}
              <TButton
                // If you connect API then you can add loading here
                // isLoading={isLoading}
                title="Change password"
                onPress={() => {
                  handleSubmit();
                }}
                disabled={!isValid}
              />
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default Rest_pass;
