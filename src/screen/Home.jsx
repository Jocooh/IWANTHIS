import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import { height, width } from "../common/util";
import stylesList from "../styles/styled";
import { SafeAreaView } from "react-native-safe-area-context";
import sss from "../assets/가구.png";

const Category = ({ navigation }) => {
  const categories = ["FURNITURE", "ELECTRIC-PRODUCTS", "FASION"];

  const iconArr = [
    // 디비에 넣을 예정
    require("../assets/가구.png"),
    require("../assets/전자제품.png"),
    require("../assets/패션.png"),
  ];
  // 디비에 넣을 예정
  const color = ["#92b1e8", "#e9aedf", "#f8c3c6", "#f8e3c1", "#f6efd6"];

  return categories.map((item, index) => (
    <View key={index}>
      <TouchableOpacity
        onPress={() =>
          navigation("Lists", { datas: null, color: color[index] })
        }
      >
        <View
          style={[
            stylesList.ListStyle,
            {
              height: 200,
              backgroundColor: color[index],
              flexDirection: "column",
            },
          ]}
        >
          <Image
            source={iconArr[index]}
            style={{ width: "100%", height: 100 }}
          />
          <Text
            style={{
              fontSize: 20,
              color: "white",
              textAlign: "right",
            }}
          >
            {categories[index]}
          </Text>

          {/* 이미지 들어가는 부분 */}
        </View>
      </TouchableOpacity>
    </View>
  ));
};

const Home = ({ navigation: { navigate } }) => {
  return (
    <ScrollView>
      <Category navigation={navigate} />
    </ScrollView>
  );
};

export default Home;
