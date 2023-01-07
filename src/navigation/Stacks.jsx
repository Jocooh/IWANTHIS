import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screen/Home";
import Lists from "../screen/Lists";
import Detail from "../screen/Detail";
import { headerBackVisible } from "react-native-screens";

const NativeStack = createNativeStackNavigator();

const Stacks = () => {
  return (
    <NativeStack.Navigator>
      {/* <NativeStack.Screen name="Home" component={Home} /> */}
      <NativeStack.Screen
        name="Lists"
        component={Lists}
        options={headerBackVisible}
      />
      {/* <NativeStack.Screen name="Detail" component={Detail} /> */}
      {/* <NativeStack.Screen name="Mypage" />
    <NativeStack.Screen name="Login" />
    <NativeStack.Screen name="Register" /> */}
    </NativeStack.Navigator>
  );
};

export default Stacks;
