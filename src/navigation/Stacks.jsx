import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screen/Home";
import Lists from "../screen/Lists";
import Detail from "../screen/Detail";
import Login from "../screen/Login";
import Join from "../screen/Join";
import WriteList from "../screen/WriteList";
import { headerBackVisible } from "react-native-screens";
import Header from "../components/Header";
import { imagePath } from "../assets/imgPath";
import { Text, Image, TouchableOpacity, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

const NativeStack = createNativeStackNavigator();

const Stacks = ({ navigation }) => {
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerTitleAlign: "center", // 안드로이드
        headerTitle: (props) => <Header {...props} />,
        headerLeft: () => <Text></Text>, // 물어보깅
        headerRight: () => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("Login", { name: Login })}
            >
              <View style={{ marginVertical: -5 }}>
                <Image
                  source={imagePath["defaultimage"]}
                  style={{ height: 40, width: 40 }}
                />
              </View>
            </TouchableOpacity>
          );
        },
      }}
    >
      <NativeStack.Screen name="Home" component={Home} />
      <NativeStack.Screen name="Login" component={Login} />
      <NativeStack.Screen name="Join" component={Join} />
      <NativeStack.Screen
        name="Lists"
        component={Lists}
        options={headerBackVisible}
      />
      <NativeStack.Screen name="Detail" component={Detail} />
      <NativeStack.Screen name="WriteList" component={WriteList} />
      {/* <NativeStack.Screen name="Mypage" /> */}
    </NativeStack.Navigator>
  );
};

export default Stacks;
