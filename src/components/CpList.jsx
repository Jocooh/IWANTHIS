import { View, Text, TouchableHighlight, useColorScheme } from "react-native";
import { ListImage, ListStyle } from "../styles/styled";

//navigate물어보자.

const CpList = ({ list, navigation, color, id, img }) => {
  // 다크모드
  const isDark = useColorScheme() === "dark";
  const backColor = isDark ? "#605e58" : "#e4e7ef";
  const fontColor = isDark ? "#dad8d1" : "black";
  
  let results = list.image;

  return (
    <TouchableHighlight
      onPress={() => {
        navigation("Detail", {
          color: color,
          category: list.category,
          listId: id,
          img: img,
        });
      }}
    >
      <ListStyle style={{ backgroundColor: backColor }}>
        <View>
          <Text
            style={{
              color: fontColor,
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            {list.title}
          </Text>
          <Text style={{ color: fontColor, paddingVertical: 10 }}>
            {list.date}
          </Text>
        </View>
        {/* 유저프로필대신 상품 이미지 */}
        <View style={{ marginVertical: -5 }}>
          <ListImage source={results ? { uri: `${list.image}` } : null} />
        </View>
      </ListStyle>
    </TouchableHighlight>
  );
};

export default CpList;
