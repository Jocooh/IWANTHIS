import axios from "axios";

export const SERVER_ADDRESS = "https://regal-roomy-skunk.glitch.me"; // 나중에 바꾸기

export const getList = async ({ queryKey }) => {
  const [category, id] = queryKey;
  const { data } = await axios.get(`${SERVER_ADDRESS}/${category}/${id}`);
  return data;
};

export const getComment = async ({ pageParam = 1, queryKey }) => {
  const [comment] = queryKey;
  const { data } = await axios.get(
    `${SERVER_ADDRESS}/${comment}?_page=${pageParam}`
  );
  return data;
};

export const postComment = async (a) => {
  const [category, id, comment] = a;
  return await axios.post(`${SERVER_ADDRESS}/${category}${id}`, comment);
};
