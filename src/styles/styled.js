// 한 군데 이상 쓰는 스타일드 컴포넌트는 여기에 넣어주세요
import { StyleSheet } from "react-native";
import styled from "@emotion/native";

//리스트 페이지 기본 디자인
export const ListBackground = styled.View`
  height: 600px;
  width: 340px;
  margin: 5px 18px;
  flex: 1;
  background-color: white;
  border-radius: 15px;
  box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.6);
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
`;
