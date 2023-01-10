import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Image,
} from "react-native";
import { auth } from "../common/firebase";
import { getLists } from "../common/api";
import React, { useState, useRef } from "react";
import { Feather } from "@expo/vector-icons";
import WriteList from "./WriteList";
import Detail from "./Detail";
import {
  ListBackground,
  ListImage,
  ListStyle,
  Loader,
  ListTitle,
} from "../styles/styled";
import { useQuery } from "react-query";
import { listImagePath } from "../assets/imgPath";
import styled from "@emotion/native";
const Lists = ({
  navigation: { navigate },
  route: {
    params: { category, color },
  },
}) => {
  const [lists, setLists] = useState([]);
  const scrollA = useRef(new Animated.Value(0)).current;
  const [order, setOrder] = useState(0);

  const { isLoading, isError, data, error } = useQuery([category], getLists);
  console.log("확인중 :", data);
  if (isLoading) {
    return (
      <Loader>
        <ActivityIndicator size={"small"} />
      </Loader>
    );
  }
  if (isError) return alert("잠시 후 다시 실행해주세요", error);

  //글쓰기버튼 터치 시 로그인- 글쓰러가기, 비로그인 - 로그인창으로가기
  const handleAdding = async () => {
    const isLogin = !!auth.currentUser;
    if (!isLogin) {
      navigate("Login");
      return;
    }
    navigate("WriteList");
  };

  //최신순 불러오는 함수
  const currentList = () => {
    const desc = data.sort(function (a, b) {
      return b.id - a.id;
    });
    setLists(desc);
  };

  //좋아용 불러오는 함수
  const likeList = () => {
    const iLike = data.sort(function (a, b) {
      return b.like - a.like;
    });
    setLists(iLike);
  };

  // //로그인 시 글작성페이지, 비로그인 시 로그인창   ---> 로그아웃기능 후에 확인 가능할듯
  // const handleAdding = () => {
  //   const isLogin = !!auth.currentUser;
  //   if (!isLogin) {
  //     navigate("Login");
  //     return;
  //   }
  //   navigate("WriteList", {
  //     category: category,
  //     color: color,
  //     img: listImagePath[category],
  //     id: data[data.length - 1].id + 1,
  //   });
  // };

  // 전체 리스트
  return (
    <View style={{ backgroundColor: color["backColor"] }} scrollA={scrollA}>
      {/* 글쓰기 버튼 */}
      <TouchableOpacity
        style={{
          flexDirection: "row-reverse",
          paddingHorizontal: 15,
        }}
        onPress={() => {
          navigate("WriteList", {
            category: category,
            color: color,
            img: listImagePath[category],
            id: data[data.length - 1].id + 1,
          });
        }}
      >
        <Feather
          name="pen-tool"
          size={24}
          color="black"
          style={{ padding: 10 }}
        />
      </TouchableOpacity>
      <Animated.ScrollView
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { y: scrollA } },
            },
          ],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <ListTitle style={{ color: color["fontColor"] }}>
          {category.toUpperCase()}
        </ListTitle>

        <View style={{ paddingHorizontal: "10%" }}>
          <Animated.Image
            style={styles.bg(scrollA)}
            source={listImagePath[category]}
          />
        </View>
        {/* 흰색 배경 */}
        <ListBackground>
          <View
            style={{
              justifyContent: "flex-end",
              flexDirection: "row",
              padding: 10,
            }}
          >
            {/* 최신글 인기순  */}
            <TouchableOpacity style={{ marginRight: 10 }} onPress={currentList}>
              <View>
                <Text>최신순</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginRight: 10 }} onPress={likeList}>
              <View>
                <Text>인기순</Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* 여기는 리스트 들어가는 구간 props받고 바로 map */}
          <ScrollView>
            {data.length <= 1 ? (
              <NoList>
                <Image
                  source={require("../assets/listImage/no.png")}
                  style={{
                    width: 150,
                    height: 150,
                    resizeMode: "contain",
                  }}
                />
                <Text style={{ fontWeight: "bold" }}>
                  등록된 리뷰가 없어요 🔥
                </Text>
              </NoList>
            ) : (
              data.map((list) => (
                <TouchableOpacity
                  onPress={() => {
                    navigate("Detail", { category: category, id: list.id });
                  }}
                  key={list.id}
                >
                  <ListStyle>
                    <View>
                      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                        {list.title}
                      </Text>
                      <Text style={{ paddingVertical: 10 }}>{list.date}</Text>
                    </View>
                    {/* 유저프로필대신 상품 이미지 */}
                    <View style={{ marginVertical: -5 }}>
                      <ListImage source={list.image} />
                    </View>
                  </ListStyle>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        </ListBackground>
      </Animated.ScrollView>
    </View>
  );
};

const styles = {
  bg: (scrollA) => ({
    width: 300,
    height: 150,
    resizeMode: "contain",
    transform: [
      {
        translateY: scrollA,
      },
    ],
  }),
};

const NoList = styled.View`
  align-items: center;
  margin-top: 50px;
`;

export default Lists;
