import { View, Text, ScrollView, TouchableOpacity } from "react-native";
// import { auth } from "../common/firebase"; //auth 들고옴
import React, { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import WriteList from "./WriteList";
import { ListBackground, ListImage, ListStyle } from "../styles/styled";
import Detail from "./Detail";
import { useFocusEffect } from "@react-navigation/native";

const Lists = ({ navigation: { navigate } }) => {
  const [lists, setLists] = useState([]);

  //이거 혹시 몰라서..
  // 최신순으로 가져올 함수
  //   const fetchCurrentList= async()=>{
  //     const{data}=await axios.get("주소category?_sort=date&_order=desc ")
  //     setLists(data)
  //   }
  // 인기순으로 가져올 함수
  // const fetchLikeList = async()=>{
  //   const{data}=await axios.get("주소category?_sort=like&_order=desc ")
  // }
  // useFocusEffect(() => {
  //   fetchList();
  // }, []);

  // 전체 리스트
  return (
    <SafeAreaView style={{ backgroundColor: "#92B1E8" }}>
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
            <TouchableOpacity style={{ marginRight: 10 }} onPress={() => {}}>
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
            {/* {props.map((list) => (
              <TouchableOpacity
                onPress={() => {
                  navigate("Detail", { name: Detail });
                }}
               >
                <View style={stylesList.ListStyle} key={list.id}>
                  <View>
                    <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                      {list.title}
                    </Text>
                    <Text style={{ paddingVertical: 5 }}>{list.date}</Text>
                  </View> */}
            {/* 이미지 들어가는 부분  - auth 이용 */}
            {/* <View style={{ marginVertical: -5 }}>
                    <Image
                      source={require("../assets/defaultimage.png")}
                      style={stylesList.ListImageSize}
                    />
                  
                  </View>
                </View>
              </TouchableOpacity>
            ))} */}
            <TouchableOpacity
              onPress={() => {
                navigate("Detail", { category: "furniture", id: 1 });
              }}
            >
              <ListStyle>
                <View>
                  <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                    TITLE
                  </Text>
                  <Text style={{ paddingVertical: 5 }}>2023-01-07</Text>
                </View>
                {/* 이미지 들어가는 부분 */}
                <View style={{ marginVertical: -5 }}>
                  <ListImage source={require("../assets/defaultimage.png")} />
                  {/* <View style={{ height: 10 }}></View> */}
                </View>
              </ListStyle>
            </TouchableOpacity>
          </ScrollView>
        </ListBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Lists;
