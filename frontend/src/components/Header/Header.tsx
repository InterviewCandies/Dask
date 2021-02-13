import React from "react";
import Searchbar from "../Searchbar/Searchbar";
const avatar =
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8cGVvcGxlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
function Header() {
  return (
    <div className="bg-white flex justify-between items-center p-5">
      <h1>Logo</h1>
      <div className="flex items-center relative space-x-4">
        <Searchbar></Searchbar>
        <img src={avatar} className="w-9 h-9 rounded"></img>
        <button className="focus:outline-none">
          <i className="fas fa-caret-down"></i>
        </button>
      </div>
    </div>
  );
}

export default Header;
