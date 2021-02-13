import React from "react";
import Card from "../../components/Card/Card";

function AllBoards() {
  return (
    <div className="container mx-auto px-40">
      <div className="flex justify-between items-center pt-10 pb-5">
        <h1 className="font-semibold tracking-wider text-lg">All Boards</h1>
        <button className="p-2 bg-blue-500 rounded-lg text-white focus:outline-none  font-semibold hover:bg-blue-300">
          <i className="fas fa-plus"></i> Add
        </button>
      </div>
      <div className="grid grid-cols-4 gap-10">
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </div>
    </div>
  );
}

export default AllBoards;
