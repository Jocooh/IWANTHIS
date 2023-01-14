import { Text, View, ScrollView, useColorScheme } from "react-native";
import { useState } from "react";
import { Feather, AntDesign } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { auth, storage } from "../common/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { changeMyPost, getUsers, postList, postMy } from "../common/api";
import { v4 as uuidv4 } from "uuid";
import { date, width } from "../common/util";
import usePickImage from "../hooks/usePickImage";
import ImageBox from "../components/Detail/ImageBox";
import * as St from "../styles/styled/WriteList.styled";
import InputZone from "../components/Form/InputZone";

const WriteList = () => {
  const queryClient = useQueryClient();
  const uid = auth.currentUser ? auth.currentUser.uid : "";
  // 다크모드
  const isDark = useColorScheme() === "dark";
  const backColor = isDark ? "#605e58" : "white";

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
  const [pickedImg, setPickedImg, pickImage] = usePickImage("");

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
  const checkFirstPost = my.length === 0;

  // 게시글 업로드 할때 쓸 것들
  const list = {
    uid,
    url,
    category,
    title,
    content,
    date: date,
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
  const uploadImage = async (img) => {
    if (img) {
      const response = await fetch(img);
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
    if (Number(price) >= 1000000000000) {
      alert("가격을 제대로 입력해주세요\n가격은 억단위까지 제공됩니다.");
    }
    uploadImage(pickedImg)
      .then((image) => {
        if (checkFirstPost) {
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
    <ScrollView style={{ backgroundColor: backColor }}>
      <View style={{ width: width }}>
        <ImageBox
          color={color}
          list={list}
          from="WriteList"
          img={img}
          pickedImg={pickedImg}
          pickImage={pickImage}
        />
        <St.InfoView>
          <InputZone
            title={title}
            setTitle={setTitle}
            content={content}
            setContent={setContent}
            price={price}
            setPrice={setPrice}
            url={url}
            setUrl={setUrl}
          />
          <St.WriteBtnBox>
            <St.PostBtn
              onPress={addList}
              style={{ backgroundColor: color["backColor"] }}
            >
              <Feather name="check" size={24} color={color["fontColor"]} />
            </St.PostBtn>
            <St.PostBtn
              onPress={reset}
              style={{ backgroundColor: color["backColor"] }}
            >
              <AntDesign name="close" size={24} color={color["fontColor"]} />
            </St.PostBtn>
          </St.WriteBtnBox>
        </St.InfoView>
      </View>
    </ScrollView>
  );
};

export default WriteList;
