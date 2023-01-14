import {
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Text,
} from "react-native";
import { useState } from "react";
import { updateProfile } from "firebase/auth/react-native";
import { auth, storage } from "../common/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { useQuery } from "react-query";
import { getMyPost } from "../common/api";
import { Loader } from "../styles/styled";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../components/Category";
import { listImagePath } from "../assets/imgPath";
import usePickImage from "../hooks/usePickImage";
import * as St from "../styles/styled/MyPage.styled";

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
    <St.MyPageWrapper>
      {/* 유저네임 인사 부분 */}
      <St.MyPageTitleTxt>Hello,{nickName}</St.MyPageTitleTxt>
      <St.MyProfileArea>
        <View>
          {/* 프로필이미지 */}
          <TouchableOpacity onPress={() => pickImage()}>
            <St.MyProfilePicSt
              source={
                !!pickedImg ? { uri: pickedImg } : listImagePath["defaultimage"]
              }
            />
          </TouchableOpacity>
          {/* 유저 이메일 */}
          <St.MyPageTitleTxt>💌 E-mail: {user.email}</St.MyPageTitleTxt>
        </View>
        {/* 닉네임 입력창 */}
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
      {/* 내 글 목록 불러오는 구간 */}
      <St.MyWishListArea>
        <View>
          <St.MyPageTitleTxt style={{ marginRight: 200, fontSize: 23 }}>
            🦋Wish List
          </St.MyPageTitleTxt>
          <St.UnderLine style={{ marginHorizontal: 10 }} />
          {/* 내가쓴 글 */}
          <ScrollView horizontal={true}>
            {lists
              ? lists.map((list) => {
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
                        <St.MyItemPicSt
                          source={
                            !!list.image
                              ? { uri: list.image }
                              : listImagePath[list.category]
                          }
                        />
                        <St.MyItemInfoSt>
                          <St.MyPageTxt> {list.title} </St.MyPageTxt>
                          <St.MyPageTxt2> {list.price}원 </St.MyPageTxt2>
                          <St.MyPageTxt2>
                            📝 {list.content.slice(0, 7)}
                            {list.content.length > 7 && "..."}
                          </St.MyPageTxt2>
                        </St.MyItemInfoSt>
                      </View>
                    </TouchableOpacity>
                  );
                })
              : null}
          </ScrollView>
        </View>
      </St.MyWishListArea>
    </St.MyPageWrapper>
  );
};

export default MyPage;
