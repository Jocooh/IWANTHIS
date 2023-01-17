import React from "react";
import { Text, Image } from "react-native";
import { useFontColor } from "../../hooks/useDarkMode";
import * as St from "../../styles/styled/Lists.styled";

function NoList() {
  // 다크모드
  const [fontColor] = useFontColor("#dad8d1", "black");

  return (
    <St.NoList>
      <Image
        source={require("../../assets/listImage/no.png")}
        style={{
          width: 150,
          height: 150,
          resizeMode: "contain",
        }}
      />
      <Text style={{ color: fontColor, fontWeight: "bold" }}>
        등록된 리뷰가 없어요 🔥
      </Text>
    </St.NoList>
  );
}

export default NoList;
