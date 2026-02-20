import { Text, TouchableOpacity, View } from "react-native";
import { router, useGlobalSearchParams } from "expo-router";

import React from "react";
import { SvgXml } from "react-native-svg";
import WebView from "react-native-webview";
import tw from "@/src/lib/tailwind";

const OpenUrl = () => {
  const params = useGlobalSearchParams();
  return (
    <View style={tw`flex-1 bg-base`}>
      <TouchableOpacity
        onPress={() => router.dismiss()}
        style={tw`flex-row items-center gap-3 absolute bottom-4 right-4 z-50`}
      >
        <View
          style={[
            tw`bg-[#3D3D3D] w-12 h-12 justify-center items-center rounded-full `,
          ]}
        >
          <SvgXml
            xml={`<svg width="12" height="18" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.477124 9.99984L9.69575 18L12 16.0003L3.9335 9L12 1.99969L9.69575 0L0.477124 8.00016C0.171621 8.26536 0 8.625 0 9C0 9.375 0.171621 9.73464 0.477124 9.99984Z" fill="white"/>
</svg>



`}
          />
        </View>
      </TouchableOpacity>
      {params?.url ? (
        <WebView source={{ uri: params?.url } as any} style={{ flex: 1 }} />
      ) : (
        <Text>no url</Text>
      )}
    </View>
  );
};

export default OpenUrl;
