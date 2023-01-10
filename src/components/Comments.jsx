import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { DetailText } from "../styles/styled";
import styled from "@emotion/native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { auth } from "../common/firebase";
import { useDispatch, useSelector } from "react-redux";
import { offEdit, onEdit } from "../redux/modules/commentSlice";
import { useMutation, useQueryClient } from "react-query";
import { changeDetail } from "../common/api";

const Comments = ({ category, listId, comment, comments }) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const edit = useSelector((state) => state.comment);
  const checkUser = auth.currentUser ? auth.currentUser.uid === comment.uid : false
  const checkEdit = edit.id === comment.id;
  const [editComment, setEditComment] = useState();

  const commentMutation = useMutation(changeDetail, {
    onSuccess: () => {
      queryClient.invalidateQueries([category, listId]);
    },
  });

  const editHandler = (id, value) => {
    setEditComment(value);
    dispatch(onEdit(id));
  };

  const submitHandler = () => {
    const newComments = comments.map((x) => {
      if (x.id === comment.id) {
        return { ...x, comment: editComment };
      } else {
        return { ...x };
      }
    });
    commentMutation.mutate([category, listId, { comments: newComments }]);
    dispatch(offEdit());
  };

  const deleteComment = () => {
    const newComments = comments.filter((x) => x.id !== comment.id);
    Alert.alert("삭제", "삭제하시겠습니까?", [
      {
        text: "취소",
      },
      {
        text: "삭제",
        onPress: () =>{
          commentMutation.mutate([category, listId, { comments: newComments }])
        }
      },
    ]);
  };

  return (
    <CommentsBox>
      <View style={{ flex: 8, flexDirection: "row" }}>
        <Image
          style={{ width: 60, height: 60, borderRadius: 50, marginRight: 10 }}
          resizeMode="contain"
          source={{ uri: comment.profileImg }}
        />
        <View style={{ width: "75%" }}>
          <View style={{ marginBottom: 6 }}>
            <Text>{comment.nickName}</Text>
          </View>
          <View style={{ justifyContent: "center" }}>
            <DetailText
              style={{
                lineHeight: 27,
                display: checkEdit && edit.isEdit ? "none" : "flex",
              }}
            >
              {comment.comment}
            </DetailText>
            <EditInput
              style={{
                display: checkEdit && edit.isEdit ? "flex" : "none",
                borderRadius: checkEdit && edit.isEdit ? 10 : 0,
              }}
              multiline={true}
              onChangeText={setEditComment}
              defaultValue={comment.comment}
            />
          </View>
        </View>
      </View>
      <EditBtnBox
        style={{
          display: checkUser ? "flex" : "none",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            display: checkEdit && edit.isEdit ? "none" : "flex",
          }}
        >
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() => editHandler(comment.id, comment.comment)}
          >
            <AntDesign name="edit" size={32} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteComment()}>
            <AntDesign name="delete" size={32} color="black" />
          </TouchableOpacity>
        </View>
        <EditCheck
          onPress={() => submitHandler()}
          style={{
            display: checkEdit && edit.isEdit ? "flex" : "none",
          }}
        >
          <AntDesign name="check" size={40} color="black" />
        </EditCheck>
      </EditBtnBox>
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

const EditInput = styled.TextInput`
  width: 100%;
  font-size: 16px;
  border: 1px solid black;
`;

const EditBtnBox = styled.View`
  flex: 2;
`;

const EditCheck = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  justify-content: center;
`;
