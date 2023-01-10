import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Image,
  Animated,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { changeMyPost, getUsers, postList, postMy } from "../common/api";
import { width, height } from "../common/util";
import { Feather, AntDesign } from "@expo/vector-icons";

import styled from "@emotion/native";

const WriteList = ({
  route: {
    params: { color, img },
  },
}) => {
  const { goBack } = useNavigation();
  const { params } = useRoute();
  const queryClient = useQueryClient();
  const category = params.category;
  const id = params.id;
  const uid = "123";

  const { isLoading, isError, data, error } = useQuery("users", getUsers);

  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let day = now.getDate();
  let hour = now.getHours();
  let minute = now.getMinutes();

  const postMutation = useMutation(postList, {
    onSuccess: async () => {
      queryClient.invalidateQueries(category);
    },
  });
  const myPostMutation = useMutation(postMy);

  const changeMyPostMutation = useMutation(changeMyPost);

  if (isLoading) return <Text>로딩중...</Text>;

  if (isError) return <Text>error: {error}</Text>;

  const my = data.filter((x) => x.uid === uid);
  const myId = my.map((x) => x.id)[0];
  const myLists = my.map((x) => x.lists).flat();
  const listId = myLists.length + 1;
  const check = myLists.length > 0;

  const list = {
    uid,
    url: "",
    category,
    title: "test",
    content: "testest",
    image: "",
    date: `${year}-${month > 9 ? month : "0" + month}-${
      day > 9 ? day : "0" + day
    } ${hour > 9 ? hour : "0" + hour}:${minute > 9 ? minute : "0" + minute}`,
    like: 0,
    price: 150000000,
    comments: [],
  };

  const lists = [
    {
      id: listId,
      category,
      categoryId: id,
      title: "test",
      content: "testest",
      image: "",
      price: 150000000,
    },
  ];

  const myList = {
    id: listId,
    category,
    categoryId: id,
    title: "test",
    content: "testest",
    image: "",
    price: 150000000,
  };

  const addList = () => {
    if (!check) {
      myPostMutation.mutate({ uid, lists });
    } else {
      changeMyPostMutation.mutate([myId, { lists: [...myLists, myList] }]);
    }
    postMutation.mutate([category, list]);
    goBack();
  };

  return (
    <ScrollView>
      <View
        style={{
          width: width,
        }}
      >
        <View
          style={{
            backgroundColor: color["backColor"],
            height: 350,
            flexDirection: "row",
            position: "relative",
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 50,
          }}
        >
          <View
            style={{
              alignContent: "center",

              height: "95%",
              width: "100%",
            }}
          >
            {/* <Image source={img} style={{ width: 100 }}></Image> */}
            <Animated.Image
              style={[styles.bg(), { marginLeft: "5%" }]}
              source={img}
            />
          </View>

          <View
            style={{
              position: "absolute",
              zIndex: 1,
              top: "93%",
              right: "45%",
              height: 50,
              width: 50,
              borderRadius: "100%",
              backgroundColor: color["fontColor"],
            }}
          >
            <TouchableOpacity
              style={{
                height: 40,
                width: 40,
                marginTop: "23%",

                marginLeft: "26%",
              }}
            >
              <Feather
                name="camera"
                size={24}
                color={color["backColor"]}
                //style={{ padding: 10 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <InfoView>
          <InputZone
            placeholder="상품명"
            style={{ marginTop: "2%" }}
          ></InputZone>
          <InputZone placeholder="가격" style={{ fontSize: 17 }}></InputZone>
          <InputZone
            placeholder="판매링크"
            style={{ fontSize: 17 }}
          ></InputZone>

          <InputZone
            placeholder="설명"
            style={{
              height: 300,

              fontSize: 17,
              marginBottom: 10,
            }}
          ></InputZone>
          <View
            style={{
              flexDirection: "row",
              height: 50,
              width: "100%",
            }}
          >
            <TouchableOpacity
              onPress={addList}
              style={{
                backgroundColor: color["backColor"],
                width: "50%",
                borderRadius: "40%",
                // margin: 10,
              }}
            >
              <Feather
                name="check"
                size={24}
                color={color["fontColor"]}
                style={{ paddingTop: "7%", paddingLeft: "43%" }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: color["backColor"],
                width: "50%",
                borderRadius: "40%",
              }}
            >
              <AntDesign
                name="close"
                size={24}
                color={color["fontColor"]}
                style={{ paddingTop: "7%", paddingLeft: "43%" }}
              />
            </TouchableOpacity>
          </View>
        </InfoView>
      </View>
    </ScrollView>
  );
};

const InputZone = styled.TextInput`
  margin-bottom: 15px;

  height: 40px;
  font-size: 25px;
`;
const InfoView = styled.View`
  margin: 4% 5% 5% 5%;
`;
const styles = {
  bg: () => ({
    width: "90%",
    height: "100%",
    resizeMode: "contain",
    // transform: [
    //   {
    //     translateY: scrollA,
    //   },
    // ],
  }),
};
export default WriteList;
