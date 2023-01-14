import { imagePath } from "../assets/imgPath";
import { Image, TouchableOpacity, View } from "react-native";

const Profile = ({ navigate }) => {
  return (
    <TouchableOpacity onPress={navigate("Login")}>
      <View style={{ marginVertical: -5 }}>
        <Image
          source={imagePath["defaultimage"]}
          style={{ height: 40, width: 40 }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Profile;
