import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from '../screen/Home';

const NativeStack = createNativeStackNavigator();

const Stacks = () => {
  return (
  <NativeStack.Navigator>
    <NativeStack.Screen name="Home" component={Home} />
    {/* <NativeStack.Screen name="Lists" />
    <NativeStack.Screen name="Detail" />
    <NativeStack.Screen name="Mypage" />
    <NativeStack.Screen name="Login" />
    <NativeStack.Screen name="Register" /> */}
  </NativeStack.Navigator>
  )
};

export default Stacks;
