import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screen/Home";
import Lists from "../screen/Lists";
import Detail from "../screen/Detail";
import WriteList from "../screen/WriteList";
import Header from "../components/Header";
import { listImagePath } from "../assets/imgPath";
import { Text, Image, TouchableOpacity, View } from "react-native";
import MyPage from "../screen/MyPage";
import { useNavigation } from "@react-navigation/native";
import Login from '../screen/Login';

const NativeStack = createNativeStackNavigator();

const checkLog = () => {};

const Stacks = () => {
  const { navigate } = useNavigation();

  return (
    <NativeStack.Navigator
      screenOptions={{
        headerTitleAlign: "center", // 안드로이드
        headerTitle: (props) => <Header {...props} />,
        headerLeft: () => <Text></Text>, // 물어보깅
        headerRight: () => {
          return (
            <TouchableOpacity onPress={() => navigate("Login")}>
              <View style={{ marginVertical: -5 }}>
                <Image
                  source={listImagePath["defaultimage"]}
                  style={{ height: 40, width: 40 }}
                />
                {/* <View style={{ height: 10 }}></View> */}
              </View>
            </TouchableOpacity>
          );
        },
      }}
    >
      <NativeStack.Screen name="Home" component={Home} />
      <NativeStack.Screen name="Lists" component={Lists} />
      <NativeStack.Screen name="Detail" component={Detail} />
      <NativeStack.Screen name="WriteList" component={WriteList} />
      <NativeStack.Screen name="MyPage" component={MyPage} />
      <NativeStack.Screen name="Login" component={Login} />
    </NativeStack.Navigator>
  );
};

export default Stacks;
