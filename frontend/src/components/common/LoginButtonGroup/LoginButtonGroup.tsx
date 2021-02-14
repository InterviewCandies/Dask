import React from "react";
import GoogleIcon from "../../../assets/img/google.svg";
import GithubIcon from "../../../assets/img/github.svg";

const Button = (props: {
  children: JSX.Element | string;
  icon: string | any;
  onClick: Function;
}) => {
  return (
    <div>
      <button className="w-full shadow-md rounded text-gray-500 font-semibold p-2 flex items-center justify-center hover:bg-gray-200">
        <img src={props.icon} className="w-4 h-4 mr-3"></img> {props.children}
      </button>
    </div>
  );
};

function LoginButtonGroup() {
  return (
    <div className="space-y-4">
      <Button icon={GoogleIcon} onClick={() => {}}>
        Continue with Google
      </Button>
      <Button icon={GithubIcon} onClick={() => {}}>
        Continue with Github
      </Button>
    </div>
  );
}

export default LoginButtonGroup;
