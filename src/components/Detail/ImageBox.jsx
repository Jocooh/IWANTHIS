import * as St from "../../styles/styled/Detail.styled";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Alert, Animated, Linking, Text, View } from "react-native";
import { useMutation, useQueryClient } from "react-query";
import { changeDetail } from "../../common/api";
import { auth } from "../../common/firebase";

const ImageBox = ({
  list,
  color,
  category,
  listId,
  from,
  img,
  pickImage,
  pickedImg,
}) => {
  const queryClient = useQueryClient();
  const user = auth.currentUser;
  const checkFromDetail = from === "Detail";

  // 좋아요
  const likeMutation = useMutation(changeDetail, {
    onSuccess: async () => {
      queryClient.invalidateQueries([category, listId]);
    },
  });

  const checkLike = user ? list.like.includes(user.uid) : false;

  const likeHandler = () => {
    let newLike = list.like;
    newLike.push(user.uid);
    likeMutation.mutate([category, listId, { like: newLike }]);
  };

  // Linking
  const url = list.url;
  const openLink = (url) => {
    Alert.alert("이동", `${url}\n이 링크로 이동하시겠습니까?`, [
      {
        text: "취소",
      },
      {
        text: "이동하기",
        onPress: async () => {
          await Linking.openURL(url);
        },
      },
    ]);
  };

  return (
    <St.ImageBox style={{ backgroundColor: color["backColor"] ?? "white" }}>
      <St.ImageLink
        style={{ display: checkFromDetail ? "flex" : "none" }}
        onPress={() => openLink(url)}
        disabled={url === "" ? true : false}
      >
        <Animated.Image
          style={[styles.bg(), { marginLeft: "5%" }]}
          source={!!list.image ? { uri: list.image } : img}
        />
      </St.ImageLink>
      <St.ImageView style={{ display: checkFromDetail ? "none" : "flex" }}>
        <Animated.Image
          style={[styles.bg(), { marginLeft: "5%" }]}
          source={pickedImg ? { uri: pickedImg } : img}
        />
      </St.ImageView>
      <St.ImageBtnBox style={{ backgroundColor: color["fontColor"] ?? "blue" }}>
        <St.LikeBtn
          style={{ display: checkFromDetail ? "flex" : "none" }}
          onPress={() => likeHandler()}
          disabled={user && !checkLike ? false : true}
        >
          <St.LikeBox>
            <View style={{ position: "absolute" }}>
              <AntDesign name={"heart"} size={15} color={color["backColor"]} />
            </View>
            <St.LikeCount>
              <Text style={{ color: "white", fontSize: 25 }}>
                {list.like.length}
              </Text>
            </St.LikeCount>
          </St.LikeBox>
        </St.LikeBtn>
        <St.CameraBtn
          style={{ display: checkFromDetail ? "none" : "flex" }}
          onPress={() => pickImage()}
        >
          <Feather name="camera" size={24} color={color["backColor"]} />
        </St.CameraBtn>
      </St.ImageBtnBox>
    </St.ImageBox>
  );
};

export default ImageBox;

export const styles = {
  bg: () => ({
    width: "90%",
    height: "100%",
    resizeMode: "contain",
  }),
};
