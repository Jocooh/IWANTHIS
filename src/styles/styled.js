// 한 군데 이상 쓰는 스타일드 컴포넌트는 여기에 넣어주세요
import { StyleSheet } from "react-native";

// const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

//리스트 페이지 기본 디자인
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
