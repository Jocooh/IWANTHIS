import { Dimensions } from "react-native";

export const { width, height } = Dimensions.get("screen");

export const defaultImage =
  "https://firebasestorage.googleapis.com/v0/b/iwanthis-ab4f5.appspot.com/o/%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C2.png?alt=media&token=91835443-d923-4a96-9117-387ee53df48d";

export const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
export const pwRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
