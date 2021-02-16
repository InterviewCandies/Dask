import React from "react";
import Avatars from "../Avatars/Avatars";
import { User, MAXIMUM_MEMBERS_DISPLAYED_PER_TASK } from "../../types";
const photoURL = undefined;

const members: User[] = [
  { photoURL: "", email: "" },
  { photoURL: "", email: "" },
  { photoURL: "", email: "" },
  { photoURL: "", email: "" },
  { photoURL: "", email: "" },
  { photoURL: "", email: "" },
];

const Tag = () => {
  return (
    <div className="py-1 px-2 bg-blue-100 text-blue-500 text-xs rounded-full w-min">
      Techinical
    </div>
  );
};

const TaskCard = () => {
  return (
    <div className="space-y-2 bg-white p-3 rounded-2xl">
      {photoURL && (
        <img src={photoURL} className="h-28 w-full rounded-lg"></img>
      )}
      <h1 className="text-lg font-semibold">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam vero
        deserunt tempore enim dolor magni perspiciatis quia numquam nihil amet!
      </h1>
      <Tag></Tag>
      <div className="flex space-x-2 items-center">
        <Avatars
          members={members}
          limit={MAXIMUM_MEMBERS_DISPLAYED_PER_TASK}
        ></Avatars>
        <button className="w-9 h-9 bg-blue-500 rounded text-white hover:bg-blue-300">
          <i className="fas fa-plus"></i>
        </button>
      </div>
    </div>
  );
};

function TaskList() {
  return (
    <div className="h-full space-y-4">
      <div className="flex justify-between">
        <h1>Title</h1>
        <i className="fas fa-ellipsis-h"></i>
      </div>
      <TaskCard></TaskCard>
      <TaskCard></TaskCard>
      <TaskCard></TaskCard>
      <TaskCard></TaskCard>

      <button className="bg-blue-100 p-2 rounded-xl text-blue-500 flex justify-between items-center w-full">
        <span>Add another card</span>
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
}

export default TaskList;
