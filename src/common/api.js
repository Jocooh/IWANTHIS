import axios from "axios";

export const SERVER_ADDRESS = "http://localhost:4000"; // 나중에 바꾸기

export const getCategories = async () => {
  try {
    const { data } = await axios.get(`${SERVER_ADDRESS}/categories`);
    return data;
  } catch (e) {
    alert("잠시후 다시 시도");
  }
};
