import { Text, View } from "react-native";
import { router, useGlobalSearchParams, usePathname } from "expo-router";

import React from "react";
import tw from "@/src/lib/tailwind";

const Taster = () => {
  const params = useGlobalSearchParams();
  const pathname = usePathname(); // current route path

  React.useEffect(() => {
    const currentPath = pathname; // save the path when modal loads

    const timer = setTimeout(() => {
      // check if user still on this modal page
      if (router.canGoBack() && pathname === currentPath) {
        router.dismiss();
      }
    }, Number(params?.time) || 2000);

    return () => clearTimeout(timer);
  }, [params?.time, pathname]);

  return (
    <View style={tw`p-4 bg-gray-900`}>
      <Text style={tw`text-white`}>{params?.content}</Text>
    </View>
  );
};

export default Taster;
