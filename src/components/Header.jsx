import { listImagePath } from "../assets/imgPath";
import { Image, useColorScheme } from "react-native";

const Header = () => {
  // 다크모드
  const isDark = useColorScheme() === "dark";
  
  return (
    <>
      {isDark ? (
        <Image
          source={listImagePath["darkLogo"]}
          style={{ width: 140, height: 50 }}
          resizeMode="contain"
        />
      ) : (
        <Image
          source={listImagePath["logo"]}
          style={{ width: 140, height: 50 }}
          resizeMode="contain"
        />
      )}
    </>
  );
};

export default Header;
