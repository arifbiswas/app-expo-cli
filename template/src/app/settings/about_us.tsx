import { Image, ScrollView, View } from "react-native";

import { ImageAssets } from "@/assets/images";
import BackButton from "@/src/lib/backHeader/BackButton";
import TButton from "@/src/lib/buttons/TButton";
import tw from "@/src/lib/tailwind";
import { _WIDTH } from "@/src/utils/utils";
import { router } from "expo-router";
import RenderHtml from "react-native-render-html";

const AboutUs = () => {
  const source = {
    html: `
  <div>
  <p>App Name</p>
  <p>App Version</p>
  <p>App Description</p>
  </div>
  `,
  };

  return (
    <View style={tw`flex-1 bg-base`}>
      <BackButton
        onPress={() => router.dismiss()}
        title="About us"
        titleStyle={tw`text-white`}
      />
      <ScrollView>
        <View style={tw`px-5 mt-5 justify-center items-center`}>
          <Image
            source={ImageAssets.about_us}
            style={tw` h-52 aspect-square`}
            resizeMode="contain"
          />
          <TButton
            disabled
            title="About us "
            offGradient
            containerStyle={tw`bg-secondary`}
          />
        </View>
        <View style={tw`gap-6 px-5 my-5`}>
          <RenderHtml
            contentWidth={_WIDTH}
            baseStyle={{
              color: tw.color("gray-300"),
              fontFamily: "InterRegular",
              fontSize: 16,
              letterSpacing: 0.5,
              lineHeight: 24,
            }}
            source={source}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AboutUs;
