import React, { useRef, useState } from "react";
import GrayButton from "../../components/common/GrayButton/GrayButton";
import { useDialog } from "../../provider/DialogProvider";
import { DEFAULT_AVATAR } from "../../types";

const Comment = () => {
  return (
    <div className="space-y-2 border-t-2 first:border-0 py-5 border-gray-200">
      <div className="flex justify-between items-top">
        <div className="flex items-center space-x-2">
          <img
            className="w-9 h-9 rounded-lg"
            src="https://images.unsplash.com/photo-1539678955859-9f368343753f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8N3x8fGVufDB8fHw%3D&auto=format&fit=crop&w=500&q=60"
          ></img>
          <div>
            <h1 className="text-sm font-bold">Thang vo quoc</h1>
            <p className="text-xs text-gray-600">on July 3, 2020</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="text-gray-500 text-xs hover:bg-gray-100 py-1 p-2 rounded-lg">
            Edit
          </button>
          <button className="text-gray-500 text-xs hover:bg-gray-100 py-1 p-2 rounded-lg">
            Delete
          </button>
        </div>
      </div>
      <div>
        <p className="">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt,
          delectus cupiditate quia natus ad quidem quas provident enim?
          Consequuntur dolor ea maxime dolorum veniam molestiae labore nobis eos
          tempora cupiditate.
        </p>
      </div>
    </div>
  );
};

const Comments = () => {
  return (
    <div className="space-y-4">
      <div className="p-4 border-2 border-gray-300 shadow rounded-xl">
        <div className=" flex space-x-2 ">
          <img className="w-9 h-9" src={DEFAULT_AVATAR}></img>
          <textarea
            className="w-full focus:outline-none"
            placeholder="Write a comment"
            rows={4}
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button className="bg-blue-500 px-3 py-1 text-white rounded-xl">
            Send
          </button>
        </div>
      </div>
      <div className="first:border-0">
        <Comment></Comment>
        <Comment></Comment>
        <Comment></Comment>
      </div>
    </div>
  );
};

const Attachment = () => {
  return (
    <div className="flex space-x-2 items-center">
      <div className="w-40 h-20 bg-gray-200"></div>
      <div className="space-y-1">
        <p className="text-xs text-gray-400">{Date.now()}</p>
        <h1 className="font-bold">Tittle</h1>
        <div className="flex space-x-2">
          <button className="hover:bg-gray-200 text-sm px-2 py-1 ring-2 ring-gray-300 bg-white rounded-lg">
            Download
          </button>
          <button className="hover:bg-gray-200 text-sm px-2 py-1 ring-2 ring-gray-300 bg-white rounded-lg">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const Attachments = () => {
  return (
    <div className="space-y-4">
      <Attachment></Attachment>
      <Attachment></Attachment>
      <Attachment></Attachment>
      <Attachment></Attachment>
    </div>
  );
};

function TaskDetails() {
  const descriptionRef = useRef(null);
  const [edit, setEdit] = useState(false);
  const [, closeDialog] = useDialog();
  return (
    <div className="p-5 space-y-4 w-auto relative">
      <button
        className=" px-3 absolute focus:outline-none top-2.5 right-2.5  py-1 rounded-lg bg-blue-500 text-white"
        onClick={closeDialog}
      >
        <i className="fas fa-times"></i>
      </button>
      <img
        src="https://images.unsplash.com/photo-1539678955859-9f368343753f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8N3x8fGVufDB8fHw%3D&auto=format&fit=crop&w=500&q=60"
        className="w-full h-28 rounded"
      ></img>
      <div>
        <h1 className="font-bold text-xl">Title</h1>
        <p className="text-gray-600 text-xs">
          In list <span className="font-bold">progress</span>
        </p>
      </div>
      <div className="grid md:grid-cols-4 grid-cols-1 space-y-4 md:space-y-0">
        <div className="space-y-4 mt-4 col-span-3">
          <div className="space-y-3">
            <div className="flex space-x-3 text-xs items-center">
              <h1 className="text-xs text-gray-600 font-semibold">
                <i className="fas fa-file-alt mr-2"></i> Description
              </h1>
              <button
                className="ring-1 ring-gray-300  hover:bg-gray-100 focus:outline-none text-gray-500 bg-white py-1 px-3 rounded-lg"
                onClick={() => setEdit((prevState) => !prevState)}
              >
                <i className="fas fa-edit mr-2"></i>Edit
              </button>
            </div>
            {edit ? (
              <div>
                <textarea
                  ref={descriptionRef as any}
                  className="ring-2 w-full md:w-4/5   ring-gray-200 rounded-lg  focus:outline-none"
                  style={{ padding: "0.5rem" }}
                ></textarea>
                <div className="flex space-x-2 mt-2">
                  <button className="bg-green-600 font-semibold text-white px-3 py-1 rounded-xl focus:outline-none hover:bg-green-500">
                    Save
                  </button>
                  <button
                    className="px-2 py-1 rounded-xl focus:outline-none   hover:font-semibold hover:bg-gray-100"
                    onClick={() => setEdit(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm m-0">{"sdfsfsf"}</p>
            )}
          </div>
          <div className="space-y-3">
            <div className="flex space-x-3 text-xs items-center">
              <h1 className="text-xs text-gray-600 font-semibold">
                <i className="fas fa-paperclip mr-2"></i> Attachments
              </h1>
              <button
                className="ring-1 ring-gray-300  hover:bg-gray-100 focus:outline-none text-gray-500 bg-white py-1 px-3 rounded-lg"
                onClick={() => {}}
              >
                <i className="fas fa-plus mr-2"></i>Add
              </button>
            </div>
            <Attachments></Attachments>
          </div>
        </div>
        <div>
          <h1 className="text-xs text-gray-600 font-semibold mb-2">
            <i className="fas fa-tools mr-2"></i> Actions
          </h1>
          <div className="flex flex-row space-x-2 md:space-x-0 md:flex-col md:space-y-3">
            <GrayButton icon="fas fa-image mr-2">Cover</GrayButton>
            <GrayButton icon="fas fa-tags mr-2">Labels</GrayButton>
            <GrayButton icon="fas fa-users mr-2">Members</GrayButton>
          </div>
        </div>
      </div>
      <div className="overflow-y-auto">
        <Comments></Comments>
      </div>
    </div>
  );
}

export default TaskDetails;
