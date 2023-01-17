import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "react-query";
import { offEdit, onEdit } from "../../redux/modules/commentSlice";
import { auth } from "../../common/firebase";
import { changeDetail } from "../../common/api";
import { listImagePath } from "../../assets/imgPath";
import * as St from "../../styles/styled/Detail.styled";
import { useFontColor } from "../../hooks/useDarkMode";

const Comments = ({ category, listId, comment, comments }) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const edit = useSelector((state) => state.comment);
  const user = auth.currentUser;
  const checkUser = user ? user.uid === comment.uid : false;
  const checkEdit = edit.id === comment.id;
  // 다크모드
  const [fontColor, isDark] = useFontColor("#dad8d1", "black");

  // 수정
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
    Alert.alert("댓글 삭제", "정말 삭제하시겠습니까?", [
      {
        text: "취소",
        onPress: () => {
          setEditComment(comment.comment);
        },
      },
      {
        text: "삭제",
        onPress: () => {
          commentMutation.mutate([category, listId, { comments: newComments }]);
        },
      },
    ]);
  };

  return (
    <St.CommentsBox style={{ borderBottomColor: fontColor }}>
      <View style={{ flex: 8, flexDirection: "row" }}>
        <St.ProfileImage
          resizeMode="contain"
          source={
            !!comment.profileImg
              ? { uri: comment.profileImg }
              : listImagePath["defaultimage"]
          }
        />
        <View style={{ width: "75%" }}>
          <View style={{ marginBottom: 6 }}>
            <Text style={{ color: fontColor }}>{comment.nickName}</Text>
          </View>
          <View style={{ justifyContent: "center" }}>
            <St.DetailText
              style={{
                color: fontColor,
                lineHeight: 27,
                display: checkEdit && edit.isEdit ? "none" : "flex",
              }}
            >
              {comment.comment}
            </St.DetailText>
            <St.EditInput
              style={{
                color: fontColor,
                display: checkEdit && edit.isEdit ? "flex" : "none",
                borderColor: fontColor,
                borderRadius: checkEdit && edit.isEdit ? 10 : 0,
              }}
              placeholderTextColor={isDark ? "#9b988a" : "gray"}
              multiline={true}
              onChangeText={setEditComment}
              defaultValue={comment.comment}
            />
          </View>
        </View>
      </View>
      <St.EditBtnBox style={{ display: checkUser ? "flex" : "none" }}>
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
            <AntDesign name="edit" size={32} color={fontColor} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteComment()}>
            <AntDesign name="delete" size={32} color={fontColor} />
          </TouchableOpacity>
        </View>
        <St.EditCheck
          onPress={() => submitHandler()}
          style={{ display: checkEdit && edit.isEdit ? "flex" : "none" }}
        >
          <AntDesign name="check" size={40} color={fontColor} />
        </St.EditCheck>
      </St.EditBtnBox>
    </St.CommentsBox>
  );
};

export default Comments;
