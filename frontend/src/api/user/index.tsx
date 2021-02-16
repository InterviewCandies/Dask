import axios from "../../utils/axios";
import { User } from "../../types";
import { Message } from "../../types";
import { errorHandler } from "../../utils/errorHandler";

export const createUser = async (data: User): Promise<Message> => {
  try {
    const result = await axios.post("/users/create", data);
    return { data: result.data };
  } catch (error) {
    return errorHandler(error);
  }
};
