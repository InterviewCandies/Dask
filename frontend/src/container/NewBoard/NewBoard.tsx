import React, { useRef, useState, useEffect, SetStateAction } from "react";
import GrayButton from "../../components/common/GrayButton/GrayButton";
import fallbackImage from "../../assets/img/fallback.jpg";
import { useForm } from "react-hook-form";
import { Board } from "../../types";
import { EventType } from "@testing-library/react";
import { createBoard } from "../../api/board";
function NewBoard(props: { handleClose: Function }) {
  const [visibility, setVisibility] = useState(1);
  const { register, handleSubmit } = useForm();
  const fileRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState();

  // create a preview as a side effect, whenever selected file is changed
  // Reference: https://stackoverflow.com/a/57781164/14480038
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    //@ts-ignore
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e: any) => {
    e.stopPropagation();
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const onSubmit = async (data: Board) => {
    data.visibility = Boolean(visibility);
    console.log("hello");
    const result = await createBoard(data);
    props.handleClose();
  };
  return (
    <form
      className="bg-white p-4 flex-col flex space-y-8 min-w-min md:w-96 rounded relative"
      onSubmit={handleSubmit(onSubmit)}
    >
      <img
        className="w-full h-32 object-contain"
        src={preview ? preview : fallbackImage}
      ></img>
      <input
        className="bg-white shadow rounded-lg p-3 outline-none border-gray-300"
        placeholder="Add board title"
        name="title"
        ref={register({ required: true })}
      ></input>
      <div className="flex justify-between w-full">
        <GrayButton
          icon="fas fa-image"
          onClick={() => {
            (fileRef.current as any)!.click();
          }}
        >
          Cover
        </GrayButton>
        <input
          type="file"
          className="hidden"
          name="cover"
          onChange={onSelectFile}
          ref={(e) => {
            register(e);
            //@ts-ignore
            fileRef.current = e;
          }}
        ></input>
        <GrayButton
          icon="fas fa-lock"
          onClick={() => setVisibility((prevState) => 1 - prevState)}
        >
          Visibility
        </GrayButton>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          className="py-2 px-3 hover:bg-gray-200 focus:outline-none rounded-lg"
          onClick={() => props.handleClose()}
        >
          Cancel
        </button>
        <button
          className="py-2 px-3 bg-blue-500 hover:bg-blue-400 text-white rounded-lg focus:outline-none font-semibold"
          type="submit"
        >
          <i className="fas fa-plus"></i> Create
        </button>
      </div>
    </form>
  );
}

export default NewBoard;
