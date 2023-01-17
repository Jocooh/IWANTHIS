import { useColorScheme } from "react-native";

export const useBackColor = (darkColor, lightColor) => {
  const isDark = useColorScheme() === "dark";
  const backColor = isDark ? darkColor : lightColor;

  return [backColor, isDark];
};

export const useFontColor = (darkColor, lightColor) => {
  const isDark = useColorScheme() === "dark";
  const fontColor = isDark ? darkColor : lightColor;

  return [fontColor, isDark];
};
