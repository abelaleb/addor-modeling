import axios from "axios";
export const getModels = async (url: string) => {
  const response = await axios.get(url);
  const data = response.data;
  return data;
};
