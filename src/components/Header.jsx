import { listImagePath } from "../assets/imgPath";
import { Text, Image, useColorScheme } from "react-native";

const Header = (props) => {
  const isDark = useColorScheme() === "dark";
  const trueIsDark = !!isDark;
  return (
    <>
      {/* <Text>IWANTHIS</Text>
      <Image
        style={{ width: 40, height: 40 }}
        source={listImagePath["cart"]}
        resizeMode="contain"
      /> */}
      {trueIsDark ? (
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