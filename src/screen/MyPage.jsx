import {
  View,
  TouchableOpacity,
  ScrollView,
  Button,
  Alert,
  TextInput,
  ActivityIndicator,
  Text,
} from "react-native";
import styled from "@emotion/native";
import defaultimage from "../assets/defaultimage.png";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { updateProfile } from "firebase/auth/react-native";
import { auth, storage } from "../common/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { v4 as uuidv4 } from "uuid";
import { useQuery } from "react-query";
import { getMyPost } from "../common/api";
import { Loader } from "../styles/styled";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../components/Category";
import { listImagePath } from "../assets/imgPath";
import { defaultImage } from "../common/util";

// 이미지 css, 버튼 ,

const MyPage = () => {
  const { navigate } = useNavigation();
  // 데이터 가져오기
  const user = auth.currentUser;
  const uid = user.uid;

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
  const [pickedImg, setPickedImg] = useState(
    user.photoURL ? user.photoURL : defaultImage
  );
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
          Alert.alert("My Proflie", "프로필을 변경되었습니다.");
        },
      },
      { text: "취소" },
    ]);
  };

  const { isLoading, isError, data, error } = useQuery(
    [uid ? `?uid=${uid}` : ""],
    getMyPost
  );

  if (isLoading) {
    return (
      <Loader>
        <ActivityIndicator size={"large"} />
      </Loader>
    );
  }
  if (isError) return <Text>에러: {error.message}</Text>;

  const lists = !!data.length ? data[0].lists : false;

  return (
    <MyPageWrapper>
      <StatusBar style="auto" />
      <MyPageTitleTxt>안녕하세요, {user.email}님!</MyPageTitleTxt>
      <MyProfileArea>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => pickImage()}>
            <MyProfilePicSt
              source={{ uri: pickedImg ? pickedImg : defaultImage }}
            />
          </TouchableOpacity>

          <MyProfileInfoSt>
            <MyPageTxt>{nickName}</MyPageTxt>
            <TextInput
              placeholder="변경할 닉네임을 입력해주세요."
              onChangeText={setText}
              value={text}
            ></TextInput>
          </MyProfileInfoSt>
        </View>

        <View>
          <Button title="변경하기" onPress={() => changenicknameBtn()}></Button>
        </View>
      </MyProfileArea>

      <MyWishListArea>
        <View style={{ alignItems: "center" }}>
          <MyPageTitleTxt>My Wishlist</MyPageTitleTxt>
          {/* <FlatList data={} renderItem={} keyExtractor={} /> */}
          <ScrollView horizontal={true}>
            {lists? lists.map((list) => {
              return (
                <TouchableOpacity
                  key={list.id}
                  onPress={() => {
                    navigate("Detail", {
                      category: list.category,
                      listId: list.categoryId,
                      color: colors[list.category],
                      img: listImagePath[list.category],
                    });
                  }}
                >
                  <MyItemSt>
                    <MyItemPicSt
                      source={
                        !!list.image
                          ? { uri: list.image }
                          : listImagePath[list.category]
                      }
                    />
                    <MyItemInfoSt>
                      <MyPageTxt> 상품명 : {list.title} </MyPageTxt>
                      <MyPageTxt2> 가격 : {list.price} KRW </MyPageTxt2>
                      <MyPageTxt2 numberOfLines={3} ellipsizeMode="tail">
                        {" "}
                        설명 : {list.content}{" "}
                      </MyPageTxt2>
                    </MyItemInfoSt>
                  </MyItemSt>
                </TouchableOpacity>
              );
            }): null}
          </ScrollView>
        </View>
      </MyWishListArea>
    </MyPageWrapper>
  );
};

export default MyPage;

// my page
const MyPageWrapper = styled.ScrollView`
  flex: 1;
  background-color: #92b1e8;
`;
const MyProfileArea = styled.View`
  flex: 0.4;
  background-color: #92b1e8;

  align-items: center;
`;
const MyWishListArea = styled.View`
  flex: 1.1;
  background-color: white;
  border-radius: 30px 0 0 0;
  // #f6efd6

  /* align-items: center; */
`;
const MyPageTitleTxt = styled.Text`
  font-size: 25px;
  /* font-weight: bold; */

  /* text-decoration: underline; */
  margin: 5%;
`;
const MyPageTxt = styled.Text`
  font-size: 20px;
  /* font-weight: bold; */

  margin: auto;
`;
const MyPageTxt2 = styled.Text`
  font-size: 15px;
  /* font-weight: bold; */

  margin: auto;
`;

// profile area
const MyProfilePicSt = styled.Image`
  width: 160px;
  height: 165px;
  margin: auto 7% auto -5%;
`;
const MyProfileInfoSt = styled.View`
  width: 190px;
  height: 160px;
  border: 20px solid white;
  border-radius: 30px;
  background-color: white;

  align-items: center;
  padding: 10px;
`;

// wishlist area
const MyItemSt = styled.View`
  background-color: white;
  width: 370px;
  height: 425px;
  border: 10px solid #92b1e8;
  border-radius: 30px;
`;
const MyItemPicSt = styled.Image`
  width: 340px;
  height: 250px;
  border-radius: 30px;
  /* border: 1px solid black; */

  margin: auto;
  /* align-items: center; */
`;
const MyItemInfoSt = styled.View`
  width: 340px;
  height: 120px;
  border-radius: 30px;
  /* border: 1px solid black; */

  margin: auto;
  /* align-items: center; */
`;
{
  /* <View style={{ flexDirection: "row" }}>
              <MyPageTxt2>자기 소개</MyPageTxt2>
              <Button title="변경" onPress={() => alert("hi")}></Button>
            </View> */
}
