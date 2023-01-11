import { Text, View, ScrollView, Animated } from "react-native";
import { useState } from "react";
import styled from "@emotion/native";
import * as ImagePicker from "expo-image-picker";
import { Feather, AntDesign } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { auth, storage } from "../common/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { changeMyPost, getUsers, postList, postMy } from "../common/api";
import { v4 as uuidv4 } from "uuid";
import { width } from "../common/util";
import { ImageBox, ImageBtnBox, ImageView, styles } from "../styles/styled";

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
  const [price, setPrice] = useState("");
  const [url, setUrl] = useState("");

  const reset = () => {
    setTitle("");
    setContent("");
    setPrice("");
    setUrl("");
    goBack();
  };

  // 이미지 선택 & 미리보기
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
    if (!!result) {
      const [{ uri }] = result.assets;
      setPickedImg(uri);
    }
  };

  // 카테고리 게시판 포스트
  const postMutation = useMutation(postList, {
    onSuccess: async () => {
      queryClient.invalidateQueries(category);
      reset();
      goBack();
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

  // /users 깊은 복사를 위한 것들
  const my = data.filter((x) => x.uid === uid);
  const myId = my.map((x) => x.id)[0];
  const myLists = my.map((x) => x.lists).flat();
  const listId = myLists.length + 1;
  const checkFirstPost = myLists.length > 0;

  // 게시글 업로드 할때 쓸 것들
  const now = new Date();
  const year = now.getFullYear();
  let month = now.getMonth() + 1;
  if (month < 10) month = "0" + month;
  let day = now.getDate();
  if (day < 10) day = "0" + day;
  let hour = now.getHours();
  if (hour < 10) hour = "0" + hour;
  let minute = now.getMinutes();
  if (minute < 10) minute = "0" + minute;
  let date = `${year}-${month}-${day} ${hour}:${minute}`;

  const list = {
    uid,
    url,
    category,
    title,
    content,
    date,
    like: [],
    price: Number(price),
    comments: [],
  };

  const myList = {
    id: listId,
    category,
    categoryId: id,
    title,
    content,
    price: Number(price),
  };

  //이미지 파이어베이스 스토리지 업로드
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

  // POST
  const addList = async (event) => {
    event.preventDefault();
    if (title.trim() === "") {
      alert("상품명을 입력해주세요");
      return;
    }
    if (price.trim() === "") {
      alert("가격을 입력해주세요");
      return;
    }
    if (content.trim() === "") {
      alert("간단한 상품 설명을 입력해주세요");
      return;
    }
    if (!!price.match(/\W/g)) {
      alert("가격을 제대로 입력해주세요.\n가격에는 숫자만 넣어주세요");
      return;
    }
    if (price.slice(0, 1) === "0") {
      alert("가격을 제대로 입력해주세요.\n가격은 0으로 시작할수 없어요");
      return;
    }
    uploadImage()
      .then((image) => {
        if (!checkFirstPost) {
          const lists = [{ ...myList, image }];
          myPostMutation.mutate({ uid, lists });
        } else {
          changeMyPostMutation.mutate([
            myId,
            { lists: [...myLists, { ...myList, image }] },
          ]);
        }
        postMutation.mutate([category, { ...list, image }]);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <ScrollView>
      <View style={{ width: width }}>
        <ImageBox style={{ backgroundColor: color["backColor"] }}>
          <ImageView>
            <Animated.Image
              style={[styles.bg(), { marginLeft: "5%" }]}
              source={pickedImg ? { uri: pickedImg } : img}
            />
          </ImageView>
          <ImageBtnBox style={{ backgroundColor: color["fontColor"] }}>
            <CameraBtn onPress={() => pickImage()}>
              <Feather name="camera" size={24} color={color["backColor"]} />
            </CameraBtn>
          </ImageBtnBox>
        </ImageBox>
        <InfoView>
          <InputZone
            placeholder="상품명"
            style={{ fontSize: 25, marginTop: "2%" }}
            onChangeText={setTitle}
            value={title}
          />
          <InputZone
            keyboardType="number-pad"
            placeholder="가격"
            onChangeText={setPrice}
            value={price}
          />
          <InputZone
            keyboardType="url"
            placeholder="판매링크"
            onChangeText={setUrl}
            value={url}
          />
          <InputContent
            multiline={true}
            style={{ textAlignVertical: "top" }}
            placeholder="설명"
            onChangeText={setContent}
            value={content}
          />
          <WriteBtnBox>
            <PostBtn
              onPress={addList}
              style={{ backgroundColor: color["backColor"] }}
            >
              <Feather name="check" size={24} color={color["fontColor"]} />
            </PostBtn>
            <PostBtn
              onPress={reset}
              style={{ backgroundColor: color["backColor"] }}
            >
              <AntDesign name="close" size={24} color={color["fontColor"]} />
            </PostBtn>
          </WriteBtnBox>
        </InfoView>
      </View>
    </ScrollView>
  );
};

const CameraBtn = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  margin-top: 23%;
  margin-left: 26%;
`;

const InputZone = styled.TextInput`
  margin-bottom: 15px;
  height: 40px;
  font-size: 17px;
`;

const InputContent = styled.TextInput`
  min-height: 100px;
  margin-bottom: 15px;
  font-size: 17px;
`;

const InfoView = styled.View`
  margin: 4% 5% 5% 5%;
`;

const WriteBtnBox = styled.View`
  flex-direction: row;
  width: 100%;
  height: 50px;
`;

const PostBtn = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 50%;
  border-radius: 40px;
`;

export default WriteList;
