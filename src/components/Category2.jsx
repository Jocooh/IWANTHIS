import { View, Text, TouchableOpacity, Image } from "react-native";

import React, { useEffect, useState } from "react";
import { imagePath } from "../assets/imgPath";
import { getCategories } from "../common/api";
import { ListStyle } from "../styles/styled";
const Category = ({ navigation }) => {
  const [categories, setCategories] = useState();

  const getDatas = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  useEffect(() => {
    getDatas();
  }, []);

  if (categories) {
    return Object.keys(categories).map((categoryName, index) => (
      <View key={index}>
        <TouchableOpacity
          onPress={() =>
            navigation("Lists", {
              datas: categories[categoryName].datas,
              color: categories[categoryName].backColor,
            })
          }
        >
          <View
            style={{
              height: 200,
              backgroundColor: categories[categoryName].backColor,
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
                color: categories[categoryName].fontColor,
                textAlign: "center",
              }}
            >
              {categoryName.toUpperCase()}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    ));
  }
};
export default Category;
