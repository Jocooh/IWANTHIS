import { View, Text, TouchableOpacity, Image } from "react-native";
import { useState, useEffect } from "react";
import React from "react";
import { imagePath } from "../assets/imgPath";
import { ListStyle } from "../styles/styled";
import Swiper from "react-native-swiper";
import { useFocusEffect } from "@react-navigation/native";
import { height } from "../common/util";

const Category = ({ navigation }) => {
  const [press, setPress] = useState([false, false, false]);
  const [opacity, setOpacity] = useState([1.0, 1.0, 1.0]);

  const categories = ["furniture", "electric", "fashion"];
  const colors = {
    furniture: {
      backColor: "#F3E0E0",
      fontColor: "#597B67",
    },
    electric: {
      backColor: "#E8C47E",
      fontColor: "#ffffff",
    },
    fashion: {
      backColor: "#BAD1E6",
      fontColor: "#FBB9AB",
    },
  };

  const swap = (index) => {
    const pArr = [...press];
    const oArr = [...opacity];
    // 합치기
    const swapArr = pArr.reduce((newArray, bool, idx) => {
      if (idx === index) {
        newArray.push(!bool);
      } else {
        newArray.push(bool);
      }
      return newArray;
    }, []);
    const opacityArr = oArr.reduce((newArray, value, idx) => {
      if (idx !== index) {
        newArray.push(0.5);
      } else {
        newArray.push(1.0);
      }
      return newArray;
    }, []);

    setOpacity(opacityArr);
    setPress(swapArr);
  };

  const goToList = (name, color, index) => {
    setTimeout(() => {
      navigation("Lists", { category: name, color: color });
      setTimeout(() => {
        setPress([false, false, false]);
        setOpacity([1.0, 1.0, 1.0]);
      }, 500);
    }, 4000);
  };

  if (categories) {
    return categories.map((category, index) => (
      <View key={category} style={{ backgroundColor: "white" }}>
        <TouchableOpacity
          onPress={() => swap(index)}
          style={{ opacity: opacity[index] }}
        >
          <View
            style={{
              height: 200,
              backgroundColor: colors[category].backColor,
              flexDirection: "column",
              alignItems: "center",
              opacity: opacity[index],
            }}
          >
            {!press[index] ? (
              <>
                <View style={{ height: "50%", margin: 10 }}>
                  <Text
                    style={{
                      fontSize: 60,
                      color: colors[category].fontColor,
                    }}
                  >
                    {category.toUpperCase()}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  {imagePath[category].map((image) => (
                    <Image source={image} style={{ width: 60, height: 60 }} />
                  ))}
                </View>
              </>
            ) : (
              <Swiper
                autoplay
                showsPagination={false}
                loop
                autoplayTimeout={0.3}
                onPress={goToList(category, colors[category].backColor, index)}
                containerStyle={{
                  width: "100%",

                  margin: 60,
                  marginLeft: "90%",
                  marginRight: 20,
                }}
              >
                {imagePath[category].map((image) => (
                  <Image source={image} style={{ width: 60, height: 60 }} />
                ))}
              </Swiper>
            )}
          </View>
        </TouchableOpacity>
      </View>
    ));
  }
};
export default Category;
