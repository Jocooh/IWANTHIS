import axios from "axios";

export const SERVER_ADDRESS = "https://regal-roomy-skunk.glitch.me"; // 나중에 바꾸기

export const getLists = async ({ queryKey }) => {
  const [category] = queryKey;
  const { data } = await axios.get(`${SERVER_ADDRESS}/${category}`);
  return data;
};

export const getDetailList = async ({ queryKey }) => {
  const [category, id] = queryKey;
  const { data } = await axios.get(`${SERVER_ADDRESS}/${category}/${id}`);
  return data;
};

export const getMyPost = async ({ queryKey }) => {
  const { data } = await axios.get(`${SERVER_ADDRESS}/users${queryKey}`);
  return data;
};

export const getUsers = async () => {
  const { data } = await axios.get(`${SERVER_ADDRESS}/users`);
  return data;
};

export const postList = ([category, list]) => {
  return axios.post(`${SERVER_ADDRESS}/${category}`, list);
};

export const postMy = (list) => {
  return axios.post(`${SERVER_ADDRESS}/users`, list);
};

export const deleteDetail = ([category, id]) => {
  return axios.delete(`${SERVER_ADDRESS}/${category}/${id}`);
};

export const changeDetail = ([category, id, edit]) => {
  console.log(category, id, edit);
  return axios.patch(`${SERVER_ADDRESS}/${category}/${id}`, edit);
};

export const changeMyPost = ([id, edit]) => {
  return axios.patch(`${SERVER_ADDRESS}/users/${id}`, edit);
};
