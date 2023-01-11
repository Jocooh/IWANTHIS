// 한 군데 이상 쓰는 스타일드 컴포넌트는 여기에 넣어주세요
import styled from "@emotion/native";
import { height, width } from "../common/util";

//리스트 페이지 기본 디자인
export const ListTitle = styled.Text`
  font-weight: bold;
  color: black;
  font-size: 40px;
  margin-left: 10px;
`;

export const ListBackground = styled.View`
  height: 600px;
  margin: 10px;
  flex: 1;
  background-color: white;
  border-top-left-radius: 60px;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.7);
`;

export const ListStyle = styled.View`
  background-color: #e4e7ef;
  width: 90%;
  margin: 1% 5%;
  height: 80px;
  border-radius: 15px;
  padding: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

export const ListImage = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 50%;
`;

export const DetailText = styled.Text`
  font-size: 16px;
`;

export const Loader = styled.View`
  width: ${width + "px"};
  height: ${height + "px"};
  justify-content: center;
  align-items: center;
`;
