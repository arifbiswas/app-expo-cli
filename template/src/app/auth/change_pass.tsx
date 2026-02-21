import * as Yup from "yup";

import { ScrollView, View } from "react-native";

import { Icon } from "@/assets/icon";
import BackButton from "@/src/lib/backHeader/BackButton";
import TButton from "@/src/lib/buttons/TButton";
import InputText from "@/src/lib/inputs/InputText";
import tw from "@/src/lib/tailwind";
import { router } from "expo-router";
import { Formik } from "formik";

// --- Icon Placeholders ---

// --- Yup Validation Schema ---
const ChangePasswordSchema = Yup.object().shape({
  old_password: Yup.string().required("Current password is required"),
  new_password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required")
    .notOneOf(
      [Yup.ref("old_password"), null],
      "New password must be different from current password",
    ),
  c_password: Yup.string()
    .oneOf([Yup.ref("new_password")], "Passwords must match")
    .required("Please confirm your new password"),
});

// --- Reusable Password Input Component ---

// --- Main Change Password Screen Component ---
const ChangePasswordScreen = () => {
  // const []

  // const [changePass, { isLoading }] = useChangePasswordMutation();

  const handleSaveChanges = async (values: any) => {
    try {
      // const res = await changePass(values).unwrap();

      // if (res?.success) {
      router.push(
        "/auth/change_pass_modal?title=You’re All Set!&subtitle=Your password has been changed successfully!&buttonTitle=Back",
      );
      // }
      // else {
      //   router.push(`/modals/toaster?content=${res?.message}`);
      // }
    } catch (error: any) {
      router.push(`/modals/toaster?content=${error?.message}`);
    }
  };

  return (
    <Formik
      initialValues={{
        old_password: "",
        new_password: "",
        c_password: "",
      }}
      validationSchema={ChangePasswordSchema}
      onSubmit={handleSaveChanges}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View style={tw`flex-1 bg-[#121212]`}>
          {/* Header */}
          <BackButton
            onPress={() => router.dismiss()}
            title="Change Password"
          />

          <ScrollView contentContainerStyle={tw`p-5 mt-4 gap-5`}>
            <InputText
              textInputProps={{
                placeholder: "Current Password",
                placeholderTextColor: "#A9A9A9",
              }}
              variant="password"
              // === Place icons here ===
              svgFirstIcon={Icon.lock}
              value={values.old_password}
              errorText={errors.old_password}
              touched={touched.old_password}
              onChangeText={handleChange("old_password")}
              onBlur={handleBlur("old_password")}
            />

            <InputText
              textInputProps={{
                placeholder: "New Password",
                placeholderTextColor: "#A9A9A9",
              }}
              variant="password"
              // === Place icons here ===
              svgFirstIcon={Icon.lock}
              value={values.new_password}
              errorText={errors.new_password}
              touched={touched.new_password}
              onChangeText={handleChange("new_password")}
              onBlur={handleBlur("new_password")}
            />

            <InputText
              textInputProps={{
                placeholder: "Confirm New Password",
                placeholderTextColor: "#A9A9A9",
              }}
              variant="password"
              // === Place icons here ===
              svgFirstIcon={Icon.lock}
              value={values.c_password}
              errorText={errors.c_password}
              touched={touched.c_password}
              onChangeText={handleChange("c_password")}
              onBlur={handleBlur("c_password")}
            />
          </ScrollView>

          {/* Save Changes Button */}
          <TButton
            // === Place Loading if you connect api here ===
            // isLoading={isLoading}
            onPress={handleSubmit}
            containerStyle={tw`m-5`}
            title="Save Changes"
          />
        </View>
      )}
    </Formik>
  );
};

export default ChangePasswordScreen;
