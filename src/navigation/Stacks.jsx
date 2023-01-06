import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screen/Home";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
    <>
      <Header />
      <NativeStack.Navigator
        screenOptions={{
          headerStyle: { height: 100, backgroundColor: "black" },
        }}
      >
        <NativeStack.Screen name="Home" component={Home} />
        {/* <NativeStack.Screen name="Lists" />
    <NativeStack.Screen name="Detail" />
    <NativeStack.Screen name="Mypage" />
    <NativeStack.Screen name="Login" />
    <NativeStack.Screen name="Register" /> */}
      </NativeStack.Navigator>
    </>
  );
};

export default Stacks;
