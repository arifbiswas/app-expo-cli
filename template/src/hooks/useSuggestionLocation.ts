import axios from "axios";
import { useState } from "react";
const GOOGLE_MAPS_API_KEY = "AIzaSyCZWDL-UblMpEOnoFf2UphrUbjUb6nLhxM";
export const useSuggestionLocation = () => {
  const [locationSuggestions, setLocationSuggestions] = useState<any[]>([]);
  const [suggestionLoading, setSuggestionLoading] = useState(false);

  const handleSearchLocation = async (query: string) => {
    try {
      setSuggestionLoading(true);
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${GOOGLE_MAPS_API_KEY}`
      );
      // console.log(response);
      setLocationSuggestions(response?.data?.results);
      setSuggestionLoading(false);
    } catch (error) {
      // console.log()
      console.log(error);
      setSuggestionLoading(false);
    }
  };

  const clearSuggestions = () => {
    setLocationSuggestions([]);
    setSuggestionLoading(false);
  };

  return {
    locationSuggestions,
    handleSearchLocation,
    clearSuggestions,
    setLocationSuggestions,
    suggestionLoading,
  };
};
