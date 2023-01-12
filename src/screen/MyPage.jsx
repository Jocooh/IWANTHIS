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
    user.photoURL ? user.photoURL : null
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
    //html시작 배경
    <MyPageWrapper>
      <StatusBar style="auto" />
      {/* 유저네임 인사 부분 */}
      <MyPageTitleTxt>Hello,{nickName}</MyPageTitleTxt>

      <MyProfileArea>
        <View>
          {/* 프로필이미지 */}
          <TouchableOpacity onPress={() => pickImage()}>
            <MyProfilePicSt
              source={!!pickedImg ?{ uri: pickedImg }: listImagePath["defaultimage"]}
            />
          </TouchableOpacity>
          {/* 유저 이메일 */}
          <MyPageTitleTxt>💌 E-mail: {user.email}</MyPageTitleTxt>
        </View>
        {/* 닉네임 입력창 */}
        <View style={{ flexDirection: "row" }}>
          <View>
            <MyProfileInfoSt>
              <TextInput
                placeholder="변경할 닉네임을 입력해주세요."
                onChangeText={setText}
                value={text}
                style={{
                  marginTop: 5,
                  borderBottomColor: "lightGray",
                  borderBottomWidth: 1,
                  marginRight: 10,
                  padding: 2,
                }}
              ></TextInput>
            </MyProfileInfoSt>
          </View>

          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderRadius: 5,
              borderStyle: "solid",
              padding: 7,
            }}
          >
            <View>
              <Text onPress={() => changenicknameBtn()}>변경</Text>
            </View>
          </TouchableOpacity>
        </View>
      </MyProfileArea>

      {/* 상단은 여기까지 */}

      {/* 내 글 목록 불러오는 구간 */}
      <MyWishListArea>
        <View>
          <MyPageTitleTxt style={{ marginRight: 200, fontSize: 23 }}>
            🦋Wish List
          </MyPageTitleTxt>
          <View
            style={{
              marginBottom: 10,
              borderBottomColor: "white",
              borderBottomWidth: 2,
              marginHorizontal: 10,
            }}
          ></View>
          {/* 내가쓴 글 */}
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
                  {/* 여기가 리스트들 */}
                  <View
                    style={{
                      backgroundColor: `${list.color}`,
                      marginLeft: 10,
                      marginVertical: 20,
                    }}
                  >
                    <MyItemPicSt
                      source={
                        !!list.image
                          ? { uri: list.image }
                          : listImagePath[list.category]
                      }
                    />
                    <MyItemInfoSt>
                      <MyPageTxt> {list.title} </MyPageTxt>
                      <MyPageTxt2> {list.price}원 </MyPageTxt2>
                      <MyPageTxt2>
                        📝 {list.content.slice(0, 7)}
                        {list.content.length > 7 && "..."}
                      </MyPageTxt2>
                    </MyItemInfoSt>
                  </View>
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
  background-color: white;
`;
const MyProfileArea = styled.View`
  width: 80%;
  margin-left: 10%;
  margin-bottom: 30px;
  height: 200px;
  background: white;
  align-items: center;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 1px 1px 7px #b1b2ff;
`;
const MyWishListArea = styled.View`
  background-color: #9badff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  height: 450px;
`;
const MyPageTitleTxt = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin: 5%;
`;
const MyPageTxt = styled.Text`
  font-size: 17px;
  font-weight: bold;
`;
const MyPageTxt2 = styled.Text`
  font-size: 15px;
`;

// profile area
const MyProfilePicSt = styled.Image`
  width: 70px;
  height: 70px;
  /* margin: auto 7% auto -5%; */
  margin: auto;
  border-radius: 50px;
`;
const MyProfileInfoSt = styled.View`
  width: 190px;
  background-color: white;
`;

// wishlist area
const MyItemPicSt = styled.Image`
  width: 180px;
  height: 220px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
const MyItemInfoSt = styled.View`
  padding: 6px;
  background-color: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  align-items: center;
`;
