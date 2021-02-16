import React, { useRef } from "react";
import Avatars from "../../components/Avatars/Avatars";
import GrayButton from "../../components/common/GrayButton/GrayButton";
import Layout from "../../components/common/Layout/Layout";
import CustomMenu from "../../components/CustomMenu/CustomMenu";
import TaskList from "../../components/TaskList/TaskList";
import { MAXIMUM_MEMBERS_DISPLAYED_PER_BOARD, User } from "../../types";

const members: User[] = [
  { photoURL: "", email: "" },
  { photoURL: "", email: "" },
  { photoURL: "", email: "" },
  { photoURL: "", email: "" },
  { photoURL: "", email: "" },
  { photoURL: "", email: "" },
];

function Board() {
  const ref = useRef();
  return (
    <div>
      <Layout>
        <div className="bg-white w-full h-screen px-5">
          <div className="bg-white flex mb-5 pt-5 justify-between">
            <div className="flex space-x-2">
              <GrayButton icon="fas fa-lock" onClick={() => {}}>
                <span className="hidden sm:inline">Private</span>
              </GrayButton>
              <div className="flex space-x-2 items-center">
                <Avatars
                  members={members}
                  limit={MAXIMUM_MEMBERS_DISPLAYED_PER_BOARD}
                ></Avatars>
                <button className="w-9 h-9 bg-blue-500 rounded text-white hover:bg-blue-300">
                  <i className="fas fa-plus"></i>
                </button>
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

export default Board;
