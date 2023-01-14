import { useColorScheme } from "react-native";
import * as St from "../../styles/styled/WriteList.styled";

const InputZone = ({
  title,
  setTitle,
  content,
  setContent,
  price,
  setPrice,
  url,
  setUrl,
}) => {
  const isDark = useColorScheme() === "dark";
  const fontColor = isDark ? "#dad8d1" : "black";

  return (
    <>
      <St.InputZone
        placeholder="상품명"
        placeholderTextColor={isDark ? "#9b988a" : "gray"}
        style={{ fontSize: 25, marginTop: "2%", color: fontColor }}
        onChangeText={setTitle}
        value={title}
      />
      <St.InputZone
        style={{ color: fontColor }}
        keyboardType="number-pad"
        placeholder="가격"
        placeholderTextColor={isDark ? "#9b988a" : "gray"}
        onChangeText={setPrice}
        value={price}
      />
      <St.InputZone
        style={{ color: fontColor }}
        keyboardType="url"
        placeholder="판매링크"
        placeholderTextColor={isDark ? "#9b988a" : "gray"}
        onChangeText={setUrl}
        value={url}
      />
      <St.InputContent
        multiline={true}
        style={{ textAlignVertical: "top", color: fontColor }}
        placeholder="설명"
        placeholderTextColor={isDark ? "#9b988a" : "gray"}
        onChangeText={setContent}
        value={content}
      />
    </>
  );
};

export default InputZone;
