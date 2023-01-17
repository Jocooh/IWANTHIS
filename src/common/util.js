import { Dimensions } from "react-native";

export const { width, height } = Dimensions.get("screen");

export const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
export const pwRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const date = () => {
  const now = new Date();
  const year = now.getFullYear();
  let month = now.getMonth() + 1;
  if (month < 10) month = "0" + month;
  let day = now.getDate();
  if (day < 10) day = "0" + day;
  let hour = now.getHours();
  if (hour < 10) hour = "0" + hour;
  let minute = now.getMinutes();
  if (minute < 10) minute = "0" + minute;

  return `${year}-${month}-${day} ${hour}:${minute}`;
};
