import { TouchableOpacity, View, Alert, Text } from "react-native";
import { useState } from "react";
import { updateProfile } from "firebase/auth/react-native";
import { auth, storage } from "../../common/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import usePickImage from "../../hooks/usePickImage";
import * as St from "../../styles/styled/MyPage.styled";
import { listImagePath } from "../../assets/imgPath";

const ProfileArea = () => {
  const user = auth.currentUser;

  // 닉네임 변경
  const [text, setText] = useState("");
  const [nickName, setNickname] = useState(user.displayName);

  const editNickname = () => {
    setNickname(text);
    updateProfile(user, {
      displayName: text,
    });
  };

  // 이미지 선택 & 미리보기
  const [pickedImg, setPickedImg, pickImage] = usePickImage(
    user.photoURL ? user.photoURL : ""
  );

  //이미지 파이어베이스 스토리지 업로드
  const uploadImage = async () => {
    if (pickedImg) {
      const response = await fetch(pickedImg);
      const blobFile = await response.blob();
      const imageRef = ref(storage, `profile/${uuidv4()}`);

      let downloadUrl;

      if (blobFile) {
        const imageResponse = await uploadBytes(imageRef, blobFile);
        downloadUrl = await getDownloadURL(imageResponse.ref);
      }

      updateProfile(user, {
        photoURL: downloadUrl,
      });
    }
  };

  const changenicknameBtn = () => {
    Alert.alert("My Proflie", "프로필을 변경하시겠습니까?", [
      {
        text: "확인",
        onPress: () => {
          editNickname();
          uploadImage();
          setText("");
          setPickedImg("");
          Alert.alert("My Proflie", "프로필이 변경되었습니다.");
        },
      },
      { text: "취소" },
    ]);
  };

  return (
    <View>
      <St.MyPageTitleTxt>Hello,{nickName}</St.MyPageTitleTxt>
      <St.MyProfileArea>
        <View>
          <TouchableOpacity onPress={() => pickImage()}>
            <St.MyProfilePicSt
              source={
                !!pickedImg ? { uri: pickedImg } : listImagePath["defaultimage"]
              }
            />
          </TouchableOpacity>
          <St.MyPageTitleTxt>💌 E-mail: {user.email}</St.MyPageTitleTxt>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View>
            <St.MyProfileInfoSt>
              <St.MyTextInput
                placeholder="변경할 닉네임을 입력해주세요."
                onChangeText={setText}
                value={text}
              />
            </St.MyProfileInfoSt>
          </View>
          <St.ProfileChangeBtn>
            <View>
              <Text onPress={() => changenicknameBtn()}>변경</Text>
            </View>
          </St.ProfileChangeBtn>
        </View>
      </St.MyProfileArea>
    </View>
  );
};

export default ProfileArea;
