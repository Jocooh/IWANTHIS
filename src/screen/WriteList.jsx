import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Animated,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { changeMyPost, getUsers, postList, postMy } from "../common/api";
import { width } from "../common/util";
import { Feather, AntDesign, Entypo } from "@expo/vector-icons";
import { ImageView } from "../components/ImageView";
import * as ImagePicker from "expo-image-picker";
import styled from "@emotion/native";
import { auth, storage } from "../common/firebase";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const WriteList = () => {
  const queryClient = useQueryClient();
  const uid = auth.currentUser ? auth.currentUser.uid : "";

  // 네비게이션
  const { goBack } = useNavigation();
  const { params } = useRoute();
  const category = params.category;
  const id = params.id;
  const color = params.color;
  const img = params.img;

  // input
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState(0);
  const [url, setUrl] = useState("");

  // 이미지 피커
  const [pickedImg, setPickedImg] = useState("");
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const pickImage = async () => {
    if (!status?.granted) {
      const permissions = await requestPermission();
      if (!permissions.granted) {
        return null;
      }
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    const [{ uri }] = result.assets;
    setPickedImg(uri);
  };

  // 카테고리 게시판 포스트
  const postMutation = useMutation(postList, {
    onSuccess: async () => {
      queryClient.invalidateQueries(category);
    },
  });
  // 마이페이지 게시판 업로드 (처음으로 글 쓸때)
  const myPostMutation = useMutation(postMy);

  // 마이페이지 게시판 업로드 (두번째 이상)
  const changeMyPostMutation = useMutation(changeMyPost);

  // GET 내가 쓴 글
  const { isLoading, isError, data, error } = useQuery("users", getUsers);
  if (isLoading) return <Text>로딩중...</Text>;
  if (isError) return <Text>error: {error}</Text>;

  // 게시글 업로드 할때 쓸 것들

  // users 불러오기 위한 것들 json-server 특성상 이따구로 밖에 안됨
  const my = data.filter((x) => x.uid === uid);
  const myId = my.map((x) => x.id)[0];
  const myLists = my.map((x) => x.lists).flat();
  const listId = myLists.length + 1;
  const check = myLists.length > 0;

  //날짜 계산
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let day = now.getDate();
  let hour = now.getHours();
  let minute = now.getMinutes();

  //이미지 파이어베이스 업로드
  const uploadImage = async () => {
    if (pickedImg) {
      const response = await fetch(pickedImg);
      const blobFile = await response.blob();
      const imageRef = ref(storage, `image/${uuidv4()}`);
      if (blobFile) {
        const imageResponse = await uploadBytes(imageRef, blobFile);
        const downloadUrl = await getDownloadURL(imageResponse.ref);
        setPickedImg("");
        return downloadUrl;
      }
    } else {
      return "";
    }
  };

  const addList = async () => {
    if (title.trim() === "" || price.trim() === "" || content.trim() === "") {
      alert("내용을 입력해주세요");
      return;
    }
    uploadImage() // 파이어베이스 업로드가 끝나면 실행
      .then((response) => {
        const list = {
          uid,
          url,
          category,
          title,
          content,
          image: response,
          date: `${year}-${month > 9 ? month : "0" + month}-${
            day > 9 ? day : "0" + day
          } ${hour > 9 ? hour : "0" + hour}:${
            minute > 9 ? minute : "0" + minute
          }`,
          like: [],
          price,
          comments: [],
        };
        const lists = [
          {
            id: listId,
            category,
            categoryId: id,
            image: response,
            title,
            content,
            price,
          },
        ];
        const myList = {
          id: listId,
          category,
          categoryId: id,
          image: response,
          title,
          content,
          price,
        };
        if (!check) {
          myPostMutation.mutate({ uid, lists });
        } else {
          changeMyPostMutation.mutate([myId, { lists: [...myLists, myList] }]);
        }
        postMutation.mutate([category, { ...list }]);
        setTitle("");
        setContent("");
        setUrl("");
        setPrice("");
        goBack();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <ScrollView>
      <View
        style={{
          width: width,
        }}
      >
        <ImageView
          color={color}
          img={img}
          from={"writeList"}
          handler={pickImage}
        />
      </View>
      <InfoView>
        <InputZone placeholder="상품명" style={{ marginTop: "2%" }}></InputZone>
        <InputZone placeholder="가격" style={{ fontSize: 17 }}></InputZone>
        <InputZone placeholder="판매링크" style={{ fontSize: 17 }}></InputZone>

        <InputZone
          placeholder="설명"
          style={{
            height: 300,
            fontSize: 17,
            marginBottom: 10,
          }}
        ></InputZone>
        <View
          style={{
            flexDirection: "row",
            height: 50,
            width: "100%",
          }}
        >
          <TouchableOpacity
            onPress={addList}
            style={{
              backgroundColor: color["backColor"],
              width: "50%",
              borderRadius: "40%",
              // margin: 10,
            }}
          >
            <Feather
              name="check"
              size={24}
              color={color["fontColor"]}
              style={{ paddingTop: "7%", paddingLeft: "43%" }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: color["backColor"],
              width: "50%",
              borderRadius: "40%",
            }}
          >
            <AntDesign
              name="close"
              size={24}
              color={color["fontColor"]}
              style={{ paddingTop: "7%", paddingLeft: "43%" }}
            />
          </TouchableOpacity>
        </View>
      </InfoView>
    </ScrollView>
  );
};

const InputZone = styled.TextInput`
  margin-bottom: 15px;
  height: 40px;
  font-size: 25px;
`;
const InputContent = styled.TextInput`
  min-height: 100px;
  margin-bottom: 15px;
  font-size: 17px;
`;
const InfoView = styled.View`
  margin: 4% 5% 5% 5%;
`;
const styles = {
  bg: () => ({
    width: "90%",
    height: "100%",
    resizeMode: "contain",
  }),
};
export default WriteList;
