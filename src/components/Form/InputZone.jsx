import { useFontColor } from "../../hooks/useDarkMode";
import * as St from "../../styles/styled/WriteList.styled";

const InputZone = ({ state, onChange }) => {
  const [fontColor, isDark] = useFontColor("#dad8d1", "black");

  return (
    <>
      <St.InputZone
        placeholder="상품명"
        placeholderTextColor={isDark ? "#9b988a" : "gray"}
        style={{ fontSize: 25, marginTop: "2%", color: fontColor }}
        onChange={(e) => onChange(e, "title")}
        value={state.title}
      />
      <St.InputZone
        style={{ color: fontColor }}
        keyboardType="number-pad"
        placeholder="가격"
        placeholderTextColor={isDark ? "#9b988a" : "gray"}
        onChange={(e) => onChange(e, "price")}
        value={state.price.toString()}
      />
      <St.InputZone
        style={{ color: fontColor }}
        keyboardType="url"
        placeholder="판매링크"
        placeholderTextColor={isDark ? "#9b988a" : "gray"}
        onChange={(e) => onChange(e, "url")}
        name="url"
        value={state.url}
      />
      <St.InputContent
        multiline={true}
        style={{ textAlignVertical: "top", color: fontColor }}
        placeholder="설명"
        placeholderTextColor={isDark ? "#9b988a" : "gray"}
        onChange={(e) => onChange(e, "content")}
        name="content"
        value={state.content}
      />
    </>
  );
};

export default InputZone;
