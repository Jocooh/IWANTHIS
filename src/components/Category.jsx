import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { imagePath } from "../assets/imgPath";

const Category = ({ navigation }) => {
  const categories = ["furniture", "electric", "fashion"];
  const colors = {
    furniture: {
      backColor: "#F3E0E0",
      fontColor: "#597B67",
    },
    electric: {
      backColor: "#E8C47E",
      fontColor: "#B6C3A2",
    },
    fashion: {
      backColor: "#BAD1E6",
      fontColor: "#FBB9AB",
    },
  };

  if (categories) {
    return categories.map((category) => (
      <View key={category}>
        <TouchableOpacity
          onPress={() =>
            navigation("Lists", {
              category: category,
              categories: categories,
              color: colors[category].backColor,
            })
          }
        >
          <View
            style={{
              height: 200,
              backgroundColor: colors[category].backColor,
              flexDirection: "column",
            }}
          >
            {/* <Image
              source={imagePath[categoryName]}
              //source={require(categoriess[categoryName].image)} 이거 안댐
              style={{ width: "100%", height: 100 }}
            /> */}
            <Text
              style={{
                fontSize: 60,
                color: colors[category].fontColor,
                textAlign: "center",
              }}
            >
              {category.toUpperCase()}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    ));
  }
};
export default Category;
