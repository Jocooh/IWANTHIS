import { Text, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { changeMyPost, getUsers, postList, postMy } from "../common/api";

const WriteList = () => {
  const { goBack } = useNavigation();
  const { params } = useRoute();
  const queryClient = useQueryClient();
  const category = params.category;
  const id = params.id;
  const uid = "123";

  const { isLoading, isError, data, error } = useQuery("users", getUsers);

  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let day = now.getDate();
  let hour = now.getHours();
  let minute = now.getMinutes();

  const postMutation = useMutation(postList, {
    onSuccess: async () => {
      queryClient.invalidateQueries(category);
    },
  });
  const myPostMutation = useMutation(postMy);

  const changeMyPostMutation = useMutation(changeMyPost);

  if (isLoading) return <Text>로딩중...</Text>;

  if (isError) return <Text>error: {error}</Text>;

  const my = data.filter((x) => x.uid === uid);
  const myId = my.map((x) => x.id)[0]
  const myLists = my.map((x) => x.lists).flat();
  const listId = myLists.length + 1;
  const check = myLists.length > 0;

  const list = {
    uid,
    url: "",
    category,
    title: "test",
    content: "testest",
    image: "",
    date: `${year}-${month > 9 ? month : "0" + month}-${
      day > 9 ? day : "0" + day
    } ${hour > 9 ? hour : "0" + hour}:${minute > 9 ? minute : "0" + minute}`,
    like: 0,
    price: 150000000,
    comments: [],
  };

  const lists = [
    {
      id: listId,
      category,
      categoryId: id,
      title: "test",
      content: "testest",
      image: "",
      price: 150000000,
    },
  ];

  const myList = {
    id: listId,
    category,
    categoryId: id,
    title: "test",
    content: "testest",
    image: "",
    price: 150000000,
  };

  const addList = () => {
    if (!check) {
      myPostMutation.mutate({ uid, lists });
    } else {
      changeMyPostMutation.mutate([myId, { lists: [...myLists, myList] }]);
    }
    postMutation.mutate([category, list]);
    goBack();
  };

  return (
    <TouchableOpacity onPress={addList}>
      <Text>WriteList</Text>
    </TouchableOpacity>
  );
};

export default WriteList;
