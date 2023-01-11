import {
  ActivityIndicator,
  Alert,
  Animated,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import styled from "@emotion/native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useMutation, useQueries, useQueryClient } from "react-query";
import {
  changeDetail,
  changeMyPost,
  deleteDetail,
  getDetailList,
  getMyPost,
} from "../common/api";
import { auth } from "../common/firebase";
import {
  DetailText,
  ImageBox,
  ImageBtnBox,
  Loader,
  styles,
} from "../styles/styled";
import { defaultImage, height, width } from "../common/util";
import Comments from "../components/Comments";
import CommentForm from "../components/CommentForm";

const Detail = () => {
  const queryClient = useQueryClient();

  // 네비게이션
  const { navigate, goBack } = useNavigation();
  const { params } = useRoute();
  const { category, listId, color, img } = params;
  const user = auth.currentUser;
  const uid = user ? user.uid : "";

  // 카테고리에서 삭제
  const deleteMutation = useMutation(deleteDetail, {
    onSuccess: async () => {
      queryClient.invalidateQueries(category);
      goBack();
    },
  });

  // 마이포스트에서 삭제
  const changeMyPostMutation = useMutation(changeMyPost);

  // 좋아요
  const likeMutation = useMutation(changeDetail, {
    onSuccess: async () => {
      queryClient.invalidateQueries([category, listId]);
    },
  });

  // GET list + mypost
  const results = useQueries([
    { queryKey: [category, listId], queryFn: getDetailList },
    { queryKey: uid ? `?uid=${uid}` : "", queryFn: getMyPost },
  ]);

  const isLoading = results.some((result) => result.isLoading);
  const isError = results.some((result) => result.isError);
  const error = results.some((result) => result.error);
  const data = results.map((result) => result.data);

  if (isLoading) {
    return (
      <Loader>
        <ActivityIndicator size={"large"} />
      </Loader>
    );
  }
  if (isError) return <Text>에러: {error}</Text>;

  const list = data[0];
  const myId = data[1].map((x) => x.id)[0];
  const myPost = data[1].map((x) => x.lists).flat();

  // 가격계산 코드 맨앞이 0일때 제거해야함 귀찮아서 나중에
  let price = list.price.toString();
  if (price >= 100000000) {
    price = `${price.slice(0, -8)}억${price.slice(-8, -4)}만${price.slice(-4)}`;
  } else if (price >= 10000) {
    price = `${price.slice(0, -4)}만${price.slice(-4)}`;
  }

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

  // 삭제
  const deleteHandler = () => {
    Alert.alert("삭제", `정말 삭제하시겠습니까?`, [
      {
        text: "취소",
      },
      {
        text: "삭제",
        onPress: () => {
          const newMyPost = myPost.filter(
            (x) => x.category !== category || x.categoryId !== listId
          );
          changeMyPostMutation.mutate([myId, { lists: newMyPost }]);
          deleteMutation.mutate([category, listId]);
        },
      },
    ]);
  };

  // 좋아요(미완성)
  const checkLike = user ? list.like.includes(uid) : false;

  const likeHandler = () => {
    let newLike = list.like;
    newLike.push(uid);
    likeMutation.mutate([category, listId, { like: newLike }]);
  };

  return (
    <DetailFlat
      ListHeaderComponent={
        <View style={{ width: width }}>
          <ImageBox style={{ backgroundColor: color["backColor"] ?? "white" }}>
            <ImageLink
              onPress={() => openLink(url)}
              disabled={url === "" ? true : false}
            >
              <Animated.Image
                style={[styles.bg(), { marginLeft: "5%" }]}
                source={{ uri: list.image !== "" ? list.image : defaultImage }}
              />
            </ImageLink>
            <ImageBtnBox
              style={{ backgroundColor: color["fontColor"] ?? "blue" }}
            >
              <LikeBtn onPress={() => likeHandler()} disabled={user && !checkLike ? false : true}>
                <LikeBox>
                  <View style={{ position: "absolute" }}>
                    <AntDesign name={"heart"} size={15} color={"#f40584"} />
                  </View>
                  <LikeCount>
                    <Text style={{ color: "white", fontSize: 25 }}>
                      {list.like.length}
                    </Text>
                  </LikeCount>
                </LikeBox>
              </LikeBtn>
            </ImageBtnBox>
          </ImageBox>
          <DetailContainer>
            <DetailTitle>
              <Text
                style={{ fontSize: 32, fontWeight: "bold", marginBottom: "4%" }}
              >
                {list.title}
              </Text>
              <Text style={{ color: "gray", display: !!url ? "flex" : "none" }}>
                ※ 이미지 클릭 시 판매사이트로 이동합니다.
              </Text>
              <DetailBtnBox
                style={{ display: uid === list.uid ? "flex" : "none" }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigate("EditList", {
                      list,
                      color,
                      img,
                      myId,
                      myPost,
                    })
                  }
                >
                  <AntDesign name="edit" size={30} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteHandler()}>
                  <AntDesign name="delete" size={30} color="black" />
                </TouchableOpacity>
              </DetailBtnBox>
            </DetailTitle>
            <PriceBox>
              <MaterialIcons name="attach-money" size={24} color="yellow" />
              <DetailText>{price}원</DetailText>
            </PriceBox>
            <PriceBox style={{ marginBottom: "15%" }}>
              <MaterialCommunityIcons name="typewriter" size={24} color="red" />
              <DetailText>{list.content}</DetailText>
            </PriceBox>
          </DetailContainer>
          <CommentForm
            category={category}
            listId={listId}
            comments={list.comments}
          />
        </View>
      }
      data={list.comments}
      renderItem={({ item }) => (
        <Comments
          category={category}
          listId={listId}
          comments={list.comments}
          comment={item}
        />
      )}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={<View style={{ height: 10 }} />}
    />
  );
};

export default Detail;

const DetailFlat = styled.FlatList`
  position: relative;
  width: ${width + "px"};
  height: ${height + "px"};
`;

const ImageLink = styled.TouchableOpacity`
  align-content: center;
  width: 100%;
  height: 95%;
`;

const LikeBtn = styled.TouchableOpacity`
  position: absolute;
  width: 45px;
  height: 40px;
  margin-top: 30%;
  margin-left: 10%;
`;

const LikeBox = styled.View`
  flex-direction: row;
  align-items: center;
  position: relative;
  margin-top: 25%;
  margin-left: 10%;
`;

const LikeCount = styled.View`
  position: absolute;
  margin-left: 40%;
  margin-top: 10%;
`;

const DetailContainer = styled.View`
  flex-direction: column;
  justify-content: space-between;
  margin-top: 15%;
  margin-left: 5%;
  margin-right: 5%;
`;

const DetailTitle = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

const DetailBtnBox = styled.TouchableOpacity`
  margin-top: 7%;
  flex-direction: row;
`;

const PriceBox = styled.View`
  flex-direction: row;
  margin-top: 10%;
  width: 95%;
`;
