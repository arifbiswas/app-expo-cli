import * as ImagePicker from "expo-image-picker";

import React from "react";

interface UseImagePickerReturn {
  pickImage: ({ multiple }: UseImagePickerProps) => Promise<void>;
  image: ImagePicker.ImagePickerAsset | ImagePicker.ImagePickerAsset[] | null;
  closeImage: () => void;
  setImage: React.Dispatch<
    React.SetStateAction<
      ImagePicker.ImagePickerAsset | ImagePicker.ImagePickerAsset[] | null
    >
  >;
}

interface UseImagePickerProps {
  // You can add props here if needed in the future
  multiple?: boolean;
  ratio?: [number, number];
  editing?: boolean;
  quality?: number;
  mediaTypes?: ImagePicker.MediaType[];
}

export const useImagePicker = (): UseImagePickerReturn => {
  const [image, setImage] = React.useState<
    ImagePicker.ImagePickerAsset | ImagePicker.ImagePickerAsset[] | null
  >(null);

  const pickImage = async ({
    multiple,
    ratio,
    editing = false,
    quality = 1,
    mediaTypes = ["images"],
  }: UseImagePickerProps) => {
    // No permissions request is necessary for launching the image library
    let result;
    if (ratio?.length === 2) {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: mediaTypes,
        allowsEditing: editing,
        aspect: ratio,
        quality: quality,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: mediaTypes,
        allowsEditing: editing,
        quality: quality,
      });
    }

    // console.log(result);

    if (!result.canceled && !multiple) {
      setImage(result.assets[0]);
    } else if (!result.canceled && multiple) {
      setImage(result.assets);
    } else {
      setImage(null);
    }
  };

  const closeImage = () => {
    setImage(null);
  };

  return { pickImage, image, closeImage, setImage };
};
