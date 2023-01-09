import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Button,
} from "react-native";
import { StyledComponent } from "styled-components";
import defaultimage from "../assets/defaultimage.png";
import favicon from "../assets/favicon.png";
import testimg from "../assets/testimg.png";

const MyPage = () => {
  return (
    <SafeAreaView style={styles.mainPageArea}>
      <View style={styles.myProfileArea}>
        <Text style={styles.pageTitleTextStyle}>My Profile</Text>
        <View>
          {/* <TouchableOpacity> */}
          <Image style={styles.myProfileImageStyle} source={defaultimage} />
          {/* </TouchableOpacity> */}
        </View>
        <View style={styles.myProfileDescriptionStyle}>
          <Text style={styles.PageTextStyle}>김원준</Text>
          <Text style={styles.PageTextStyle}>
            나를 소개합니다. 어쩌구 저쩌구.
          </Text>
        </View>
      </View>

      <View style={styles.myContentsArea}>
        <Text style={styles.pageTitleTextStyle}>My Contents</Text>
        <ScrollView>
          <View style={styles.myContentsStyle}>
            <Image source={testimg} style={{ width: 350, height: 100 }} />
            <Text style={styles.PageTextStyle}>이거 사줘</Text>
          </View>
          <View style={styles.myContentsStyle}>
            <Image source={testimg} style={{ width: 350, height: 100 }} />
            <Text style={styles.PageTextStyle}>이거 사줘</Text>
          </View>
          <View style={styles.myContentsStyle}>
            <Image source={testimg} style={{ width: 350, height: 100 }} />
            <Text style={styles.PageTextStyle}>이거 사줘</Text>
          </View>
          <View style={styles.myContentsStyle}>
            <Image source={testimg} style={{ width: 350, height: 100 }} />
            <Text style={styles.PageTextStyle}>이거 사줘</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default MyPage;

const styles = StyleSheet.create({
  // 메인 페이지
  mainPageArea: {
    flex: 1,
    backgroundColor: "white",
  },
  pageTitleTextStyle: {
    fontSize: 30,
    fontWeight: "500",
    marginTop: 15,
    marginBottom: 5,
  },
  PageTextStyle: {
    fontSize: 20,
    margin: 8,
  },

  // 마이 프로필
  myProfileArea: {
    flex: 0.8,
    backgroundColor: "#c2c5ff",
    alignItems: "center",
  },
  myProfileImageStyle: {
    width: 180,
    height: 150,
    marginTop: 10,
    marginBottom: 10,
  },
  myProfileDescriptionStyle: {
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30,
  },

  // 마이 컨텐츠
  myContentsArea: {
    flex: 1.2,
    backgroundColor: "#a0a4fa",
    alignItems: "center",
  },
  myContentsStyle: {
    margin: 15,
    alignItems: "center",
    borderColor: "white",
    borderWidth: "3",
    borderStyle: "solid",
    borderRadius: 10,
  },
});
