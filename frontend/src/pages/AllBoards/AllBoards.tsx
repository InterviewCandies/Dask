import React, { useState } from "react";
import Card from "../../components/Card/Card";
import { Dialog } from "@material-ui/core";
import NewBoard from "../../container/NewBoard/NewBoard";
import Layout from "../../components/common/Layout/Layout";

const AllBoards: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <Layout>
      <div className="container mx-auto  lg:px-30 xl:px-40 md:px-10 px-5">
        <div className="flex justify-between items-center pt-10 pb-5">
          <h1 className="font-semibold tracking-wider text-lg">All Boards</h1>
          <button
            className="p-2 bg-blue-500 rounded-lg text-white focus:outline-none  font-semibold hover:bg-blue-300"
            onClick={() => setOpen(true)}
          >
            <i className="fas fa-plus"></i> Add
          </button>
        </div>
        <div className="grid  sm:grid-cols-2   lg:grid-cols-4 md:grid-cols-3 gap-10">
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
        </div>
        <Dialog open={open} onClose={() => setOpen(false)} className="relative">
          <NewBoard handleClose={() => setOpen(false)}></NewBoard>
        </Dialog>
      </div>
    </Layout>
  );
};

export default AllBoards;
