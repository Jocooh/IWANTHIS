import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screen/Home";
import Lists from "../screen/Lists";
import Detail from "../screen/Detail";
import WriteList from "../screen/WriteList";
import { headerBackVisible } from "react-native-screens";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MyPage from "../screen/MyPage";

const NativeStack = createNativeStackNavigator();

const Header = () => {
  return (
    <SafeAreaView>
      <View style={{ backgroundColor: "black" }}>
        <Text>헤더</Text>
      </View>
    </SafeAreaView>
  );
};

const Stacks = () => {
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerStyle: { height: 100, backgroundColor: "black" },
      }}
    >
      {/* <NativeStack.Screen name="Home" component={Home} /> */}
      {/* <NativeStack.Screen
        name="Lists"
        component={Lists}
        options={headerBackVisible}
      /> */}
      {/* <NativeStack.Screen name="Detail" component={Detail} /> */}
      {/* <NativeStack.Screen name="WriteList" component={WriteList} /> */}
      <NativeStack.Screen name="MyPage" component={MyPage} />
      {/* <NativeStack.Screen name="Login" /> */}
      {/* <NativeStack.Screen name="Register" /> */}
    </NativeStack.Navigator>
  );
};

export default Stacks;
