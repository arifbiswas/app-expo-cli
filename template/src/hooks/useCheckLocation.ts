import * as Location from "expo-location";

import { router } from "expo-router";
import { useState } from "react";

interface Ilocation {
  longitude: number;
  latitude: number;
}

export const useCheckLocation = () => {
  const [location, setLocation] = useState<Ilocation | null>(null);
  const [loading, setLoading] = useState(false);

  const getLocation = async () => {
    setLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      // router?.dismiss();
      router?.push("/modals/toaster?content=Location access denied");
    }

    let location = await Location.getCurrentPositionAsync({});
    // console.log(location);

    const { latitude, longitude } = location.coords;

    setLocation({
      latitude,
      longitude,
    });
    setLoading(false);
  };

  return { location, loading, getLocation, setLoading };
};
