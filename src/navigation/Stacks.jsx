import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screen/Home";
import Lists from "../screen/Lists";
import Detail from "../screen/Detail";
import WriteList from "../screen/WriteList";
import Login from "../screen/Login";
import Header from "../components/Header";
import { listImagePath } from "../assets/imgPath";
import { Text, Image, TouchableOpacity, View } from "react-native";
import MyPage from "../screen/MyPage";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../common/firebase";
import EditList from "../screen/EditList";

const NativeStack = createNativeStackNavigator();

const Stacks = () => {
  const { navigate } = useNavigation();
  const check = !!auth.currentUser;

  return (
    <NativeStack.Navigator
      screenOptions={{
        headerTitleAlign: "center", // 안드로이드
        headerTitle: (props) => <Header {...props} />,
        headerLeft: () => <Text></Text>, // 물어보깅
        headerRight: () => {
          return (
            <TouchableOpacity
              onPress={() => navigate(check ? "MyPage" : "Login")}
            >
              <View style={{ marginVertical: -5 }}>
                <Image
                  source={
                    check
                      ? auth.currentUser.photoURL
                      : listImagePath["defaultimage"]
                  }
                  style={{ height: 40, width: 40 }}
                />
              </View>
            </TouchableOpacity>
          );
        },
      }}
    >
      <NativeStack.Screen name="Home" component={Home} />
      <NativeStack.Screen name="Lists" component={Lists} />
      <NativeStack.Screen name="WriteList" component={WriteList} />
      <NativeStack.Screen name="Detail" component={Detail} />
      <NativeStack.Screen name="EditList" component={EditList} />
      <NativeStack.Screen name="MyPage" component={MyPage} />
      <NativeStack.Screen name="Login" component={Login} />
    </NativeStack.Navigator>
  );
};

export default Stacks;
