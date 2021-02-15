import axios from "../../utils/axios";
import { Board } from "../../types";

export const createBoard = async (data: Board) => {
  const result = await axios.post("/boards/create", data);
  return result;
};

export const fetchBoardsByEmail = async (email: string) => {
  const result = await axios.get(`/boards/user=${email}`);
  const data = await result.data;
  return data;
};
