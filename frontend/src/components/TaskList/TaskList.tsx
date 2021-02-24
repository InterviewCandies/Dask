import React, { useRef, useState } from "react";
import Avatars from "../Avatars/Avatars";
import {
  User,
  MAXIMUM_MEMBERS_DISPLAYED_PER_TASK,
  Task,
  List,
  Board,
  DEFAULT_BOARD_COVER,
} from "../../types";
import CustomMenu from "../CustomMenu/CustomMenu";
import { deleteList, updateList } from "../../api/list/list";
import useUpdateBoard from "../../hooks/useUpdateBoard";
import { updateLists } from "../../actions/list";
import { useDialog } from "../../provider/DialogProvider";
import NewCard from "../../container/NewCard/NewCard";
import TaskDetails from "../../container/TaskDetails/TaskDetails";

const Tag = () => {
  return (
    <div className="py-1 px-2 bg-blue-100 text-blue-500 text-xs rounded-full w-min">
      Techinical
    </div>
  );
};

const TaskCard = ({ task }: { task: Task }) => {
  const [openDialog, closeDialog] = useDialog();
  return (
    <div
      className="space-y-2 bg-white p-3 rounded-2xl shadow-md"
      onClick={() =>
        openDialog({ children: <TaskDetails task={task}></TaskDetails> })
      }
    >
      {task.coverURL && (
        <img
          src={task.coverURL || DEFAULT_BOARD_COVER}
          className="h-28 w-full rounded-lg"
        ></img>
      )}
      <h1 className="text-lg font-semibold">{task.title}</h1>
      <Tag></Tag>
      <div className="flex space-x-2 items-center">
        <Avatars
          members={task.members as []}
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
  const [openDialog, closeDialog] = useDialog();

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

    const inx = board.lists?.findIndex((item) => item._id == list._id);
    const newLists = (board.lists as List[]).filter(
      (item) => item._id !== list._id
    );
    newLists.splice(inx as number, 0, { ...list, title: name });

    result = await saveChangesToBoard(
      { ...board, lists: [...newLists] },
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
      {list.tasks.map((task) => (
        <TaskCard key={task._id} task={task}></TaskCard>
      ))}
      <button
        className="bg-blue-100 focus:outline-none p-2 rounded-xl text-blue-500 flex justify-between items-center w-full"
        onClick={() => {
          openDialog({
            children: <NewCard board={board} list={list}></NewCard>,
          });
        }}
      >
        <span>Add another card</span>
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
}

export default TaskList;
