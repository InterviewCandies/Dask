import { useSnackbar } from "notistack";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentTask } from "../actions/task";
import { updateTask } from "../api/task/task";
import { Task } from "../types";

function useUpdateCurrentTask() {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const updateReduxTask = useCallback(
    (task: Task) => {
      dispatch(updateCurrentTask({ ...task }));
    },
    [dispatch]
  );

  const saveChangesToCurrentTask = async (
    newTask: Task,
    successMessage?: string
  ) => {
    const result = await updateTask(newTask);
    if (result.status) {
      enqueueSnackbar(result.message, { variant: "error" });
      return result;
    } else
      successMessage &&
        enqueueSnackbar(successMessage, {
          variant: "success",
        });

    updateReduxTask(newTask);
    return result;
  };
  return { saveChangesToCurrentTask };
}

export default useUpdateCurrentTask;
