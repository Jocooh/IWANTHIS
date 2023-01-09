import { View, Text, Image, TouchableOpacity } from "react-native";
import { DetailText } from "../styles/styled";
import styled from "@emotion/native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";

const Comments = ({ comment }) => {
  const [editComment, setEditComment] = useState();

  return (
    <CommentsBox>
      <View style={{ flex:8, flexDirection: "row" }}>
        <Image
          style={{ width: 50, height: 50, borderRadius: 50, marginRight: 10 }}
          resizeMode="contain"
          source={{ uri: comment.profileImg }}
        />
        <View style={{width: "75%"}}>
          <View style={{ marginBottom: 6 }}>
            <Text>{comment.nickName}</Text>
          </View>
          <DetailText>{comment.comment}</DetailText>
        </View>
      </View>
      <View style={{ fles:2, flexDirection: "row" }}>
        <TouchableOpacity style={{ marginRight: 10 }}>
          <AntDesign name="edit" size={32} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign name="delete" size={32} color="black" />
        </TouchableOpacity>
      </View>
    </CommentsBox>
  );
};

export default Comments;

const CommentsBox = styled.View`
  position: relative;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  margin: auto;
  padding: 0 0 10px 0;
  border-bottom-width: 1px;
  border-bottom-color: black;
`;
