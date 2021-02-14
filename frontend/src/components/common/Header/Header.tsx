import React from "react";
import { Menu, MenuItem } from "@material-ui/core";
import Searchbar from "../Searchbar/Searchbar";
import { User } from "../../../types";
import { useSelector } from "react-redux";
const avatar =
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8cGVvcGxlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { email, photoURL } = useSelector((state: User) => state);
  return (
    <div className="bg-white flex justify-between items-center p-5 flex-col sm:flex-row">
      <h1>Logo</h1>
      <div className="flex items-center relative space-x-4  flex-col space-y-2 sm:space-y-0  sm:flex-row">
        <Searchbar></Searchbar>
        <div className="flex items-center space-x-2">
          <img src={photoURL} className="w-9 h-9 rounded"></img>

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
