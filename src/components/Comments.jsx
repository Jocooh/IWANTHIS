import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { DetailText } from "../styles/styled";
import styled from "@emotion/native";
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';

const Comments = ({comment}) => {
  const [editComment, setEditComment] = useState()

  return (
    <CommentsBox>
      <View style={{flexDirection: "row"}}>
        <Image
          style={{ width: 50, height: 50, borderRadius: 50, marginRight: 10 }}
          resizeMode="contain"
          source={{uri: comment.profileImg}}
        />
        <View>
          <View style={{ marginBottom: 6 }}>
            <Text>{comment.nickName}</Text>
          </View>
          <DetailText>{comment.comment}</DetailText>
        </View>
      </View>
      <TouchableOpacity style={{flexDirection: 'row'}}>
        <AntDesign style={{marginRight: 10}} name="edit" size={40} color="black" />
        <AntDesign name="delete" size={40} color="black" />
      </TouchableOpacity>
    </CommentsBox>
  );
};

export default Comments;

const CommentsBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  margin: auto;
  padding: 0 0 10px 0;
  border-bottom-width: 1px;
  border-bottom-color: black;
`;
