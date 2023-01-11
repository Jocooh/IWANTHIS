import { TouchableOpacity, View, Animated, Text } from "react-native";

import { Feather, AntDesign } from "@expo/vector-icons";

const styles = {
  bg: () => ({
    width: "90%",
    height: "100%",
    resizeMode: "contain",
  }),
};
export const ImageView = ({ color, img = false, from, handler, data }) => {
  return (
    <View
      style={{
        backgroundColor: color["backColor"] ?? "white",
        height: 350,
        flexDirection: "row",
        position: "relative",
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
      }}
    >
      <View
        style={{
          alignContent: "center",

          height: "95%",
          width: "100%",
        }}
      >
        <Animated.Image
          style={[styles.bg(), { marginLeft: "5%" }]}
          source={img}
        />
      </View>

      <View
        style={{
          position: "absolute",
          zIndex: 1,
          top: "93%",
          right: "43%",
          height: 50,
          width: 50,
          borderRadius: "100%",
          backgroundColor: color["fontColor"] ?? "blue",
        }}
      >
        {from !== "detail" ? (
          <TouchableOpacity
            style={{
              height: 40,
              width: 45,
              marginTop: "12%",
              marginLeft: "15%",
              position: "absolute",
            }}
            onPress={() => handler()}
          >
            <View style={{}}>
              <Feather
                name={"camera"}
                size={"35%"}
                color={color["backColor"]}
              />
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              height: 40,
              width: 45,
              marginTop: "30%",
              marginLeft: "10%",
              position: "absolute",
            }}
            onPress={() => handler()}
          >
            <View
              style={{
                flexDirection: "row",
                marginTop: "25%",
                marginLeft: "10%",
                alignItems: "center",
                position: "relative",
              }}
            >
              <View style={{ position: "absolute" }}>
                <AntDesign name={"heart"} size={"15%"} color={"#f40584"} />
              </View>
              <View
                style={{
                  position: "absolute",
                  marginLeft: "40%",
                  marginTop: "10%",
                }}
              >
                <Text style={{ color: "white", fontSize: 25 }}>{data}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
