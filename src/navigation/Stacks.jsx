import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Detail from "../screen/Detail";
import Home from "../screen/Home";
import WriteList from "../screen/WriteList";

const NativeStack = createNativeStackNavigator();

const Stacks = () => {
  return (
    <NativeStack.Navigator>
      <NativeStack.Screen name="Detail" component={Detail} />
      <NativeStack.Screen name="WriteList" component={WriteList} />
      <NativeStack.Screen name="Home" component={Home} />
      {/* <NativeStack.Screen name="Lists" />
    <NativeStack.Screen name="Mypage" />
    <NativeStack.Screen name="Login" />
    <NativeStack.Screen name="Register" /> */}
    </NativeStack.Navigator>
  );
};

export default Stacks;
