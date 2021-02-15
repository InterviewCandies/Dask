import axios from "axios";
import { User } from "../../types";

export const createUser = async (data: User) => {
  const response = await axios.post(
    "http://localhost:4000/api/users/create",
    data
  );
  console.log(response);
};
