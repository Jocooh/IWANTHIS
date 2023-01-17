import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screen/Home";
import Lists from "../screen/Lists";
import Detail from "../screen/Detail";
import WriteList from "../screen/WriteList";
import Login from "../screen/Login";
import Header from "../components/Header";
import { listImagePath } from "../assets/imgPath";
import {
  Text,
  Image,
  TouchableOpacity,
  View,
  Alert,
  useColorScheme,
} from "react-native";
import MyPage from "../screen/MyPage";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../common/firebase";
import { SimpleLineIcons } from "@expo/vector-icons";
import { signOut } from "firebase/auth/react-native";
import EditList from "../screen/EditList";
import { useSelector } from "react-redux";

const NativeStack = createNativeStackNavigator();

const Stacks = () => {
  const { navigate } = useNavigation();
  const check = useSelector((state) => state.login.isLogin);
  // 다크모드
  const isDark = useColorScheme() === "dark";

  //로그아웃 누르면 로그아웃되는 코드
  const logOut = () => {
    return Alert.alert("LOGOUT", "로그아웃하시겠습니까?", [
      {
        text: "YES",
        onPress: () => {
          signOut(auth)
            .then(() => {
              alert("로그아웃 성공");
              navigate("Home");
            })
            .catch((err) => {
              alert(err);
            });
        },
      },
      {
        text: "NO",
        onPress: () => {
          console.log("로그아웃 취소");
        },
      },
    ]);
  };

  return (
    <NativeStack.Navigator
      screenOptions={{
        headerTitleAlign: "center", // 안드로이드
        headerTitle: (props) => <Header {...props} />,
        headerLeft: () => <Text></Text>, // 물어보깅
        headerRight: () => {
          return (
            <>
              <TouchableOpacity style={{ marginRight: 2 }}>
                {check ? ( // 로그아웃 및 프로필 사진 아이콘
                  <View
                    style={{ flexDirection: "row", justifyContent: "center" }}
                  >
                    <SimpleLineIcons
                      name="logout"
                      size={24}
                      color={isDark ? "white" : "black"}
                      onPress={logOut}
                      style={{ marginTop: 7 }}
                    />

                    <TouchableOpacity
                      onPress={() => navigate("MyPage")}
                      style={{ flexDirection: "row" }}
                    >
                      <View style={{ marginLeft: 10 }}>
                        <Image
                          source={
                            check
                              ? { uri: auth.currentUser.photoURL }
                              : listImagePath["defaultimage"]
                          }
                          style={{ height: 40, width: 40, borderRadius: 40 }}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : (
                  // 로그인 아이콘
                  <SimpleLineIcons
                    name="login"
                    size={24}
                    color={isDark ? "white" : "black"}
                    onPress={() => {
                      navigate("Login");
                    }}
                  />
                )}
              </TouchableOpacity>
            </>
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
