import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../../components/common/Loader/Loader";
import useUpdateBoard from "../../hooks/useUpdateBoard";
import { Board, DEFAULT_AVATAR, StateTypes, User } from "../../types";
import { formatDate } from "../../utils/formatDate";

const UserItem = ({
  owner,
  user,
  id,
}: {
  owner: string;
  user: User;
  id: string;
}) => {
  const boards = useSelector((state: StateTypes) => state.boards);
  const board = boards.find((board) => board._id === id);
  const [loading, setLoading] = useState(false);
  const { saveChangesToBoard } = useUpdateBoard();

  const removeFromBoard = async () => {
    setLoading(true);
    const newBoard = {
      ...board,
      members: [
        ...(board?.members as User[]).filter(
          (member) => member.email != user.email
        ),
      ],
    };
    await saveChangesToBoard(
      newBoard as Board,
      `${user.email} has been removed from board`
    );
    setLoading(false);
  };

  return (
    <>
      <div className="flex space-y-2 justify-between items-center rounded pb-4">
        <div className="flex justify-center  items-center">
          <img
            className="w-8 h-8 rounded-lg mr-2"
            src={user.photoURL ? user.photoURL : DEFAULT_AVATAR}
          ></img>
          <h1 className="text-sm truncate m-0 w-44">{user.email}</h1>
        </div>
        {owner !== user.email ? (
          <button
            className="ring-red-500 ring-2 text-red-500 hover:bg-red-100 rounded-full  focus:outline-none w-5 h-5 flex items-center justify-center  font-semibold m-0"
            onClick={removeFromBoard}
          >
            <i className="fas fa-minus text-xs"></i>
          </button>
        ) : (
          <span className="text-xs text-gray-600">Admin</span>
        )}
      </div>
      {loading && <Loader title="Processing..."></Loader>}
    </>
  );
};

const displayUsers = (users: User[], id: string, owner: string) => {
  return users.map((user) => (
    <UserItem owner={owner} user={user} key={user.email} id={id}></UserItem>
  ));
};

function BoardMenu({ board, onClose }: { board: Board; onClose: () => void }) {
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const descriptionRef = useRef(null);
  const { saveChangesToBoard } = useUpdateBoard();

  const handleSaveDescription = async () => {
    setLoading(true);
    if (descriptionRef.current) {
      const description =
        (descriptionRef.current as any).value.trim() || "No description";
      const newBoard = { ...board, description };
      const result = await saveChangesToBoard(
        newBoard,
        "Description has been updated"
      );
      if (!result.status) setEdit(false);
    }
    setLoading(false);
  };
  return (
    <div className="bg-white w-80 p-4 space-y-6">
      {loading && <Loader></Loader>}
      <div className="flex justify-between items-center">
        <h1 className="font-bold">Menu</h1>
        <i
          className="fas fa-times cursor-pointer"
          onClick={() => onClose()}
        ></i>
      </div>
      <hr className="my-2"></hr>
      <div className="space-y-3">
        <h1 className="text-xs text-gray-600 font-semibold">
          <i className="fas fa-user mr-1"></i> Made by
        </h1>
        <div className="flex space-x-2 items-center">
          <img
            src={board.coverURL || DEFAULT_AVATAR}
            className="w-9 h-9 rounded-lg"
          ></img>
          <div>
            <h1 className="text-sm font-bold">{board.owner}</h1>
            <h1 className="text-xs text-gray-500">
              on {board.createdDate && formatDate(board.createdDate)}
            </h1>
          </div>
        </div>
      </div>
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
              className="ring-2 ring-gray-200 rounded-lg w-full focus:outline-none"
              style={{ padding: "0.5rem" }}
            >
              {board.description}
            </textarea>
            <div className="flex space-x-2 mt-2">
              <button
                className="bg-green-600 font-semibold text-white px-3 py-1 rounded-xl focus:outline-none hover:bg-green-500"
                onClick={handleSaveDescription}
              >
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
          <p className="text-sm m-0">{board.description}</p>
        )}
      </div>
      <div className="space-y-3">
        <h1 className="text-xs text-gray-600 font-semibold">
          <i className="fas fa-users mr-2"></i> Team
        </h1>
        <div>
          {board.members &&
            board.owner &&
            displayUsers(board.members, board._id, board.owner)}
        </div>
      </div>
    </div>
  );
}

export default BoardMenu;
