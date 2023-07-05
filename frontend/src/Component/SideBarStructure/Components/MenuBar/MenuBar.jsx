import "./MenuBar.css";

import {
  AiFillHome,
  AiOutlineHome,
  AiFillCompass,
  AiOutlineCompass,
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineLogout,
} from "react-icons/ai";
import {
  BsBookmarksFill,
  BsBookmark,
  // BsPlusSquareFill,
  BsPlusSquare,
} from "react-icons/bs";
import { SlOptions } from "react-icons/sl";
import { RiUser3Line, RiUser3Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { setToggleModel } from "../../../../Store/displaySlice";
import { AvtarWithBorder } from "../../../AvtarWithBorder/AvtarWithBorder";
import { setLogoutToggle } from "../../../../Store/displaySlice";
import { logoutHandler } from "../../../../Store/authenticationSlice";

export function MenuBar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.authentication);
  const { logoutToggle } = useSelector((state) => state.display);

  const menubarList = [
    {
      path: "/",
      label: "home",
      selectedIcon: <AiFillHome />,
      icon: <AiOutlineHome />,
    },
    {
      path: "/explore",
      label: "explore",
      selectedIcon: <AiFillCompass />,
      icon: <AiOutlineCompass />,
    },
    {
      path: "/bookmarks",
      label: "bookmark",
      selectedIcon: <BsBookmarksFill />,
      icon: <BsBookmark />,
    },
    {
      path: "/liked",
      label: "liked Post",
      selectedIcon: <AiFillHeart />,
      icon: <AiOutlineHeart />,
    },
    {
      path: "/profile",
      label: "Profile",
      selectedIcon: <RiUser3Fill />,
      icon: <RiUser3Line />,
    },
    // {
    //   path: "/",
    //   label: "create",
    //   selectedIcon: <BsPlusSquareFill />,
    //   icon: <BsPlusSquare />,
    // },
  ];
  function getActiveStyle({ isActive }) {
    return {
      fontWeight: isActive ? "500" : "",
    };
  }

  return (
    <div className="LeftMenubarWrapper">
      <ul className="MenuBarList">
        {menubarList.map(({ label, selectedIcon, icon, path }) => {
          return (
            <li key={label}>
              <NavLink
                className="MenuBarListItem"
                to={path}
                style={getActiveStyle}
              >
                <span className="MenuBarIcon">
                  {location.pathname === path ? selectedIcon : icon}
                </span>
                <span className="MenuBarText">{label}</span>
              </NavLink>
            </li>
          );
        })}
        <li
          className="MenuBarListItem"
          onClick={() => {
            dispatch(setToggleModel(true));
          }}
        >
          <span className="MenuBarIcon">
            <BsPlusSquare />
          </span>
          <span className="MenuBarText">create</span>
        </li>
      </ul>
      <div
        className="UserProfileContainer"
        onClick={(e) => {
          e.stopPropagation();
          dispatch(setLogoutToggle(!logoutToggle));
        }}
      >
        <div className="UserInfo">
          <div>
            <AvtarWithBorder url={authUser.image} size={4} />
            <div className="UserNameStack">
              <span>{authUser.username}</span>
              <span>@{authUser.username}</span>
            </div>
          </div>
          <SlOptions className="UserInfoOptionBarIcon" />
          <div
            className="LogOutContainer"
            style={{ display: logoutToggle ? "flex" : "none" }}
          >
            <ul>
              <li
                onClick={async (e) => {
                  e.stopPropagation();
                  dispatch(logoutHandler());
                }}
              >
                <AiOutlineLogout className="LogOutIcon" /> <span>Log Out</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
