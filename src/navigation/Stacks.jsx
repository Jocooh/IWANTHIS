import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screen/Login";
import Home from "../screen/Home";
import Lists from "../screen/Lists";
import Detail from "../screen/Detail";
import WriteList from "../screen/WriteList";
import { headerBackVisible } from "react-native-screens";
import Header from "../components/Header";
import { Text, Image, TouchableOpacity, View } from "react-native";

const NativeStack = createNativeStackNavigator();

const Stacks = () => {
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerTitle: (props) => <Header {...props} />,
        headerLeft: () => <Text></Text>, // 물어보깅
        headerRight: () => {
          return (
            <TouchableOpacity
              onPress={() => {
                Navigate("Login");
              }}
            >
              <View style={{ marginVertical: -5 }}>
                <Image
                  source={require("../assets/defaultimage.png")}
                  style={{ height: 40, width: 40 }}
                />
                {/* <View style={{ height: 10 }}></View> */}
              </View>
            </TouchableOpacity>
          );
        },
      }}
    >
      <NativeStack.Screen name="Login" component={Login} />
      <NativeStack.Screen name="Home" component={Home} />
      <NativeStack.Screen
        name="Lists"
        component={Lists}
        options={headerBackVisible}
      />
      <NativeStack.Screen name="Detail" component={Detail} />
      <NativeStack.Screen name="WriteList" component={WriteList} />
      {/* <NativeStack.Screen name="Mypage" /> */}
      {/* <NativeStack.Screen name="Register" />*/}
    </NativeStack.Navigator>
  );
};

export default Stacks;
