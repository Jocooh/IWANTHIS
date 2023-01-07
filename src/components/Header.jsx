import { imagePath } from "../assets/imgPath";
import { Text, Image, TouchableOpacity, View } from "react-native";
const Header = () => {
  return (
    <>
      <Text>IWANTHIS</Text>
      <Image
        style={{ width: 40, height: 40 }}
        source={imagePath["main"]}
        resizeMode="contain"
      />
    </>
  );
};

export default Header;
