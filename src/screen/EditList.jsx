import { View, ScrollView, Animated } from "react-native";
import { useState } from "react";
import styled from "@emotion/native";
import * as ImagePicker from "expo-image-picker";
import { Feather, AntDesign } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useMutation, useQueryClient } from "react-query";
import { storage } from "../common/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { changeDetail, changeMyPost } from "../common/api";
import { v4 as uuidv4 } from "uuid";
import { width } from "../common/util";
import { ImageBox, ImageBtnBox, ImageView, styles } from "../styles/styled";

const EditList = () => {
  const queryClient = useQueryClient();

  // 네비게이션
  const { goBack } = useNavigation();
  const { params } = useRoute();
  const { list, color, img, myId, myPost } = params;
  const category = list.category;
  const id = list.id;

  // input
  const [title, setTitle] = useState(list.title);
  const [content, setContent] = useState(list.content);
  const [price, setPrice] = useState(list.price.toString());
  const [url, setUrl] = useState(list.url);

  const reset = () => {
    setTitle("");
    setContent("");
    setPrice("");
    setUrl("");
    goBack();
  };

  // 이미지 선택 & 미리보기
  const [pickedImg, setPickedImg] = useState(list.image);
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

  // 카테고리 게시판 수정
  const editMutation = useMutation(changeDetail, {
    onSuccess: async () => {
      queryClient.invalidateQueries([category, id]);
      reset();
      goBack();
    },
  });

  // 마이페이지 게시판 수정
  const changeMyPostMutation = useMutation(changeMyPost);

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

  const editList = () => {
    const newMyPost = myPost.map((x) => {
      if (x.category === category && x.categoryId === id) {
        return { ...x, title, content, price: Number(price) };
      } else {
        return { ...x };
      }
    });
    changeMyPostMutation.mutate([myId, newMyPost]);
    editMutation.mutate([
      category,
      id,
      { ...list, title, content, url, price: Number(price) },
    ]);
  };

  const editHandler = () => {
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
    if (pickedImg !== list.image) {
      uploadImage().then((image) => {
        const newMyPost = myPost.map((x) => {
          if (x.category === category && x.categoryId === id) {
            return { ...x, title, content, price: Number(price), image };
          } else {
            return { ...x };
          }
        });
        changeMyPostMutation.mutate([myId, newMyPost]);
        editMutation.mutate([
          category,
          id,
          { ...list, title, content, url, price: Number(price), image },
        ]);
      });
    }
    editList();
  };

  return (
    <ScrollView>
      <View style={{ width: width }}>
        <ImageBox style={{ backgroundColor: color["backColor"] }}>
          <ImageView>
            <Animated.Image
              style={[styles.bg(), { marginLeft: "5%" }]}
              source={!!pickedImg ? { uri: pickedImg } : img}
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
              onPress={() => editHandler()}
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

export default EditList;
