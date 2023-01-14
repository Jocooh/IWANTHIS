import styled from "@emotion/native";

// my page
export const MyPageWrapper = styled.ScrollView`
  flex: 1;
  background-color: white;
`;
export const MyProfileArea = styled.View`
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
export const MyWishListArea = styled.View`
  background-color: #9badff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  height: 450px;
`;
export const MyPageTitleTxt = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin: 5%;
`;
export const MyPageTxt = styled.Text`
  font-size: 17px;
  font-weight: bold;
`;
export const MyPageTxt2 = styled.Text`
  font-size: 15px;
`;

// profile area
export const MyProfilePicSt = styled.Image`
  width: 70px;
  height: 70px;
  margin: auto;
  border-radius: 50px;
`;
export const MyProfileInfoSt = styled.View`
  width: 190px;
  background-color: white;
`;

// wishlist area
export const MyItemPicSt = styled.Image`
  width: 180px;
  height: 220px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
export const MyItemInfoSt = styled.View`
  padding: 6px;
  background-color: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  align-items: center;
`;

export const MyTextInput = styled.TextInput`
  padding: 2px;
  margin-top: 5px;
  margin-right: 10px;
  border-bottom-color: lightGray;
  border-bottom-width: 1px;
`;

export const ProfileChangeBtn = styled.TouchableOpacity`
  border-width: 1px;
  border-radius: 5px;
  border-style: solid;
  padding: 7px;
`;

export const UnderLine = styled.View`
  margin-bottom: 10px;
  border-bottom-color: white;
  border-bottom-width: 2px;
`;
