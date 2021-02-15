import axios from "axios";
import { Board } from "../../types";

export const createBoard = async (data: Board) => {
  const result = await axios.post(
    "http://localhost:4000/api/boards/create",
    data
  );
  return result;
};

export const fetchBoardsByEmail = async (email: string) => {
  const result = await axios.get(
    `http://localhost:4000/api/boards/user=${email}`
  );
  const data = await result.data;
  return data;
};
