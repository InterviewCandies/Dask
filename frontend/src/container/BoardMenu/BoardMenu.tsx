import { useSnackbar } from "notistack";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBoards } from "../../actions/board";
import { updateBoard } from "../../api/board";
import Loader from "../../components/common/Loader/Loader";
import { Board, DEFAULT_AVATAR, StateTypes, User } from "../../types";

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
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const updateMembers = useCallback(
    (board: Board[]) => {
      dispatch(updateBoards(board));
    },
    [dispatch]
  );

  const removeFromBoard = async () => {
    setLoading(true);
    const result = await updateBoard({
      ...board,
      members: [
        ...(board?.members as User[]).filter(
          (member) => member.email != user.email
        ),
      ],
    } as any);
    if (result.status) {
      enqueueSnackbar(result.message, { variant: "error" });
      setLoading(false);
      return;
    } else
      enqueueSnackbar(`${user.email} has been added to board`, {
        variant: "success",
      });
    if (board && board.members) {
      board.members = [
        ...(board?.members as User[]).filter(
          (member) => member.email != user.email
        ),
      ];
    }
    updateMembers([...boards]);
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
            className="bg-red-500 text-white rounded-full  focus:outline-none w-6 h-6 flex items-center justify-center  font-semibold m-0"
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
  return (
    <div className="bg-white w-80 p-4 space-y-6">
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
            <h1 className="text-xs text-gray-500">{Date.now()}</h1>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <h1 className="text-xs text-gray-600 font-semibold">
          <i className="fas fa-file-alt mr-2"></i> Description
        </h1>
        <p className="text-sm m-0">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero iure
          esse nisi, molestiae distinctio consequuntur perferendis mollitia
          exercitationem itaque. Maxime mollitia, corrupti enim maiores saepe
          provident quis neque illum velit?
        </p>
      </div>
      <div className="space-y-3">
        <h1 className="text-xs text-gray-600 font-semibold">
          <i className="fas fa-users"></i> Team
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
