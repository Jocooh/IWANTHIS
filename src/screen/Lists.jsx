import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
// import { auth } from "../common/firebase"; //auth 들고옴
import React, { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import WriteList from "./WriteList";
import { ListBackground, ListImage, ListStyle, Loader } from "../styles/styled";
import Detail from "./Detail";
import { useEffect } from "react";
import { getLists } from "../common/api";
import { useQuery } from "react-query";

const Lists = ({
  navigation: { navigate },
  route: {
    params: { category, color },
  },
}) => {
  const [lists, setLists] = useState([]);
  useEffect(() => {
    console.log("home에서 내려온 params", category);
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

  // 전체 리스트
  return (
    <SafeAreaView style={{ backgroundColor: color }}>
      <ScrollView>
        {/* 글쓰기 버튼 */}
        <TouchableOpacity
          style={{
            flexDirection: "row-reverse",
            paddingBottom: 10,
            paddingHorizontal: 30,
          }}
          onPress={() => {
            navigate("WriteList", { name: WriteList });
          }}
        >
          <FontAwesome5 name="pencil-alt" size={23} color="black" />
        </TouchableOpacity>

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
            <TouchableOpacity style={{ marginRight: 10 }}>
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
                    <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                      {list.title}
                    </Text>
                    <Text style={{ paddingVertical: 5 }}>{list.date}</Text>
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Lists;
