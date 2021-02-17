import { useSnackbar } from "notistack";
import React, { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { updateBoards } from "../../actions/board";
import { updateBoard } from "../../api/board";
import Avatars from "../../components/Avatars/Avatars";
import GrayButton from "../../components/common/GrayButton/GrayButton";
import Layout from "../../components/common/Layout/Layout";
import Searchbar from "../../components/common/Searchbar/Searchbar";
import CustomMenu from "../../components/CustomMenu/CustomMenu";
import CustomPopover from "../../components/CustomPopover/CustomPopover";
import TaskList from "../../components/TaskList/TaskList";
import {
  DEFAULT_AVATAR,
  MAXIMUM_MEMBERS_DISPLAYED_PER_BOARD,
  StateTypes,
  User,
} from "../../types";

const VisilityMenu = ({
  id,
  closePopover,
}: {
  id: string;
  closePopover?: Function;
}) => {
  const boards = useSelector((state: StateTypes) => state.boards);
  const board = boards.find((board) => board._id === id);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch: Dispatch<any> = useDispatch();

  const updateVisibility = useCallback(
    (boards) => dispatch(updateBoards(boards)),
    [dispatch]
  );

  const handleClick = async (status: Boolean) => {
    const result = await updateBoard({
      ...board,
      visibility: status,
    } as any);
    if (result.status) {
      enqueueSnackbar(result.message, { variant: "error" });
      return;
    } else enqueueSnackbar("Board is updated", { variant: "success" });
    if (board && board.visibility != undefined) board.visibility = status;
    updateVisibility([...boards]);
    if (closePopover) closePopover();
  };

  return (
    <div className="bg-white p-3 w-min space-y-3">
      <div>
        <h1 className="font-bold text-sm">Visibility</h1>
        <p className="text-gray-600 text-sm mt-1">
          Choose who can see to this board
        </p>
      </div>
      <button
        className={`space-y-3 rounded-xl focus:outline-none w-60 text-left p-2 pl-3 ${
          board?.visibility ? " hover:bg-gray-100" : "bg-gray-100"
        }`}
        disabled={board?.visibility === false}
        onClick={() => handleClick(false)}
      >
        <p className="font-semibold text-gray-600 text-sm mb-1">
          <i className="fas fa-globe-asia mr-2"></i> Public
        </p>
        <p className="text-xs text-gray-700 mt-0">
          Anyone on internet can see this
        </p>
      </button>
      <button
        className={`space-y-3 rounded-xl focus:outline-none w-60 text-left p-2 pl-3 ${
          board?.visibility ? "bg-gray-100" : "hover:bg-gray-100"
        }`}
        disabled={board?.visibility === true}
        onClick={() => handleClick(true)}
      >
        <p className="font-semibold text-gray-600 text-sm mb-1">
          <i className="fas fa-lock mr-2"></i> Private
        </p>
        <p className="text-xs text-gray-600 mt-0">
          Only board members can see this
        </p>
      </button>
    </div>
  );
};

const InvitationMenu = () => {
  return (
    <div className="bg-gray-50 p-3 space-y-4 text-center w-80">
      <div className="text-left">
        <h1 className="font-bold text-sm">Invite to board</h1>
        <p className="text-gray-600 text-sm">Search user you want to invite</p>
      </div>
      <Searchbar></Searchbar>
      <div className="bg-white shadow h-48 rounded-xl p-2 overflow-y-auto space-y-2">
        <div className="flex flex-wrap space-y-2 justify-between items-center text-left  hover:bg-gray-100 rounded p-2">
          <div className="flex  flex-wrap items-center">
            <img className="w-8 h-8 rounded-lg mr-2" src={DEFAULT_AVATAR}></img>
            <h1 className="text-sm m-0">
              Lorem, ipsum dolor sit sdadasdasdasdasda
            </h1>
          </div>
          <button className="bg-blue-500 text-white rounded-full w-7 h-7 flex items-center justify-center float-right font-semibold m-0">
            <i className="fas fa-plus text-xs"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

const members: User[] = [
  { photoURL: "", email: "" },
  { photoURL: "", email: "" },
  { photoURL: "", email: "" },
  { photoURL: "", email: "" },
  { photoURL: "", email: "" },
  { photoURL: "", email: "" },
];

function BoardDetails() {
  const ref = useRef(null);
  const visibilityRef = useRef(null);
  const invitationRef = useRef(null);

  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf("/") + 1);
  const boards = useSelector((state: StateTypes) => state.boards);
  const board = boards?.find((board) => board._id === id);
  if (!board) return null;
  const { visibility, title, members } = board;

  return (
    <div>
      <Layout>
        <div className="bg-white w-full h-screen px-5">
          <div className="bg-white flex mb-5 pt-5 justify-between">
            <div className="flex space-x-2">
              <div>
                <GrayButton
                  icon={visibility ? "fas fa-lock" : "fas fa-globe-asia"}
                  onClick={() => {}}
                  ref={visibilityRef}
                >
                  <span className="hidden sm:inline">
                    {visibility ? "Private" : "Public"}
                  </span>
                </GrayButton>
                <CustomPopover ref={visibilityRef}>
                  <VisilityMenu id={board._id}></VisilityMenu>
                </CustomPopover>
              </div>
              <div className="flex space-x-2 items-center">
                {members && (
                  <Avatars
                    members={members}
                    limit={MAXIMUM_MEMBERS_DISPLAYED_PER_BOARD}
                  ></Avatars>
                )}
                <div>
                  <button
                    className="w-9 h-9 bg-blue-500 rounded text-white hover:bg-blue-300"
                    ref={invitationRef}
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                  <CustomPopover ref={invitationRef}>
                    <InvitationMenu></InvitationMenu>
                  </CustomPopover>
                </div>
              </div>
            </div>
            <div>
              <GrayButton
                icon="fas fa-bars"
                className="items-end"
                onClick={() => {}}
                ref={ref}
              >
                <span className="hidden sm:inline">Menu</span>
              </GrayButton>
              <CustomMenu
                options={[
                  {
                    title: "loesdfsdjsdjfkjsdfkdsjfsdfjskjfks",
                    onClick: () => alert("hello"),
                  },
                ]}
                ref={ref}
              ></CustomMenu>
            </div>
          </div>
          <div className="bg-blue-50 w-full h-full rounded-t-3xl space-x-5 grid grid-cols-5   px-5 pt-5">
            <TaskList></TaskList>
            <TaskList></TaskList>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default BoardDetails;
