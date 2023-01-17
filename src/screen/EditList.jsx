import { View, ScrollView } from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useMutation, useQueryClient } from "react-query";
import { storage } from "../common/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { changeDetail, changeMyPost } from "../common/api";
import { v4 as uuidv4 } from "uuid";
import { width } from "../common/util";
import useInput from "../hooks/useInput";
import usePickImage from "../hooks/usePickImage";
import ImageBox from "../components/Detail/ImageBox";
import * as St from "../styles/styled/WriteList.styled";
import InputZone from "../components/Form/InputZone";
import { useBackColor } from "../hooks/useDarkMode";

const EditList = () => {
  const queryClient = useQueryClient();
  //다크모드
  const [backColor] = useBackColor("#605e58", "white");

  // 네비게이션
  const { goBack } = useNavigation();
  const { params } = useRoute();
  const { list, color, img, myId, myPost } = params;
  const category = list.category;
  const id = list.id;

  // input
  const [state, onChange, reset] = useInput({ ...list });

  // 이미지 선택 & 미리보기
  const [pickedImg, setPickedImg, pickImage] = usePickImage(list.image);

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

  // 이미지 수정 없을때 수정
  const editList = () => {
    const newMyPost = myPost.map((x) => {
      if (x.category === category && x.categoryId === id) {
        return {
          ...x,
          title: state.title,
          content: state.contetn,
          price: Number(state.price),
        };
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
    switch (true) {
      case state.title.trim() === "":
        alert("상품명을 입력해주세요");
        return;
      case state.price.trim() === "":
        alert("가격을 입력해주세요");
        return;
      case state.content.trim() === "":
        alert("간단한 상품 설명을 입력해주세요");
        return;
      case !!state.price.match(/\W/g):
        alert("가격을 제대로 입력해주세요.\n가격에는 숫자만 넣어주세요");
        return;
      case state.price.slice(0, 1) === "0":
        alert("가격을 제대로 입력해주세요.\n가격은 0으로 시작할수 없어요");
        return;
      case Number(state.price) >= 1000000000000:
        alert("가격을 제대로 입력해주세요\n가격은 억단위까지 제공됩니다.");
        return;
    }
    if (pickedImg !== list.image) {
      uploadImage(pickedImg).then((image) => {
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
    <ScrollView style={{ backgroundColor: backColor }}>
      <View style={{ width: width }}>
        <ImageBox
          color={color}
          list={list}
          from="EditList"
          img={img}
          pickedImg={pickedImg}
          pickImage={pickImage}
        />
        <St.InfoView>
          <InputZone state={state} onChange={onChange} />
          <St.WriteBtnBox>
            <St.PostBtn
              onPress={() => editHandler()}
              style={{ backgroundColor: color["backColor"] }}
            >
              <Feather name="check" size={24} color={color["fontColor"]} />
            </St.PostBtn>
            <St.PostBtn
              onPress={() => {
                reset();
                goBack();
              }}
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

export default EditList;
