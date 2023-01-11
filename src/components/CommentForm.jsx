import { useState } from "react";
import styled from "@emotion/native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useMutation, useQueryClient } from "react-query";
import { auth } from "../common/firebase";
import { changeDetail } from "../common/api";

const CommentForm = ({ category, listId, comments }) => {
  const [comment, setComment] = useState("");
  const lists = comments;
  const queryClient = useQueryClient();
  const user = auth.currentUser;
  const defaultImage =
    "https://firebasestorage.googleapis.com/v0/b/iwanthis-ab4f5.appspot.com/o/defaultimage.png?alt=media&token=61bf18ff-c593-4aa2-9580-21e4e04e0e4d";

  const commentMutation = useMutation(changeDetail, {
    onSuccess: () => {
      queryClient.invalidateQueries([category, listId]);
    },
  });

  const newComment = {
    id: Number(`${lists.length !== 0 ? lists[lists.length - 1].id + 1 : 1}`),
    uid: `${user ? user.uid : ""}`,
    profileImg: `${user.photoURL && user ? user.photoURL : defaultImage}`,
    nickName: `${user.displayName && user ? user.displayName : "익명"}`,
    comment,
  };

  const addComment = () => {
    if (comment.trim() === "") {
      alert("내용을 입력해주세요");
      return;
    }
    commentMutation.mutate([
      category,
      listId,
      { comments: [...lists, newComment] },
    ]);
    setComment("");
  };

  return (
    <CommentInputBox style={{ display: `${user ? "flex" : "none"}` }}>
      <CommentInput
        multiline={true}
        placeholder="댓글을 입력해주세요"
        name="comments"
        onChangeText={setComment}
        value={comment}
      />
      <TouchableOpacity onPress={addComment}>
        <AntDesign name="plussquare" size={30} color="black" />
      </TouchableOpacity>
    </CommentInputBox>
  );
};

export default CommentForm;

const CommentInputBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  padding: 0 10px 0;
  margin: 0 auto 20px;
  border: 1px solid black;
  border-radius: 16px;
`;

const CommentInput = styled.TextInput`
  width: 92%;
  padding: 10px;
  font-size: 16px;
  line-height: 20px;
  word-break: break-all;
`;
