import {
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Text,
} from "react-native";
import { auth } from "../../common/firebase";
import { useQuery } from "react-query";
import { Loader } from "../../styles/styled";
import { getMyPost } from "../../common/api";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../Category";
import { listImagePath } from "../../assets/imgPath";
import * as St from "../../styles/styled/MyPage.styled";

const WishListArea = () => {
  const { navigate } = useNavigation();

  const user = auth.currentUser;
  const uid = user.uid;

  const { isLoading, isError, data, error } = useQuery(
    [uid ? `?uid=${uid}` : ""],
    getMyPost
  );

  if (isLoading) {
    return (
      <Loader>
        <ActivityIndicator size={"large"} />
      </Loader>
    );
  }
  if (isError) return <Text>에러: {error.message}</Text>;

  const lists = !!data.length ? data[0].lists : false;

  return (
    <View>
      <St.MyWishListArea>
        <View>
          <St.MyPageTitleTxt style={{ marginRight: 200, fontSize: 23 }}>
            🦋Wish List
          </St.MyPageTitleTxt>
          <St.UnderLine style={{ marginHorizontal: 10 }} />
          <ScrollView horizontal={true}>
            {lists
              ? lists.map((list) => {
                  return (
                    <TouchableOpacity
                      key={list.id}
                      onPress={() => {
                        navigate("Detail", {
                          category: list.category,
                          listId: list.categoryId,
                          color: colors[list.category],
                          img: listImagePath[list.category],
                        });
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: `${list.color}`,
                          marginLeft: 10,
                          marginVertical: 20,
                        }}
                      >
                        <St.MyItemPicSt
                          source={
                            !!list.image
                              ? { uri: list.image }
                              : listImagePath[list.category]
                          }
                        />
                        <St.MyItemInfoSt>
                          <St.MyPageTxt> {list.title} </St.MyPageTxt>
                          <St.MyPageTxt2> {list.price}원 </St.MyPageTxt2>
                          <St.MyPageTxt2>
                            📝 {list.content.slice(0, 7)}
                            {list.content.length > 7 && "..."}
                          </St.MyPageTxt2>
                        </St.MyItemInfoSt>
                      </View>
                    </TouchableOpacity>
                  );
                })
              : null}
          </ScrollView>
        </View>
      </St.MyWishListArea>
    </View>
  );
};

export default WishListArea;
