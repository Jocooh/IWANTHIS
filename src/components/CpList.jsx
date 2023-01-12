import { View, Text, TouchableHighlight } from "react-native";
import { ListImage, ListStyle } from "../styles/styled";

//navigate물어보자.

const CpList = ({ list, navigation, color, id, img }) => {
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
      <ListStyle>
        <View>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{list.title}</Text>
          <Text style={{ paddingVertical: 10 }}>{list.date}</Text>
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
