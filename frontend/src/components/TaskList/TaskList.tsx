import React, { useRef, useState } from "react";
import Avatars from "../Avatars/Avatars";
import {
  User,
  MAXIMUM_MEMBERS_DISPLAYED_PER_TASK,
  Task,
  List,
  Board,
} from "../../types";
import CustomMenu from "../CustomMenu/CustomMenu";
import { deleteList, updateList } from "../../api/list/list";
import useUpdateBoard from "../../hooks/useUpdateBoard";
import { updateLists } from "../../actions/list";
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

function TaskList({ board, list }: { board: Board; list: List }) {
  const optionsRef = useRef(null);
  const titleRef = useRef(null);
  const { saveChangesToBoard } = useUpdateBoard();
  const [loading, setLoading] = useState(false);
  const [rename, setRename] = useState(false);

  const handleDelete = async () => {
    setLoading(false);
    const result = await deleteList(list);
    if (result.status) {
      return;
    }
    const newLists = board.lists?.filter((item) => item._id !== list._id);
    if (newLists)
      await saveChangesToBoard(
        { ...board, lists: [...newLists] },
        `${list.title} has been removed from this board`
      );
    setLoading(true);
  };

  const handleRename = async () => {
    setLoading(false);
    if (!titleRef.current) return;
    const name = (titleRef.current as any).value;
    let result = await updateList({ ...list, title: name });
    if (result.status) {
      return;
    }
    const newLists = board.lists?.filter((item) => item._id !== list._id);
    result = await saveChangesToBoard(
      { ...board, lists: [...(newLists as []), { ...list, title: name }] },
      `Task list has been renamed to ${name}`
    );
    if (!result.status) setRename(false);
    setLoading(true);
  };
  return (
    <div className="h-full space-y-4">
      <div className="flex justify-between items-center">
        {rename ? (
          <div className="flex space-x-1 items-center">
            <input
              className="focus:outline-none rounded-lg py-1 foucs:ring-blue-500 focus:ring-1 shadow px-1"
              placeholder="Type here"
              defaultValue={list.title}
              ref={titleRef}
            ></input>
            <button
              className="rounded-full bg-green-600 text-white w-6 h-6 focus:outline-none"
              onClick={handleRename}
            >
              <i className="fas fa-check text-xs"></i>
            </button>
          </div>
        ) : (
          <h1>{list.title}</h1>
        )}
        <div>
          <i className="fas fa-ellipsis-h cursor-pointer" ref={optionsRef}></i>
          <CustomMenu
            ref={optionsRef}
            options={[
              { title: "Rename", onClick: () => setRename(true) },
              { title: "Delete this list", onClick: handleDelete },
            ]}
          ></CustomMenu>
        </div>
      </div>
      <TaskCard></TaskCard>

      <button className="bg-blue-100 focus:outline-none p-2 rounded-xl text-blue-500 flex justify-between items-center w-full">
        <span>Add another card</span>
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
}

export default TaskList;
