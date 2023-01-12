import { Dimensions } from "react-native";

export const { width, height } = Dimensions.get("screen");

export const defaultImage =
  "https://firebasestorage.googleapis.com/v0/b/iwanthis-ab4f5.appspot.com/o/defaultimage.png?alt=media&token=61bf18ff-c593-4aa2-9580-21e4e04e0e4d";

export const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
export const pwRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
