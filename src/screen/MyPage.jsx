import { View, Text, StyleSheet } from "react-native";

const MyPage = () => {
  return (
    <View style={styles.container}>
      <Text>프로필</Text>
    </View>
  );
};

export default MyPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
