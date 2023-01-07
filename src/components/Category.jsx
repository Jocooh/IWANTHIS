import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { imagePath } from "../assets/imgPath";
import stylesList from "../styles/styled";
import { getCategories } from "../common/api";

const Category = ({ navigation }) => {
  const [categories, setCategories] = useState();

  const getDatas = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  useEffect(() => {
    getDatas();
  }, []);

  // 우상님 원래 코드

  // if (categories) {
  //   return Object.keys(categories).map((categoryName, index) => (
  //     <View key={index}>
  //       <TouchableOpacity
  //         onPress={() =>
  //           navigation("Lists", {
  //             datas: categories[categoryName].datas,
  //             color: categories[categoryName].color,
  //           })
  //         }
  //       >
  //         <View
  //           style={[
  //             stylesList.ListStyle,
  //             {
  //               height: 200,
  //               backgroundColor: categories[categoryName].color,
  //               flexDirection: "column",
  //             },
  //           ]}
  //         >
  //           <Image
  //             source={imagePath[categoryName]}
  //             //source={require(categoriess[categoryName].image)} 이거 안댐
  //             style={{ width: "100%", height: 100 }}
  //           />
  //           <Text
  //             style={{
  //               fontSize: 20,
  //               color: "white",
  //               textAlign: "right",
  //             }}
  //           >
  //             {categoryName}
  //           </Text>
  //           {/* 이미지 들어가는 부분 */}
  //         </View>
  //       </TouchableOpacity>
  //     </View>
  //   ));
  // }

  if (categories) {
    return categories.map((category) => (
      <View key={category.category}>
        <TouchableOpacity
          onPress={() =>
            navigation("Lists", {
              color: category.color,
            })
          }
        >
          <View
            style={[
              stylesList.ListStyle,
              {
                height: 200,
                backgroundColor: category.color,
                flexDirection: "column",
              },
            ]}
          >
            <Image
              source={imagePath[category.category]}
              //source={require(categoriess[categoryName].image)} 이거 안댐
              style={{ width: "100%", height: 100 }}
            />
            <Text
              style={{
                fontSize: 20,
                color: "white",
                textAlign: "right",
              }}
            >
              {category.category}
            </Text>
            {/* 이미지 들어가는 부분 */}
          </View>
        </TouchableOpacity>
      </View>
    ));
  }
};
export default Category;
