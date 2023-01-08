import { useState } from "react";
import styled from "@emotion/native";
import { auth } from '../common/firebase';
import { useMutation, useQueryClient } from 'react-query';
import { postComment } from '../common/api';

const CommentForm = ({category, listId}) => {
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();
  const user = auth.currentUser
  const defaultImage = "https://firebasestorage.googleapis.com/v0/b/iwanthis-ab4f5.appspot.com/o/defaultimage.png?alt=media&token=61bf18ff-c593-4aa2-9580-21e4e04e0e4d"

  const commentMutation = useMutation(postComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("comments");
    },
  });

  const newComment = {
    uid: "",
    profileImg: `${user ? user.photoURL : defaultImage}`,
    nickName: `${user ? user.displayName : "익명"}`,
    comment,
  }

  const addComment = () => {
    commentMutation.mutate([category, listId, newComment])
    setComment("")
  }

  return (
    <CommentInputBox style={{display: `${!user ? "flex" : "none"}`}}>
      <CommentInput
        placeholder="댓글을 입력해주세요"
        name="comments"
        onSubmitEditing={addComment}
        onChangeText={setComment}
        value={comment}
      />
    </CommentInputBox>
  );
};

export default CommentForm;

const CommentInputBox = styled.View`
  justify-content: center;
  width: 95%;
  height: 50px;
  margin: 0 auto 20px;
  border: 1px solid black;
  border-radius: 16px;
`;

const CommentInput = styled.TextInput`
  padding: 10px;
  font-size: 16px;
  line-height: 20px;
  word-break: break-all;
`;
