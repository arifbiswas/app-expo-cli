import * as Yup from "yup";

import { Image, Text, TouchableOpacity, View } from "react-native";

import { Icon } from "@/assets/icon";
import { ImageAssets } from "@/assets/images";
import BackButton from "@/src/lib/backHeader/BackButton";
import TButton from "@/src/lib/buttons/TButton";
import CheckBox from "@/src/lib/inputs/CheckBox";
import InputText from "@/src/lib/inputs/InputText";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import { Formik } from "formik";
import React from "react";
import { SvgXml } from "react-native-svg";

const Register = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordTwo, setShowPasswordTwo] = React.useState(false);

  const [checked, setChecked] = React.useState(false);

  // const [register, { isLoading }] = useSignUpMutation();

  const handleRegister = async (values: any) => {
    try {
      // delete values?.confirmPassword;
      // create new data without confirm password
      const sendData = {
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
        name: values.name,
      };
      // const res = await register(sendData).unwrap();
      // if (res?.success) {
      // }
      console.log(sendData);
      router.push(`/auth/opt_verify?email=${values.email}&account=true`);
    } catch (error: any) {
      // console.log(error);
      router.push(`/modals/toaster?content=${error?.message}&time=4000`);
    }
  };

  // Define validation schema using Yup
  const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(6, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required"),
    confirmPassword: Yup.string()
      .min(6, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required")
      .oneOf([Yup.ref("password")], "Passwords do not match"),
    //   show match password to confirm password

    name: Yup.string().required("Fullname is required"),
  });

  return (
    <View>
      <BackButton
        onPress={() => router.dismiss()}
        containerStyle={tw`absolute top-0`}
      />
      <View style={tw`flex-1 items-center justify-center p-5`}>
        <View style={tw`justify-center items-center  gap-2`}>
          {/*============= If you want to show logo then you can add here========= */}
          <Image
            source={ImageAssets.logo}
            style={tw`h-28 aspect-square `}
            resizeMode="contain"
          />
          <View style={tw`items-center justify-center gap-1`}>
            <Text
              style={tw`text-white font-InterSemiBold text-2xl -tracking-[1px]`}
            >
              Create a new account
            </Text>
            <Text
              style={tw`text-white text-base font-InterRegular -tracking-[1px]`}
            >
              Please input your details to sign up
            </Text>
          </View>
        </View>

        {/* Formik Wrapper */}
        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
            name: "",
          }}
          validationSchema={loginValidationSchema}
          onSubmit={handleRegister}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
            setFieldValue,
          }) => (
            <View style={tw`w-full py-8 gap-6`}>
              <View style={tw`gap-3`}>
                <InputText
                  // === Place icons here ===
                  svgFirstIcon={Icon.user}
                  textInputProps={{
                    placeholder: "Your Full Name",
                    placeholderTextColor: "#A9A9A9",
                  }}
                  value={values.name}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  touched={touched.name}
                  errorText={errors.name}
                />

                <InputText
                  // === Place icons here ===
                  // svgFirstIcon={Icon.email}
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

                <InputText
                  // === Place icons here ===
                  svgFirstIcon={Icon.lock}
                  textInputProps={{
                    placeholder: "Password",
                    placeholderTextColor: "#A9A9A9",
                    secureTextEntry: !showPassword,
                  }}
                  // Place svg for eye icon to show/hide password
                  svgSecondIcon={!showPassword ? Icon.eyeOff : Icon.eye}
                  svgSecondOnPress={() => setShowPassword(!showPassword)}
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  touched={touched.password}
                  errorText={errors.password}
                />
                <InputText
                  // === Place icons here ===
                  svgFirstIcon={Icon.lock}
                  textInputProps={{
                    placeholder: "Confirm Password",
                    placeholderTextColor: "#A9A9A9",
                    secureTextEntry: !showPasswordTwo,
                  }}
                  // Place svg for eye icon to show/hide password
                  // svgSecondIcon={!showPasswordTwo ? Icon.eyeOff : Icon.eye}
                  svgSecondOnPress={() => setShowPasswordTwo(!showPasswordTwo)}
                  value={values.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  touched={touched.confirmPassword}
                  errorText={errors.confirmPassword}
                />
              </View>

              <View style={tw`flex-row justify-between items-center`}>
                <View style={tw`flex-row items-center`}>
                  <CheckBox
                    checked={checked}
                    onPress={() => setChecked(!checked)}
                    containerStyle={tw`items-center flex-1`}
                    titleComponent={
                      <View style={tw` flex-row items-center gap-1`}>
                        <Text
                          style={tw`text-white font-InterRegular text-[13px]`}
                        >
                          Agree to
                        </Text>
                        <Text
                          onPress={() =>
                            router.push("/settings/terms_and_conditions")
                          }
                          style={tw`text-blue-500 underline font-InterRegular text-[13px]`}
                        >
                          Terms & conditions
                        </Text>
                        <Text
                          style={tw`text-white font-InterRegular text-[13px]`}
                        >
                          and
                        </Text>
                        <Text
                          onPress={() =>
                            router.push("/settings/privacy_policy")
                          }
                          style={tw` text-blue-500 underline font-InterRegular text-[13px]`}
                        >
                          Privacy policy
                        </Text>
                        <Text
                          style={tw`text-white font-InterRegular text-[13px]`}
                        >
                          .
                        </Text>
                      </View>
                    }
                  />
                </View>
              </View>

              {/* Submit button calls handleSubmit from Formik */}
              <TButton
                //  If you connect API then you can add loading here
                // isLoading={isLoading}
                title="Sign Up"
                onPress={() => {
                  handleSubmit();
                  // router.push("/auth/opt_verify");
                }}
                disabled={!isValid || !checked}
              />

              {/* =========== IF need social login button then you can add here ======= */}
              {/* <Or title="Or continue with" />
                <View style={tw`flex-row justify-center items-center gap-5`}>
                  <TouchableOpacity
                    onPress={handleLoginWithGoogle}
                    style={tw`w-16 h-16 rounded-full bg-[#3D3D3D] items-center justify-center`}
                  >
                    <SvgXml xml={Icon.google} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={tw`w-16 h-16 rounded-full bg-[#3D3D3D] items-center justify-center`}
                  >
                    <SvgXml xml={Icon.apple} />
                  </TouchableOpacity>
                </View> */}

              <View style={tw`flex-row justify-center mt-6`}>
                <Text style={tw`text-white`}>Already have an account?</Text>
                <TouchableOpacity
                  onPress={() => {
                    router.replace("/auth");
                  }}
                  style={tw`flex-row items-center gap-3`}
                >
                  <Text style={tw`text-[#339DFF] underline ml-1`}>Sign In</Text>
                  <SvgXml xml={Icon.play} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
        {/* End of Formik Wrapper */}
      </View>
    </View>
  );
};

export default Register;
