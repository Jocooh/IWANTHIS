import { listImagePath } from "../assets/imgPath";
import { Text, Image } from "react-native";

const Header = (props) => {
  return (
    <>
      <Text>IWANTHIS</Text>
      <Image
        style={{ width: 40, height: 40 }}
        source={listImagePath["main"]}
        resizeMode="contain"
      />
    </>
  );
};

export default Header;
