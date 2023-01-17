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
import React, { useState, useRef } from "react";
import { Feather } from "@expo/vector-icons";
import { useQuery } from "react-query";
import { listImagePath } from "../assets/imgPath";
import * as St from "../styles/styled/Lists.styled";
import CpList from "../components/Lists/CpList";
import NoList from "../components/Lists/NoList";
import { useBackColor } from "../hooks/useDarkMode";
import { Loader } from "../styles/styled/Common.styled";

const Lists = ({
  navigation: { navigate },
  route: {
    params: { category, color },
  },
}) => {
  const [lists, setLists] = useState([]);
  const scrollA = useRef(new Animated.Value(0)).current;
  const [order, setOrder] = useState(0);
  // 다크모드
  const [backColor] = useBackColor("black", "white");

  console.log(backColor);

  const { isLoading, isError, data, error } = useQuery([category], getLists);

  if (isLoading) {
    return (
      <Loader>
        <ActivityIndicator size={"small"} />
      </Loader>
    );
  }
  if (isError) return alert("잠시 후 다시 실행해주세요", error);

  //최신순 불러오는 함수
  const currentList = () => {
    const desc = data.sort(function (a, b) {
      return b.id - a.id;
    });
    setLists((prev) => [...prev], desc);
  };

  //좋아용 불러오는 함수
  const likeList = () => {
    const iLike = data.sort(function (a, b) {
      let lengthB = b.like.length;
      let lengthA = a.like.length;
      return lengthB - lengthA;
    });
    setLists((prev) => [...prev], iLike);
  };

  const handleAdding = () => {
    const isLogin = !!auth.currentUser;
    if (!isLogin) {
      navigate("Login");
      return;
    }
    navigate("WriteList", {
      category: category,
      color: color,
      img: listImagePath[category],
      id: data.length > 0 ? data[0].id + 1 : 1,
    });
  };

  // 전체 리스트
  return (
    <View style={{ backgroundColor: color["backColor"] }} scrollA={scrollA}>
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
        <St.ListTitle style={{ color: color["fontColor"] }}>
          {category.toUpperCase()}
        </St.ListTitle>

        <View style={{ paddingHorizontal: "10%" }}>
          <Animated.Image
            style={styles.bg(scrollA)}
            source={listImagePath[category]}
          />
        </View>
        {/* 흰색 배경 */}
        <St.ListBackground style={{ backgroundColor: backColor }}>
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
          {data.length <= 0 ? (
            <NoList></NoList>
          ) : (
            <ScrollView>
              {data.map((list) => (
                <CpList
                  list={list}
                  id={list.id}
                  color={color}
                  navigation={navigate}
                  img={listImagePath[category]}
                  key={list.id}
                ></CpList>
              ))}
            </ScrollView>
          )}
        </St.ListBackground>
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
