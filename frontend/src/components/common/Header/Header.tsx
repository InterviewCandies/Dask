import React from "react";
import { Menu, MenuItem } from "@material-ui/core";
import Searchbar from "../Searchbar/Searchbar";
import { DEFAULT_AVATAR, StateTypes, User } from "../../../types";
import { useSelector } from "react-redux";

function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { email, photoURL } = useSelector(
    (state: StateTypes) => state.authentication
  );
  return (
    <div className="bg-white flex justify-between items-center p-5 flex-col sm:flex-row border-b-2	 border-gray-200">
      <h1>Logo</h1>
      <div className="flex items-center relative space-x-4  flex-col space-y-2 sm:space-y-0  sm:flex-row">
        <Searchbar></Searchbar>
        <div className="flex items-center space-x-2">
          <img
            src={photoURL || DEFAULT_AVATAR}
            className="w-9 h-9 rounded"
          ></img>

          <p>{email}</p>
          <button
            className="focus:outline-none"
            onClick={(e) => setAnchorEl(e.currentTarget as any)}
          >
            <i className="fas fa-caret-down"></i>
          </button>
        </div>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem>Profile</MenuItem>
          <MenuItem>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default Header;
