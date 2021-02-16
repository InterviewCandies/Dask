import { useSnackbar } from "notistack";
import React from "react";
import { useForm } from "react-hook-form";
import { login } from "../../api/firebase/authentication";
import LoginButtonGroup from "../../components/common/LoginButtonGroup/LoginButtonGroup";
import useGetToken from "../../hooks/useGetToken";

function Login() {
  const { handleSubmit, register } = useForm();
  const getToken = useGetToken();

  const onSubmit = async (data: { email: string; password: string }) => {
    const result = await login(data.email, data.password);
    await getToken(result);
  };

  return (
    <div className="w-screen h-screen bg-blue-300 flex justify-center items-center">
      <div className="bg-white h-full sm:h-auto p-8 w-full sm:w-96 rounded shadow-md flex flex-col justify-center">
        <h1 className="font-bold text-gray-500 text-center py-5">Log in</h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="border-gray-300 border-solid border-2 bg-gray-100 text-gray-500 p-2 w-full outline-none focus: border-solid focus:border-blue-500 focus:border-2"
            placeholder="Enter email"
            name="email"
            ref={register}
          ></input>
          <input
            className="border-gray-300 border-solid border-2  bg-gray-100 text-gray-500 p-2 w-full outline-none focus: border-solid focus:border-blue-500 focus:border-2"
            placeholder="Enter password"
            type="password"
            ref={register}
            name="password"
          ></input>
          <button
            className="bg-blue-500 font-semibold w-full p-2 text-white hover:bg-blue-400 rounded focus:outline-none"
            type="submit"
          >
            Log in
          </button>
        </form>
        <h1 className="text-center font-light text-sm py-4">OR</h1>
        <div className="pb-4">
          <LoginButtonGroup></LoginButtonGroup>
        </div>
        <hr className="border-solid border-gray-300 my-3"></hr>
        <h1 className="text-center text-gray-500 text-sm">
          Don't have account ?{" "}
          <a href="/register" className="text-blue-500 font-semibold">
            Register now
          </a>
        </h1>
      </div>
    </div>
  );
}

export default Login;
