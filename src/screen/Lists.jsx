import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import stylesList from "../styles/styled";
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Detail from "./Detail";

const Lists = ({
  navigation: { navigate },
  route: {
    params: { datas, color },
  },
}) => (
  // 전체 리스트
  //배경색깔은 props으로 받아서 사용하면 될듯ㅇㅇ

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
          navigate("Detail", { name: Detail });
        }}
      >
        <FontAwesome5 name="pencil-alt" size={23} color="black" />
      </TouchableOpacity>

      {/* 흰색 배경 */}
      <View style={stylesList.ListBackground}>
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
        {/* 여기는 리스트 들어가는 구간 */}
        <ScrollView>
          <TouchableOpacity>
            <View style={stylesList.ListStyle}>
              <View>
                <Text style={{ fontSize: 25, fontWeight: "bold" }}>TITLE</Text>
                <Text style={{ paddingVertical: 5 }}>2023.1.6</Text>
              </View>
              {/* 이미지 들어가는 부분 */}
              <View style={{ marginVertical: -5 }}>
                <Image
                  source={require("../../assets/defaultimage.png")}
                  style={stylesList.ListImageSize}
                />
                {/* <View style={{ height: 10 }}></View> */}
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={stylesList.ListStyle}>
              <View>
                <Text style={{ fontSize: 25, fontWeight: "bold" }}>TITLE</Text>
                <Text style={{ paddingVertical: 5 }}>2023.1.6</Text>
              </View>
              {/* 이미지 들어가는 부분 */}
              <View style={{ marginVertical: -5 }}>
                <Image
                  source={require("../../assets/defaultimage.png")}
                  style={stylesList.ListImageSize}
                />
                {/* <View style={{ height: 10 }}></View> */}
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={stylesList.ListStyle}>
              <View>
                <Text style={{ fontSize: 25, fontWeight: "bold" }}>TITLE</Text>
                <Text style={{ paddingVertical: 5 }}>2023.1.6</Text>
              </View>
              {/* 이미지 들어가는 부분 */}
              <View style={{ marginVertical: -5 }}>
                <Image
                  source={require("../../assets/defaultimage.png")}
                  style={stylesList.ListImageSize}
                />
                {/* <View style={{ height: 10 }}></View> */}
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ScrollView>
  </SafeAreaView>
);

export default Lists;
