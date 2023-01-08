import {
  ActivityIndicator,
  Linking,
  Text,
  TouchableOpacity,
} from "react-native";
import { useQuery } from "react-query";
import { DetailText, Loader } from "../styles/styled";
import { AntDesign } from "@expo/vector-icons";
import { getList } from "../common/api";
import styled from "@emotion/native";
import { useEffect, useState } from "react";
import CommentForm from './CommentForm';

const DetailList = ({ category, listId }) => {
  const [url, setUrl] = useState("");
  // Linking
  const openLink = async (url) => {
    if (url) {
      await Linking.openURL(url);
    }
  };
  useEffect(() => {
    setUrl("https://velog.io/@hss3522");
  }, []);

  // GET List
  const { isLoading, isError, data, error } = useQuery(
    [category, listId],
    getList
  );

  if (isLoading) {
    return (
      <Loader>
        <ActivityIndicator size={"large"} />
      </Loader>
    );
  }
  if (isError) return <Text>에러: {error}</Text>;

  // 가격계산 코드 맨앞이 0일때 제거해야함 귀찮아서 나중에
  let price = data.price.toString();
  if (price >= 100000000) {
    price = `${price.slice(0, -8)}억${price.slice(-8, -4)}만${price.slice(-4)}`;
  } else if (price >= 10000) {
    price = `${price.slice(0, -4)}만${price.slice(-4)}`;
  }

  return (
    <>
      <DetailTitle>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>{data.title}</Text>
      </DetailTitle>
      <DetailDropdown>
        <TouchableOpacity style={{ marginRight: 10 }}>
          <AntDesign name="edit" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign name="delete" size={30} color="black" />
        </TouchableOpacity>
      </DetailDropdown>
      <TouchableOpacity
        onPress={() => openLink(url)}
        disabled={url === "" ? true : false}
      >
        <ProductImage
          source={require("../assets/다운로드2.png")}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <PriceBox>
        <DetailText>가격</DetailText>
        <DetailText>{price}원</DetailText>
      </PriceBox>
      <ProductInfoBox>
        <DetailText>{data.content}</DetailText>
      </ProductInfoBox>
      <LikeBtn>
        <AntDesign name="hearto" size={24} color="red" />
        <Text>{data.like}</Text>
      </LikeBtn>
      <CommentForm category={category} listId={listId} />
    </>
  );
};

export default DetailList;

const DetailTitle = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
`;

const DetailDropdown = styled.TouchableOpacity`
  position: absolute;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 95%;
  height: 60px;
`;

const ProductImage = styled.Image`
  width: 95%;
  height: 300px;
  margin: auto;
  border-radius: 16px;
`;

const PriceBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 95%;
  margin: 20px auto;
`;

const ProductInfoBox = styled.View`
  width: 95%;
  margin: auto;
  padding: 0 10px 0 10px;
`;

const LikeBtn = styled.TouchableOpacity`
  width: 75px;
  height: 75px;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
  border-radius: 50px;
  border: 1px solid black;
`;
