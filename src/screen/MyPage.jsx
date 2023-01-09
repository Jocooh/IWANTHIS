import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Button,
} from "react-native";
import styled from "@emotion/native";
import defaultimage from "../assets/defaultimage.png";
import testimg from "../assets/testimg.png";

const MyPage = () => {
  return (
    <MyPageArea>
      <MyProfileArea>
        <Text style={{ fontSize: "25", fontWeight: "700", margin: "5%" }}>
          My Profile
        </Text>
        <TouchableOpacity>
          <MyProfilePicSt source={defaultimage} />
        </TouchableOpacity>
        <MyProfileInfoSt>
          <Text style={{ fontSize: "25", margin: "3%" }}>김원준</Text>
          <Text style={{ fontSize: "20", margin: "3%" }}>
            안녕하세요. 저의 위시리스트를 비워주실 후원자를 구합니다.
            연락주세요.
          </Text>
        </MyProfileInfoSt>
      </MyProfileArea>

      <MyWishListArea>
        <Text
          style={{
            fontSize: "25",
            fontWeight: "700",
            marginTop: "5%",
            marginBottom: "3%",
          }}
        >
          My Wish list
        </Text>
        <ScrollView horizontal={true}>
          <TouchableOpacity>
            <MyItemSt>
              <MyItemPicSt source={testimg} />
              <MyItemInfoSt>
                <Text style={{ fontSize: "20" }}> 상품명 : 자동차 </Text>
                <Text style={{ fontSize: "20" }}> 가격 : 50,000,000 KRW </Text>
                <Text style={{ fontSize: "20" }}> 설명 : 사주세요 </Text>
              </MyItemInfoSt>
            </MyItemSt>
          </TouchableOpacity>
          <TouchableOpacity>
            <MyItemSt>
              <MyItemPicSt source={testimg} />
              <MyItemInfoSt>
                <Text style={{ fontSize: "20" }}> 상품명 : 자동차 </Text>
                <Text style={{ fontSize: "20" }}> 가격 : 50,000,000 KRW </Text>
                <Text style={{ fontSize: "20" }}> 설명 : 사주세요 </Text>
              </MyItemInfoSt>
            </MyItemSt>
          </TouchableOpacity>
          <TouchableOpacity>
            <MyItemSt>
              <MyItemPicSt source={testimg} />
              <MyItemInfoSt>
                <Text style={{ fontSize: "20" }}> 상품명 : 자동차 </Text>
                <Text style={{ fontSize: "20" }}> 가격 : 50,000,000 KRW </Text>
                <Text style={{ fontSize: "20" }}> 설명 : 사주세요 </Text>
              </MyItemInfoSt>
            </MyItemSt>
          </TouchableOpacity>
        </ScrollView>
      </MyWishListArea>
    </MyPageArea>
  );
};

export default MyPage;

// my page
const MyPageArea = styled.View`
  flex: 1;
  background-color: #92b1e8;
`;
const MyProfileArea = styled.View`
  flex: 1;
  background-color: #92b1e8;

  align-items: center;
`;
const MyWishListArea = styled.View`
  flex: 1.2;
  background-color: white;
  border-radius: 30%;
  // #f6efd6
  align-items: center;
`;

// profile area
const MyProfilePicSt = styled.Image`
  width: 175px;
  height: 150px;

  margin: 2% auto;
`;
const MyProfileInfoSt = styled.View`
  align-items: center;
  margin: 0% 8%;
`;

// wishlist area
const MyItemSt = styled.View`
  background-color: white;
  width: 350px;
  height: 350px;
  border: 5px solid #92b1e8;
  border-radius: 30%;

  align-items: center;
  margin: 10px 30px;
`;
const MyItemPicSt = styled.Image`
  width: 310px;
  height: 200px;
  border: 1px solid white; // 확인용
  border-radius: 30%;

  margin: 5%;
`;
const MyItemInfoSt = styled.View`
  align-items: center;
  margin: auto;
`;
