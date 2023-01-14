import styled from '@emotion/native';
import { height, width } from '../../common/util';

export const DetailFlat = styled.FlatList`
  position: relative;
  width: ${width + "px"};
  height: ${height + "px"};
`;

export const ImageLink = styled.TouchableOpacity`
  align-content: center;
  width: 100%;
  height: 95%;
`;

export const LikeBtn = styled.TouchableOpacity`
  position: absolute;
  width: 45px;
  height: 40px;
  margin-top: 30%;
  margin-left: 10%;
`;

export const LikeBox = styled.View`
  flex-direction: row;
  align-items: center;
  position: relative;
  margin-top: 25%;
  margin-left: 10%;
`;

export const LikeCount = styled.View`
  position: absolute;
  margin-left: 40%;
  margin-top: 10%;
`;

export const DetailContainer = styled.View`
  flex-direction: column;
  justify-content: space-between;
  margin-top: 15%;
  margin-left: 5%;
  margin-right: 5%;
`;

export const DetailTitle = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

export const DetailHeader = styled.Text`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 4%;
`;

export const DetailBtnBox = styled.TouchableOpacity`
  margin-top: 7%;
  flex-direction: row;
`;

export const PriceBox = styled.View`
  flex-direction: row;
  margin-top: 10%;
  width: 95%;
`;

// Comments

export const CommentsBox = styled.View`
  position: relative;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  margin: auto;
  padding: 0 0 10px 0;
  border-bottom-width: 1px;
`;

export const ProfileImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 50px;
  margin-right: 10px;
`;

export const EditInput = styled.TextInput`
  width: 100%;
  font-size: 16px;
  border-style: solid;
  border-width: 1px;
`;

export const EditBtnBox = styled.View`
  flex: 2;
`;

export const EditCheck = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

// Detail+WriteList+EditList
export const DetailText = styled.Text`
  font-size: 20px;
`;

export const ImageBox = styled.View`
  flex-direction: row;
  position: relative;
  height: 350px;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
`;

export const ImageView = styled.View`
  align-content: center;
  width: 100%;
  height: 95%;
`;

export const ImageBtnBox = styled.View`
  position: absolute;
  z-index: 1;
  top: 93%;
  right: 43%;
  height: 50px;
  width: 50px;
  border-radius: 100px;
`;

export const CameraBtn = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  margin-top: 23%;
  margin-left: 26%;
`;