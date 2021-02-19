import React, { useRef } from "react";
import { Menu, MenuItem } from "@material-ui/core";
import Searchbar from "../Searchbar/Searchbar";
import { AUTH_TOKEN, DEFAULT_AVATAR, StateTypes, User } from "../../../types";
import { useSelector } from "react-redux";
import CustomMenu from "../../CustomMenu/CustomMenu";
import { useHistory } from "react-router-dom";
import logo from "../../../assets/img/logo.png";

function Header() {
  const dropdownRef = useRef();
  const history = useHistory();
  const { email, photoURL } = useSelector((state: StateTypes) => state.user);

  return (
    <div className="bg-white flex justify-between items-center p-5 flex-col sm:flex-row border-b-2	 border-gray-200">
      <img src={logo} className="h-10 object-contain"></img>
      <div className="flex items-center relative space-x-4  flex-col space-y-2 sm:space-y-0  sm:flex-row">
        <Searchbar></Searchbar>
        <div className="flex items-center space-x-2">
          <img
            src={photoURL || DEFAULT_AVATAR}
            className="w-9 h-9 rounded"
          ></img>

          <p>{email}</p>
          <div>
            <button className="focus:outline-none" ref={dropdownRef as any}>
              <i className="fas fa-caret-down"></i>
            </button>
            <CustomMenu
              options={[
                {
                  title: (
                    <h1>
                      <i className="fas fa-user mr-2"></i> Profile
                    </h1>
                  ),
                  onClick: () => {},
                },
                {
                  title: (
                    <h1>
                      <i className="fas fa-sign-out-alt mr-2"></i> Sign out
                    </h1>
                  ),
                  onClick: () => {
                    localStorage.removeItem(AUTH_TOKEN);
                    history.push("/");
                  },
                },
              ]}
              ref={dropdownRef}
            ></CustomMenu>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
