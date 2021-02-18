import { Message, Task } from "../../types";
import axios from "../../utils/axios";
import { errorHandler } from "../../utils/errorHandler";

export const createTask = async (data: Task): Promise<Message> => {
  try {
    const result = await axios.post("/tasks/create", { ...data });
    return { data: result.data };
  } catch (error) {
    return errorHandler(error);
  }
};
