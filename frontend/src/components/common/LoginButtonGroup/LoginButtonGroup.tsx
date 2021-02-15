import React, { useCallback } from "react";
import GoogleIcon from "../../../assets/img/google.svg";
import GithubIcon from "../../../assets/img/github.svg";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { authenticateUser } from "../../../actions/authentication";
import { Message, User } from "../../../types";
import {
  signInWithGithub,
  signInWithGoogle,
} from "../../../api/authentication";
import { useSnackbar } from "notistack";
import { createUser } from "../../../api/user";

const Button = (props: {
  children: JSX.Element | string;
  icon: string | any;
  onClick: Function;
}) => {
  return (
    <div>
      <button
        className="w-full shadow-md rounded text-gray-500 font-semibold p-2 flex items-center justify-center hover:bg-gray-200 focus:outline-none"
        onClick={() => props.onClick()}
      >
        <img src={props.icon} className="w-4 h-4 mr-3"></img> {props.children}
      </button>
    </div>
  );
};

function LoginButtonGroup() {
  const history = useHistory();
  const dispatch: Dispatch<any> = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const updateUser = useCallback(
    (data: User) => dispatch(authenticateUser(data)),
    [dispatch]
  );

  const handleResult = async (result: Message) => {
    if (result.status) enqueueSnackbar(result.message, { variant: "error" });
    else {
      updateUser(result.data);
      await createUser(result.data);
      history.push("/all");
    }
  };

  const continueWithGoogle = async () => {
    const result = await signInWithGoogle();
    await handleResult(result);
  };

  const continueWithGithub = async () => {
    const result = await signInWithGithub();
    await handleResult(result);
  };

  return (
    <div className="space-y-4">
      <Button icon={GoogleIcon} onClick={continueWithGoogle}>
        Continue with Google
      </Button>
      <Button icon={GithubIcon} onClick={continueWithGithub}>
        Continue with Github
      </Button>
    </div>
  );
}

export default LoginButtonGroup;
