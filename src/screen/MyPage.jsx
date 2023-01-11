import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Button,
  Alert,
  TextInput,
  AntDesign,
  FlatList,
} from "react-native";
import styled from "@emotion/native";
import defaultimage from "../assets/defaultimage.png";
import testimg from "../assets/testimg.png";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
// import dummy from "../db/db.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MyPage = () => {
  // 프로필 변경
  const [photo, SetPhoto] = useState(defaultimage);
  const myProfilePicChangeBtn = () => {
    Alert.alert("My Profile", "프로필 사진을 변경하시겠습니까?", [
      {
        text: "확인",
        onPress: () => {
          Alert.alert("아직은 안돼요");
        },
      },
      { text: "취소" },
    ]);
  };

  // 닉네임 변경
  const [name, setName] = useState("닉네임");
  const [text, setText] = useState("");
  // const changeNameBtn = () => {
  //   setName(text);
  //   setText();
  // };
  const changeName = () => {
    setName(text);
    setText();
  };
  const changeNameBtn = () => {
    Alert.alert("My Proflie", "닉네임을 변경하시겠습니까?", [
      {
        text: "확인",
        onPress: () => {
          Alert.alert("My Proflie", "닉네임이 변경되었습니다.", changeName());
        },
      },
      { text: "취소" },
    ]);
  };

  return (
    <MyPageWrapper>
      <StatusBar style="auto" />
      <MyPageTitleTxt>My Profile</MyPageTitleTxt>
      <MyProfileArea>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={myProfilePicChangeBtn}>
            <MyProfilePicSt source={photo} />
          </TouchableOpacity>

          <MyProfileInfoSt>
            <MyPageTxt>{name}</MyPageTxt>
            <TextInput
              placeholder="변경할 닉네임을 입력해주세요."
              onChangeText={setText}
              value={text}
            ></TextInput>
            <Button title="변경하기" onPress={changeNameBtn}></Button>
          </MyProfileInfoSt>
        </View>
      </MyProfileArea>

      <MyWishListArea>
        <MyPageTitleTxt>My Wishlist</MyPageTitleTxt>
        <View style={{ alignItems: "center" }}>
          {/* <FlatList data={} renderItem={} keyExtractor={} /> */}
          <ScrollView horizontal={true}>
            <TouchableOpacity>
              <MyItemSt>
                <MyItemPicSt source={testimg} />
                <MyItemInfoSt>
                  <MyPageTxt> 상품명 : 자동차 </MyPageTxt>
                  <MyPageTxt2> 가격 : 50,000,000 KRW </MyPageTxt2>
                  <MyPageTxt2> 설명 : 사주세요 </MyPageTxt2>
                </MyItemInfoSt>
              </MyItemSt>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </MyWishListArea>
    </MyPageWrapper>
  );
};

export default MyPage;

// my page
const MyPageWrapper = styled.View`
  flex: 1;
  background-color: #92b1e8;
`;
const MyProfileArea = styled.View`
  flex: 0.6;
  background-color: #92b1e8;

  align-items: center;
`;
const MyWishListArea = styled.View`
  flex: 1.6;
  background-color: white;
  border-radius: 30px 0 0 0;
  // #f6efd6

  /* align-items: center; */
`;
const MyPageTitleTxt = styled.Text`
  font-size: 40px;
  font-weight: 700;

  /* text-decoration: underline; */
  margin: 5%;
`;
const MyPageTxt = styled.Text`
  font-size: 30px;
  font-weight: 500;

  margin: auto;
`;
const MyPageTxt2 = styled.Text`
  font-size: 22px;
  font-weight: 500;

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
  /* border: 20px solid white; */
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
