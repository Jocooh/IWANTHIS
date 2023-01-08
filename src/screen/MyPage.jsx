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
import defaultimage from "../assets/defaultimage.png";
import favicon from "../assets/favicon.png";

const MyPage = () => {
  return (
    <SafeAreaView style={styles.mainPageArea}>
      <View style={styles.mainPageProfileArea}>
        <Image style={styles.mainPageProfileImage} source={defaultimage} />
        <TouchableOpacity>
          <Text style={styles.mainPageProfileText}>프로필 수정</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mainPageMyContentsArea}>
        <Text style={styles.mainPageMyContentsText}>내가 쓴 글 😂</Text>
        <View style={styles.mainPageMyContents}>
          <Image style={styles.mainPageMyContentsImage} source={favicon} />
          <Text style={styles.mainPageMyContentsText}>이거 사줘</Text>
        </View>
        <View style={styles.mainPageMyContents}>
          <Image style={styles.mainPageMyContentsImage} source={favicon} />
          <Text style={styles.mainPageMyContentsText}>이것도 사줘</Text>
        </View>
        <View style={styles.mainPageMyContents}>
          <Image source={favicon} />
          <Text style={styles.mainPageMyContentsText}>또 사줘</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyPage;

const styles = StyleSheet.create({
  // 메인페이지
  mainPageArea: {
    flex: 1,
    backgroundColor: "white",
  },

  // 프로필
  mainPageProfileArea: {
    flex: 1,
    backgroundColor: "#f8c3c6",
    justifyContent: "center",
    alignItems: "center",
  },
  mainPageProfileImage: {
    width: "50%",
    height: 180,
  },
  mainPageProfileText: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 35,
    fontWeight: "500",
  },

  // 내가 쓴 글
  mainPageMyContentsArea: {
    flex: 2,
    backgroundColor: "#e9aedf",
    justifyContent: "top",
    alignItems: "center",
  },
  mainPageMyContents: {
    // width: "80%",
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    marginTop: 5,
  },
  mainPageMyContentsImage: {
    // width: "50%",
    // height: 180,
  },
  mainPageMyContentsText: {
    marginTop: 15,
    marginBottom: 15,
    fontSize: 20,
    fontWeight: "500",
  },
});
