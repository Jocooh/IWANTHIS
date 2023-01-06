import { ThemeProvider } from "@emotion/react";
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import Stacks from "./src/navigation/Stacks";
import store from "./src/redux/config/configStore";
import { darkTheme, lightTheme } from "./src/styles/theme";

const queryClient = new QueryClient();

const App = () => {
  const isDark = useColorScheme() === "dark";

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
          <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
            <Stacks />
          </NavigationContainer>
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
