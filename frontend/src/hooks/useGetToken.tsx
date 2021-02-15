import { useSnackbar } from "notistack";
import { Dispatch, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authenticateUser } from "../actions/authentication";
import { createUser } from "../api/user";
import { AUTH_TOKEN, Message, User } from "../types";
import instance from "../utils/axios";
export default function useGetToken() {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const dispatch: Dispatch<any> = useDispatch();

  const updateUser = useCallback(
    (data: User) => dispatch(authenticateUser(data)),
    [dispatch]
  );
  return async (result: Message) => {
    updateUser(result.data);
    result = await createUser(result.data);
    if (result.status) enqueueSnackbar(result.message, { variant: "error" });
    localStorage.setItem(AUTH_TOKEN, result.data);
    instance.defaults.headers.common["Authorization"] = "Bearer " + result.data;
    history.push("/all");
  };
}
