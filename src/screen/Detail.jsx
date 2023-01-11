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
import { AntDesign } from "@expo/vector-icons";
import CommentForm from "../components/CommentForm";
import { auth } from "../common/firebase";

const Detail = ({ category2, id }) => {
  const { params } = useRoute();
  const queryClient = useQueryClient();
  const user = auth.currentUser;
  const uid = user ? user.uid : "";
  const category = params.category;
  const listId = params.id;
  const defaultImage =
    "https://firebasestorage.googleapis.com/v0/b/iwanthis-ab4f5.appspot.com/o/%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C2.png?alt=media&token=91835443-d923-4a96-9117-387ee53df48d";

  const likeMutation = useMutation(changeDetail, {
    onSuccess: async () => {
      queryClient.invalidateQueries([category, listId]);
    },
  });

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

  const likeHandler = () => {
    let newLike = data.like;
    newLike.push(uid);
    likeMutation.mutate([category, listId, { like: newLike }]);
  };

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

  return (
    <DetailFlat
      ListHeaderComponent={
        <>
          <DetailTitle>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
              {data.title}
            </Text>
          </DetailTitle>
          <DetailBtnBox style={{ display: uid === data.uid ? "flex" : "none" }}>
            <TouchableOpacity style={{ marginRight: 10 }}>
              <AntDesign name="edit" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <AntDesign name="delete" size={30} color="black" />
            </TouchableOpacity>
          </DetailBtnBox>
          <NotifyBox>
            <Text style={{ color: "gray" }}>
              ※ 이미지 클릭 시 판매사이트로 이동합니다.
            </Text>
          </NotifyBox>
          <TouchableOpacity
            onPress={() => openLink(url)}
            disabled={url === "" ? true : false}
          >
            <ProductImage
              source={{ uri: data.image !== "" ? data.image : defaultImage }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <PriceBox>
            <DetailText>가격</DetailText>
            <DetailText>{price}원</DetailText>
          </PriceBox>
          <ProductInfoBox>
            <DetailText>{data.content}</DetailText>
          </ProductInfoBox>
          <LikeBtn
            onPress={() => likeHandler()}
            style={{ display: user && !checkLike ? "flex" : "none" }}
          >
            <AntDesign name="hearto" size={24} color="red" />
            <Text>{data.like.length}</Text>
          </LikeBtn>
          <LikeSee style={{ display: !user || checkLike ? "flex" : "none" }}>
            <AntDesign
              style={{ marginRight: 5 }}
              name="hearto"
              size={24}
              color="red"
            />
            <Text>{data.like.length}</Text>
          </LikeSee>
          <CommentForm
            category={category}
            listId={listId}
            comments={data.comments}
          />
        </>
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
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
`;

const DetailBtnBox = styled.TouchableOpacity`
  position: absolute;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 95%;
  height: 60px;
`;

const NotifyBox = styled.View`
  width: 95%;
  margin: auto;
`;

const ProductImage = styled.Image`
  width: 95%;
  height: 300px;
  margin: auto;
  border-radius: 16px;
`;

const PriceBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 95%;
  margin: 20px auto;
`;

const ProductInfoBox = styled.View`
  width: 95%;
  margin: auto;
  padding: 0 10px 0 10px;
`;

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
  justify-content: flex-end;
  width: 95%;
  margin: 20px auto;
`;
