// 한 군데 이상 쓰는 스타일드 컴포넌트는 여기에 넣어주세요
import styled from "@emotion/native";
import { StyleSheet } from "react-native";
import { height, width } from "../common/utils";

const stylesList = StyleSheet.create({
  ListBackground: {
    height: 600,
    width: 340,
    marginHorizontal: 18,
    marginVertical: 5,
    flex: 1,
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 10, height: 15 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  ListStyle: {
    backgroundColor: "#e4e7ef",
    width: "90%",
    marginHorizontal: "5%",
    marginVertical: "1%",
    height: 80,
    borderRadius: 15,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ListImageSize: {
    width: 70,
    height: 70,
  },
});
export default stylesList;

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

export const DetailText = styled.Text`
  font-size: 16px;
`;

export const Loader = styled.View`
  width: ${width + "px"};
  height: ${height + "px"};
  justify-content: center;
  align-items: center;
`;
