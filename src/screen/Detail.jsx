import { ActivityIndicator, Text, View } from "react-native";
import styled from "@emotion/native";
import { height, width } from "../common/util";
import { useRoute } from "@react-navigation/native";
import DetailList from "../components/DetailList";
import { getComment } from "../common/api";
import { useInfiniteQuery } from "react-query";
import { Loader } from "../styles/styled";
import Comments from "../components/Comments";

const Detail = () => {
  const { params } = useRoute();
  const category = params.category;
  const listId = params.id;
  const comment = category + listId;

  const { isLoading, isError, data, error, fetchNextPage, hasNextPage } =
    useInfiniteQuery(comment, getComment, {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return nextPage;
      },
    });

  if (isLoading) {
    return (
      <Loader>
        <ActivityIndicator size={"large"} />
      </Loader>
    );
  }
  if (isError) return <Text>에러: {error}</Text>;

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <DetailFlat
      onEndReached={loadMore}
      onEndReachedThreshold={0.4}
      ListHeaderComponent={<DetailList category={category} listId={listId} />}
      data={data.pages.flat()}
      renderItem={({ item }) => <Comments comment={item} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={<View style={{ height: 10 }} />}
    />
  );
};

export default Detail;

const DetailFlat = styled.FlatList`
  position: relative;
  width: ${width + "px"};
  height: ${height + "px"};
`;
