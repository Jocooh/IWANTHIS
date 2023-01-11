import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import React from "react";
import { listImagePath } from "../assets/imgPath";
import { width } from "../common/util";
import Swiper from "react-native-swiper";
import { Loader } from "../styles/styled";

export const colors = {
  beauty: {
    backColor: "#BCE29E",
    fontColor: "#fa5a5a",
  },
  interior: {
    fontColor: "#08f26e",
    backColor: "#2B3467",
  },
  books: {
    backColor: "#FCFFE7",
    fontColor: "#EB455F",
  },
  necessity: {
    fontColor: "#0cdbd4",
    backColor: "#540375",
  },
  furniture: {
    backColor: "#F3E0E0",
    fontColor: "#16422b",
  },
  electric: {
    backColor: "#8A8989",
    fontColor: "#dee053",
  },

  fashion: {
    fontColor: "#0d2a60",
    backColor: "#FBB9AB",
  },

  accessory: {
    backColor: "#939B62",
    fontColor: "#FFD56F",
  },
  foods: {
    backColor: "#800000",
    fontColor: "#ffca99",
  },
};

const Category = ({ navigation }) => {
  const categories = Object.keys(colors);

  const [press, setPress] = useState(
    Array.from({ length: categories.length }, () => false)
  );

  const [blocking, setBlocking] = useState(
    Array.from({ length: categories.length }, () => false)
  );

  const [effect, setEffect] = useState(
    Array.from({ length: categories.length }, () => 1.0)
  );

  const swap = (index) => {
    const pArr = [...press];
    const oArr = [...effect];
    const bArr = [...blocking];
    // 합치기
    const swapArr = pArr.reduce((newArray, bool, idx) => {
      if (idx === index) {
        newArray.push(!bool);
      } else {
        newArray.push(bool);
      }
      return newArray;
    }, []);

    const blockArr = bArr.reduce((newArray, bool, idx) => {
      if (idx === index) {
        newArray.push(!bool);
      } else {
        newArray.push(bool);
      }
      return newArray;
    }, []);

    const effectArr = oArr.reduce((newArray, value, idx) => {
      if (idx !== index) {
        newArray.push(0.5);
      } else {
        newArray.push(1.0);
      }
      return newArray;
    }, []);

    setEffect(effectArr);
    setBlocking(blockArr);

    setPress(swapArr);
  };

  const goToList = (name, color, index) => {
    setTimeout(() => {
      navigation("Lists", { category: name, color: color });
      setTimeout(() => {
        setPress(Array.from({ length: categories.length }, () => false));
        setBlocking(Array.from({ length: categories.length }, () => false));
        setEffect(Array.from({ length: categories.length }, () => 1.0));
      }, 500);
    }, 2000);
  };

  useEffect(() => {
    setTimeout(() => {}, 4000);
  }, []);

  if (categories) {
    return categories.map((category, index) => (
      <View key={index}>
        <TouchableOpacity
          disabled={blocking[index]}
          activeOpacity={true}
          onPress={() => swap(index)}
          style={{ opacity: effect[index] }}
        >
          <View
            style={{
              height: 350,
              backgroundColor: colors[category].backColor,
              flexDirection: "column",

              effect: effect[index],
            }}
          >
            <View
              style={{
                height: "100%",
                position: "relative",
                width: width,
              }}
            >
              {!press[index] ? (
                <>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 60,
                      color: colors[category].fontColor,
                      position: "absolute",
                      zIndex: 1,
                    }}
                  >
                    {category.toUpperCase()}
                  </Text>
                  <Image
                    key={index}
                    source={listImagePath[category]}
                    style={styles.bg()}
                  />
                </>
              ) : (
                <View
                  onPress={goToList(category, colors[category], index)}
                  style={{ marginTop: "35%", flexDirection: "column" }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 60,
                      color: colors[category].fontColor,
                      textAlign: "center",
                    }}
                  >
                    {category.toUpperCase()}
                  </Text>
                  <ActivityIndicator
                    size={"large"}
                    color={colors[category].fontColor}
                  />
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    ));
  }
};

const styles = {
  bg: () => ({
    width: "100%",
    height: "110%",
    resizeMode: "contain",
    // transform: [
    //   {
    //     translateY: scrollA,
    //   },
    // ],
  }),
};
export default Category;
