import * as DocumentPicker from "expo-document-picker";

import { createAudioPlayer } from "expo-audio";

interface UseDocPickerReturn {
  pickDocument: ({
    multiple,
  }: UseDocPickerProps) => Promise<
    | DocumentPicker.DocumentPickerAsset
    | DocumentPicker.DocumentPickerAsset[]
    | null
  >;
}

export const DocPickerType = {
  audio: "audio/*",
  pdf: "application/pdf",
  images: "image/*",
  videos: "video/*",
  allFiles: "*/*",
};

interface UseDocPickerProps {
  // You can add props here if needed in the future
  multiple?: boolean;
  type?: (typeof DocPickerType)[keyof typeof DocPickerType];
  allowDuration: number;
}

export const useDocPicker = (): UseDocPickerReturn => {
  const pickDocument = async ({
    multiple,
    type = DocPickerType.audio,
    allowDuration,
  }: UseDocPickerProps): Promise<
    | DocumentPicker.DocumentPickerAsset
    | DocumentPicker.DocumentPickerAsset[]
    | null
  > => {
    // No permissions request is necessary for launching the document picker
    const result = await DocumentPicker.getDocumentAsync({
      multiple: !!multiple,
      type: type,
    });

    // console.log(result);

    if (result.canceled) {
      return null;
    }

    if (!result.canceled && allowDuration) {
      return new Promise((resolve) => {
        let enter = true;
        const player = createAudioPlayer(result?.assets![0]?.uri);

        player.addListener("playbackStatusUpdate", (status) => {
          if (status.isLoaded && status.duration > 0.1) {
            if (player?.duration > allowDuration && enter) {
              enter = false;
              alert("Please select a file with a duration less than 3 minutes");
              resolve(null);
            } else if (enter) {
              enter = false;
              resolve(result.assets);
            }
          }
        });
      });
    }

    if (!result.canceled && !allowDuration) {
      return result.assets;
    }

    // Ensure we never return undefined
    return null;
  };

  return {
    pickDocument,
  };
};
