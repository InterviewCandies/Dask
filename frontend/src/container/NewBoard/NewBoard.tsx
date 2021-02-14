import React, { useState } from "react";
import GrayButton from "../../components/common/GrayButton/GrayButton";
import fallbackImage from "../../assets/img/fallback.jpg";
function NewBoard(props: { handleClose: Function }) {
  const [visibility, setVisibility] = useState(false);
  return (
    <form
      className="bg-white p-4 flex-col flex space-y-8 min-w-min md:w-96 rounded relative"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <img className="w-full h-32 object-contain" src={fallbackImage}></img>
      <input
        className="bg-white shadow rounded-lg p-3 outline-none border-gray-300"
        placeholder="Add board title"
      ></input>
      <div className="flex justify-between w-full">
        <GrayButton icon="fas fa-image" onClick={() => {}}>
          Cover
        </GrayButton>

        <GrayButton icon="fas fa-lock" onClick={() => setVisibility(true)}>
          Private
        </GrayButton>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          className="py-2 px-3 hover:bg-gray-200 focus:outline-none rounded-lg"
          onClick={() => props.handleClose()}
        >
          Cancel
        </button>
        <button className="py-2 px-3 bg-blue-500 hover:bg-blue-400 text-white rounded-lg focus:outline-none font-semibold">
          <i className="fas fa-plus"></i> Create
        </button>
      </div>
    </form>
  );
}

export default NewBoard;
