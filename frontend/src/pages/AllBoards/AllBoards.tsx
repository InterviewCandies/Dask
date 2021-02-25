import { Dialog } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchBoardsByEmail } from "../../api/board";
import Card from "../../components/Card/Card";
import Layout from "../../components/common/Layout/Layout";
import NewBoard from "../../container/NewBoard/NewBoard";
import { useDialog } from "../../provider/DialogProvider";
import { CURRENT_USER, StateTypes } from "../../types";

const AllBoards: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { email } = useSelector((state: StateTypes) => state.user);
  const boards = useSelector((state: StateTypes) => state.boards);
  const history = useHistory();
  const [openDialog] = useDialog();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const result = await dispatch(fetchBoardsByEmail(email));
      } catch (error) {
        console.log(error);
      }
    };
    fetchBoards();
  }, []);
  return (
    <Layout>
      <div className="container mx-auto  lg:px-30 xl:px-40 md:px-10 px-5">
        <div className="flex justify-between items-center pt-10 pb-5">
          <h1 className="font-semibold tracking-wider text-lg">All Boards</h1>
          <button
            className="px-4 py-2  p-2 bg-blue-500 rounded-lg text-white focus:outline-none  font-semibold hover:bg-blue-300"
            onClick={() =>
              openDialog({
                children: <NewBoard></NewBoard>,
              })
            }
          >
            <i className="fas fa-plus"></i> Add
          </button>
        </div>
        <div className="grid  sm:grid-cols-2   lg:grid-cols-4 md:grid-cols-3 gap-10">
          {boards.map((board) => (
            <Card
              key={board._id}
              board={board}
              onClick={() => {
                history.push("/board/" + board._id);
              }}
            ></Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AllBoards;
