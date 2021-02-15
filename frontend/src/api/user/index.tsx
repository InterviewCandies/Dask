import axios from "../../utils/axios";
import { User } from "../../types";
import { Message } from "../../types";

export const createUser = async (data: User): Promise<Message> => {
  try {
    const result = await axios.post("/users/create", data);
    return { data: result.data };
  } catch (error) {
    console.log(error);
    return {
      status: error.response.status,
      message: error.response.data.message,
    };
  }
};
