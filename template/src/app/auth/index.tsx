import * as Yup from "yup";

import {
  useGoogleLoginMutation,
  useLoginMutation,
} from "@/src/redux/apiSlices/authSlices";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { Icon } from "@/assets/icons/Icon";
import { ImageAssets } from "@/assets/images/image";
import AppBgWrapper from "@/src/components/common/AppBgWrapper";
import IButton from "@/src/lib/buttons/IButton";
import Or from "@/src/lib/buttons/Or";
import TButton from "@/src/lib/buttons/TButton";
import CheckBox from "@/src/lib/inputs/CheckBox";
import InputText from "@/src/lib/inputs/InputText";
import tw from "@/src/lib/tailwind";
import { support } from "@/src/utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Formik } from "formik";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SvgXml } from "react-native-svg";

const Login = () => {
  const [loginInfo, setLoginInfo] = React.useState<null | {
    email: string;
    password: string;
  }>(null);
  const [check, setCheck] = React.useState(false);
  const [passShow, setPassShow] = React.useState(false);

  const [login, results] = useLoginMutation();
  const [loginWithGoogle, googleResults] = useGoogleLoginMutation();

  const handleLogin = async (values: any) => {
    try {
      if (check) {
        AsyncStorage.setItem("check", "true");
        AsyncStorage.setItem("loginInfo", JSON.stringify(values));
      } else {
        AsyncStorage.removeItem("check");
        AsyncStorage.removeItem("loginInfo");
      }
      const response = await login(values).unwrap();
      if (response?.success) {
        // console.log(response?.data);

        await AsyncStorage.setItem("token", response?.data?.token);
        router.replace("/auth/location_access");
      } else {
        router.push(`/modals/toaster?content=${response?.message}`);
      }
    } catch (error: any) {
      console.log(error);
      router.push(`/modals/toaster?content=${error?.message}`);
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      const response = await loginWithGoogle({}).unwrap();
      // console.log(response);
      if (response?.success) {
        // router.push("/home/tabs");
        router.push(`/auth/google_login?url=${`${response?.data}`}`);
      } else {
        router.push(`/modals/toaster?content=${response?.message}`);
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
    password: Yup.string()
      .min(6, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required"),
  });

  React.useEffect(() => {
    AsyncStorage.getItem("check").then((value) => {
      if (value === "true") {
        // console.log(value);
        setCheck(true);
      }
    });
    AsyncStorage.getItem("loginInfo").then((value) => {
      if (value) {
        // console.log(value);
        setLoginInfo(JSON.parse(value));
      }
    });
  }, []);

  return (
    <AppBgWrapper>
      <KeyboardAwareScrollView style={tw`z-10 `}>
        <View style={tw`flex-1 items-center justify-center p-5`}>
          <View style={tw`justify-center items-center mt-10 gap-2`}>
            <Image
              source={ImageAssets.logo}
              style={tw`h-18 aspect-square mb-5`}
              resizeMode="contain"
            />
            <View style={tw`items-center justify-center gap-2`}>
              <Text
                style={tw`text-white font-InterSemiBold text-2xl -tracking-[1px]`}
              >
                Welcome Back
              </Text>
              <Text
                style={tw`text-white text-base font-InterRegular -tracking-[1px]`}
              >
                Please use your credentials to sign in
              </Text>
            </View>
          </View>

          {/* Formik Wrapper */}
          <Formik
            initialValues={{
              email: loginInfo?.email || "",
              password: loginInfo?.password || "",
            }}
            enableReinitialize
            validationSchema={loginValidationSchema}
            onSubmit={handleLogin}
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

                  <InputText
                    svgFirstIcon={Icon.lock}
                    textInputProps={{
                      placeholder: "Password",
                      placeholderTextColor: "#A9A9A9",
                      secureTextEntry: !passShow,
                    }}
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    touched={touched.password}
                    errorText={errors.password}
                    svgSecondIcon={passShow ? Icon.eye : Icon.eyeOff}
                    svgSecondOnPress={() => setPassShow(!passShow)}
                  />
                </View>

                <View style={tw`flex-row justify-between items-center`}>
                  <View style={tw`flex-row items-center`}>
                    <CheckBox
                      checked={check}
                      onPress={() => setCheck(!check)}
                      title="Remember me"
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      router.push("/auth/forgot");
                    }}
                  >
                    <Text style={tw`text-[#339DFF] underline`}>
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Submit button calls handleSubmit from Formik */}
                <TButton
                  isLoading={results.isLoading}
                  title="Sign In"
                  onPress={() => {
                    handleSubmit();
                    // router.push("/home");
                  }}
                  disabled={!isValid}
                />

                <Or title="Or continue with" />
                <View style={tw`flex-row justify-center items-center gap-4`}>
                  <IButton
                    isLoading={googleResults.isLoading}
                    containerStyle={tw`w-16 h-16 bg-transparent  `}
                    svg={Icon.google}
                    onPress={handleLoginWithGoogle}
                  />
                  {/* <IButton
                    containerStyle={tw`w-16 h-16 bg-transparent  `}
                    svg={Icon.apple}
                    onPress={handleLoginWithGoogle}
                  /> */}
                </View>

                <View style={tw`gap-2`}>
                  <View style={tw`flex-row justify-center `}>
                    <Text style={tw`text-white`}>Dont have an account?</Text>
                    <TouchableOpacity
                      onPress={() => {
                        router.push("/auth/register");
                      }}
                      style={tw`flex-row items-center gap-3`}
                    >
                      <Text style={tw`text-[#339DFF] underline ml-1`}>
                        Sign up
                      </Text>
                      <SvgXml xml={Icon.play} />
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text style={tw`text-white text-center leading-6`}>
                      Please read our{" "}
                      <Text
                        onPress={() =>
                          router.push("/settings/terms_and_conditions")
                        }
                        style={tw`text-[#339DFF] underline`}
                      >
                        Terms
                      </Text>{" "}
                      and{" "}
                      <Text
                        onPress={() => router.push("/settings/privacy_policy")}
                        style={tw`text-[#339DFF] underline`}
                      >
                        Privacy Policy
                      </Text>{" "}
                      and if you have any problems please contact our{" "}
                      <Text
                        onPress={() => support()}
                        style={tw`text-[#339DFF] underline`}
                      >
                        Support
                      </Text>
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </Formik>
          {/* End of Formik Wrapper */}
        </View>
      </KeyboardAwareScrollView>
    </AppBgWrapper>
  );
};

export default Login;
