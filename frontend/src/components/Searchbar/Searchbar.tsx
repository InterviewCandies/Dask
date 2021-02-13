import React from "react";

function Searchbar() {
  return (
    <div className="bg-white shadow-md rounded-lg p-2">
      <input
        placeholder="Keyword..."
        className="border-transparent outline-none"
      ></input>
      <button className="bg-blue-500 px-2 py-1 rounded-lg text-white font-semibold focus:outline-none ">
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
}

export default Searchbar;
