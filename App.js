import { ThemeProvider } from "@emotion/react";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import Stacks from "./src/navigation/Stacks";
import store from "./src/redux/config/configStore";
import { darkTheme, lightTheme } from "./src/styles/theme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-get-random-values";

const queryClient = new QueryClient();

const App = () => {
  const isDark = useColorScheme() === "dark";
  const Nav = createNativeStackNavigator();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
          <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
            <SafeAreaProvider>
              <Nav.Navigator screenOptions={{ headerShown: false }}>
                <Nav.Screen name="Stacks" component={Stacks} />
              </Nav.Navigator>
            </SafeAreaProvider>
          </NavigationContainer>
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
