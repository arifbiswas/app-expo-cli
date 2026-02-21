import { Dimensions, Linking } from "react-native";

import tw from "../lib/tailwind";

export const { height: _HIGHT, width: _WIDTH } = Dimensions.get("window");

// console.log(_WIDTH);

export const PrimaryColor = tw.color("primary") as string; // Example primary color, replace with your actual primary color

// If need show image then use it for temp
export const RandomImage = `https://picsum.photos/200/300?random=${Math.floor(
  Math.random() * 1000,
)}`;
//If need show random color of the card
export const RandomColor = () =>
  `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;

export const OpenLink = (link: string) => {
  Linking.openURL(link);
};

// export const OpenSystemUi = ()=>{
//     Linking.
// }
