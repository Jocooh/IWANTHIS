import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screen/Home";
import Lists from "../screen/Lists";
import Detail from "../screen/Detail";
import WriteList from "../screen/WriteList";
import Login from "../screen/Login";
import Header from "../components/Header";
import { listImagePath } from "../assets/imgPath";
import { Text, Image, TouchableOpacity, View, Alert } from "react-native";
import MyPage from "../screen/MyPage";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../common/firebase";
import { SimpleLineIcons } from "@expo/vector-icons";
import { signOut } from "firebase/auth/react-native";
import EditList from "../screen/EditList";

const NativeStack = createNativeStackNavigator();

const Stacks = () => {
  const { navigate } = useNavigation();
  const check = !!auth.currentUser;

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
              <TouchableOpacity style={{ marginRight: 10 }}>
                {check ? (
                  <SimpleLineIcons
                    name="logout"
                    size={24}
                    color="black"
                    onPress={logOut}
                  />
                ) : (
                  <SimpleLineIcons
                    name="login"
                    size={24}
                    color="black"
                    onPress={() => {
                      navigate("Login");
                    }}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigate(check ? "MyPage" : "Login")}
                style={{ flexDirection: "row" }}
              >
                <View style={{ marginVertical: -5 }}>
                  {/* 얘가 로그인 true면 로그아웃임티:아니면 로그인 임티 */}

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
