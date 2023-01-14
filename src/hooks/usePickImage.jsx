import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

const usePickImage = (state) => {
  const [pickedImg, setPickedImg] = useState(state);
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const pickImage = async () => {
    if (!status?.granted) {
      const permissions = await requestPermission();
      if (!permissions.granted) {
        return null;
      }
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    if (!!result) {
      const [{ uri }] = result.assets;
      setPickedImg(uri);
    }
  };

  return [pickedImg, setPickedImg, pickImage];
};

export default usePickImage;
