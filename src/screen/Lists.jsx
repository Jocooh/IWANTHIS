import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from "react-native";
// import { auth } from "../common/firebase"; //auth 들고옴
import { getLists } from "../common/api";
import React, { useState, useEffect, useRef } from "react";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import WriteList from "./WriteList";
import {
  ListBackground,
  ListImage,
  ListStyle,
  Loader,
  ListTitle,
} from "../styles/styled";
import Detail from "./Detail";
import { useQuery } from "react-query";
import { isFulfilled } from "@reduxjs/toolkit";

const Lists = ({
  navigation: { navigate },
  route: {
    params: { category, color, categories },
  },
}) => {
  const [lists, setLists] = useState([]);
  const scrollA = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // console.log("home에서 내려온 params", category);
    setLists(category);
  }, []);

  const { isLoading, isError, data, error } = useQuery([category], getLists);
  // console.log(data);
  if (isLoading) {
    return (
      <Loader>
        <ActivityIndicator size={"small"} />
      </Loader>
    );
  }
  if (isError) return console.log("에러", error);

  const currentList = async () => {
    const { data } = await axios.get(
      "https://glitch.com/edit/#!/regal-roomy-skunk?path=db.json"
    );
    console.log(data.data);
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
        onPress={() => {
          navigate("WriteList", { name: WriteList });
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
        <ListTitle>{category}</ListTitle>

        <View style={{ paddingHorizontal: "10%" }}>
          <Animated.Image
            style={styles.bg(scrollA)}
            // 물어보기
            source={require("../assets/nike.png")}
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
            <TouchableOpacity style={{ marginRight: 10 }}>
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
