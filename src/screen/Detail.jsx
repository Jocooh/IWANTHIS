import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import {
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useMutation, useQueries, useQueryClient } from "react-query";
import {
  changeMyPost,
  deleteDetail,
  getDetailList,
  getMyPost,
} from "../common/api";
import { auth } from "../common/firebase";
import { width } from "../common/util";
import { Loader } from "../styles/styled";
import * as St from "../styles/styled/Detail.styled";
import ImageBox from "../components/Detail/ImageBox";
import CommentForm from "../components/Detail/CommentForm";
import Comments from "../components/Detail/Comments";

const Detail = () => {
  const queryClient = useQueryClient();
  // 다크모드
  const isDark = useColorScheme() === "dark";
  const backColor = isDark ? "#605e58" : "white";
  const fontColor = isDark ? "#dad8d1" : "black";

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
    },
  });

  // 마이포스트에서 삭제
  const changeMyPostMutation = useMutation(changeMyPost);

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
  if (isError) return <Text>에러: {error.message}</Text>;

  const list = data[0];
  const myId = data[1].map((x) => x.id)[0];
  const myPost = data[1].map((x) => x.lists).flat();

  // 가격계산 코드
  let price = list.price.toString();
  if (price >= 100000000) {
    price = `${price.slice(0, -8)}억${price.slice(-8, -4)}만${price.slice(-4)}`;
  } else if (price >= 10000) {
    price = `${price.slice(0, -4)}만${price.slice(-4)}`;
  }

  // 삭제
  const deleteHandler = () => {
    Alert.alert("게시글 삭제", `정말 삭제하시겠습니까?`, [
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
          goBack();
        },
      },
    ]);
  };

  return (
    <St.DetailFlat
      style={{ backgroundColor: backColor }}
      removeClippedSubviews={false}
      ListHeaderComponent={
        <View style={{ width: width }}>
          <ImageBox
            color={color}
            list={list}
            category={category}
            listId={listId}
            from="Detail"
            img={img}
          />
          <St.DetailContainer>
            <St.DetailTitle>
              <St.DetailHeader style={{ color: fontColor }}>
                {list.title}
              </St.DetailHeader>
              <Text
                style={{
                  color: isDark ? "#9b988a" : "gray",
                  display: !!list.url ? "flex" : "none",
                }}
              >
                ※ 이미지 클릭 시 판매사이트로 이동합니다.
              </Text>
              <St.DetailBtnBox
                style={{ display: uid === list.uid ? "flex" : "none" }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigate("EditList", { list, color, img, myId, myPost })
                  }
                >
                  <AntDesign name="edit" size={30} color={fontColor} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteHandler()}>
                  <AntDesign name="delete" size={30} color={fontColor} />
                </TouchableOpacity>
              </St.DetailBtnBox>
            </St.DetailTitle>
            <St.PriceBox>
              <MaterialIcons name="attach-money" size={24} color="yellow" />
              <St.DetailText style={{ color: fontColor }}>
                {price}원
              </St.DetailText>
            </St.PriceBox>
            <St.PriceBox style={{ marginBottom: "15%" }}>
              <MaterialCommunityIcons name="typewriter" size={24} color="red" />
              <St.DetailText style={{ color: fontColor }}>
                {list.content}
              </St.DetailText>
            </St.PriceBox>
          </St.DetailContainer>
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
