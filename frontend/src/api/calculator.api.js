import axios from "axios";

export const calculate = async (data) => {
  return await axios.post("http://localhost:3000/api/v1/calculator", data);
};
