import React from "react";
import { Text, Image, useColorScheme } from "react-native";
import styled from "@emotion/native";

function CpList2() {
  // 다크모드
  const isDark = useColorScheme() === "dark";
  const fontColor = isDark ? "#dad8d1" : "black";
  
  return (
    <NoList>
      <Image
        source={require("../assets/listImage/no.png")}
        style={{
          width: 150,
          height: 150,
          resizeMode: "contain",
        }}
      />
      <Text style={{ color: fontColor, fontWeight: "bold" }}>
        등록된 리뷰가 없어요 🔥
      </Text>
    </NoList>
  );
}
const NoList = styled.View`
  align-items: center;
  margin-top: 50px;
`;

export default CpList2;
