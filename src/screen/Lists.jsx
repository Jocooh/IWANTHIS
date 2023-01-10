import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from "react-native";
import { auth } from "../common/firebase";
import { getLists } from "../common/api";
import React, { useState, useEffect, useRef } from "react";
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

const Lists = ({
  navigation: { navigate },
  route: {
    params: { category, color },
  },
}) => {
  const [lists, setLists] = useState([]);
  const scrollA = useRef(new Animated.Value(0)).current;
  const [order, setOrder] = useState(0);

  useEffect(() => {
    setLists(category);
  }, []);

  const { isLoading, isError, data, error } = useQuery([category], getLists);

  if (isLoading) {
    return (
      <Loader>
        <ActivityIndicator size={"small"} />
      </Loader>
    );
  }
  if (isError) return console.log("에러", error);

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

  // 전체 리스트
  return (
    <View style={{ backgroundColor: color }} scrollA={scrollA}>
      {/* 글쓰기 버튼 */}
      <TouchableOpacity
        style={{
          flexDirection: "row-reverse",
          paddingHorizontal: 15,
        }}
        onPress={handleAdding}
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
        <ListTitle>{category}</ListTitle>

        <View style={{ paddingHorizontal: "10%" }}>
          {listImagePath[category].map((image) => (
            <Animated.Image style={styles.bg(scrollA)} source={image} />
          ))}
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
            {data.map((list) => (
              <TouchableOpacity
                onPress={() => {
                  navigate("Detail", { name: Detail });
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
                  {/* 이미지 들어가는 부분  - auth 이용 */}
                  <View style={{ marginVertical: -5 }}>
                    <ListImage source={require("../assets/defaultimage.png")} />
                  </View>
                </ListStyle>
              </TouchableOpacity>
            ))}
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

export default Lists;
