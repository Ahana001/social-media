import "./MenuBar.css";

import {
  AiFillHome,
  AiOutlineHome,
  AiFillCompass,
  AiOutlineCompass,
  AiFillHeart,
  AiOutlineHeart,
} from "react-icons/ai";
import {
  BsBookmarksFill,
  BsBookmark,
  // BsPlusSquareFill,
  BsPlusSquare,
} from "react-icons/bs";
import { NavLink, useLocation } from "react-router-dom";

export function MenuBar() {
  const location = useLocation();

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
      <li className="MenuBarListItem">
        <span className="MenuBarIcon">
          <BsPlusSquare />
        </span>
        <span className="MenuBarText">create</span>
      </li>
    </ul>
  );
}
