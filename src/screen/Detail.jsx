import {
  ActivityIndicator,
  Alert,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "@emotion/native";
import { height, width } from "../common/util";
import { useRoute } from "@react-navigation/native";
import { changeDetail, getDetailList } from "../common/api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { DetailText, Loader } from "../styles/styled";
import Comments from "../components/Comments";
import {
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import CommentForm from "../components/CommentForm";
import { auth } from "../common/firebase";
import { ImageView } from "../components/ImageView";
const Detail = () => {
  const { params } = useRoute();
  const queryClient = useQueryClient();
  const user = auth.currentUser;
  const uid = user ? user.uid : "";
  const category = params.category;
  const listId = params.id;

  const likeMutation = useMutation(changeDetail, {
    onSuccess: async () => {
      queryClient.invalidateQueries([category, listId]);
    },
  });

  const likeHandler = () => {
    let newLike = data.like;
    newLike.push(uid);
    console.log(newLike);
    likeMutation.mutate([category, listId, { like: newLike }]);
  };

  const { isLoading, isError, data, error } = useQuery(
    [category, listId],
    getDetailList
  );

  if (isLoading) {
    return (
      <Loader>
        <ActivityIndicator size={"large"} />
      </Loader>
    );
  }
  if (isError) return <Text>에러: {error}</Text>;

  const checkLike = user ? data.like.includes(uid) : false;

  // 가격계산 코드 맨앞이 0일때 제거해야함 귀찮아서 나중에
  let price = data.price.toString();
  if (price >= 100000000) {
    price = `${price.slice(0, -8)}억${price.slice(-8, -4)}만${price.slice(-4)}`;
  } else if (price >= 10000) {
    price = `${price.slice(0, -4)}만${price.slice(-4)}`;
  }

  // Linking
  const url = data.url;
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

  console.log(data);
  return (
    <DetailFlat
      ListHeaderComponent={
        <View
          style={{
            width: width,
          }}
        >
          <ImageView
            color={params.color}
            from={"detail"}
            handler={likeHandler}
            data={data.like.length}
          />
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
              marginTop: "15%",
              marginLeft: "5%",
              marginRight: "5%",
            }}
          >
            <DetailTitle>
              <Text
                style={{ fontSize: 32, fontWeight: "bold", marginBottom: "4%" }}
              >
                {data.title}
              </Text>
              <Text style={{ color: "gray" }}>
                ※ 이미지 클릭 시 판매사이트로 이동합니다.
              </Text>
              <DetailBtnBox
                style={{ display: uid === data.uid ? "flex" : "none" }}
              >
                <TouchableOpacity style={{}}>
                  <AntDesign name="edit" size={30} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <AntDesign name="delete" size={30} color="black" />
                </TouchableOpacity>
              </DetailBtnBox>
            </DetailTitle>

            <NotifyBox></NotifyBox>
            <TouchableOpacity
              onPress={() => openLink(url)}
              disabled={url === "" ? true : false}
            ></TouchableOpacity>
            <PriceBox>
              <MaterialIcons name="attach-money" size={24} color="yellow" />
              <DetailText>{price}원</DetailText>
            </PriceBox>
            <PriceBox style={{ marginBottom: "15%" }}>
              <MaterialCommunityIcons name="typewriter" size={24} color="red" />
              <DetailText>{data.content}</DetailText>
            </PriceBox>
          </View>
          <CommentForm
            category={category}
            listId={listId}
            comments={data.comments}
          />
        </View>
      }
      data={data.comments}
      renderItem={({ item }) => (
        <Comments
          category={category}
          listId={listId}
          comments={data.comments}
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

const DetailTitle = styled.View`
  flex-direction: "column";
  justify-content: center;
  align-items: center;

  width: 100%;
`;

const DetailBtnBox = styled.TouchableOpacity`
  margin-top: 7%;
  flex-direction: row;
`;

const NotifyBox = styled.View`
  width: 95%;
  margin: auto;
`;

const ProductImage = styled.Image`
  height: 100%;
  width: 100%;
  flex-direction: "row";
  border-bottom-left-radius: 40%;
  border-bottom-right-radius: 40%;
`;

const PriceBox = styled.View`
  flex-direction: row;
  margin-top: 10%;

  width: 95%;
`;

const ProductInfoBox = styled.View``;

const LikeBtn = styled.TouchableOpacity`
  width: 75px;
  height: 75px;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
  border-radius: 50px;
  border: 1px solid black;
`;

const LikeSee = styled.View`
  flex-direction: row;
  //height: 100%;

  //width: 95%;
  position: "absolute";
  z-index: 10;
`;
