import "./SideBarStructure.css";

import { MenuBar } from "./Components/MenuBar/MenuBar";
import { SuggestionList } from "../SuggestionList/SuggestionList";
import { CreatePostModal } from "../CreatePostModal/CreatePostModal";
import { useDispatch, useSelector } from "react-redux";
import { setEditBoxVisibility } from "../../Store/displaySlice";
import { getAllPost, setPostData } from "../../Store/postSlice";
import { TransparentLoader } from "../TransparentLoader/TransparentLoader";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function SideBarStructure({ children }) {
  const dispatch = useDispatch();
  const { authToken } = useSelector((state) => state.authentication);
  const { postStatus } = useSelector((state) => state.post);
  const location = useLocation();

  useEffect(() => {
    if (authToken) {
      dispatch(getAllPost({ token: authToken }));
    }
  }, [authToken, dispatch]);

  return (
    <div
      className="PageStructureContainer"
      onClick={() => {
        dispatch(
          setEditBoxVisibility({
            visibility: false,
            postId: null,
          })
        );
        dispatch(
          setPostData({
            id: null,
            content: "",
            displayPicture: null,
            picture: null,
          })
        );
      }}
    >
      <div className="LeftMenubarContainer">
        <MenuBar />
      </div>
      <div
        className="PostListAndSuggetionListContainer"
        style={{
          gridTemplateColumns:
            location.pathname === "/profile" ? "1fr" : "60rem 1fr",
        }}
      >
        {children}
        <SuggestionList></SuggestionList>
      </div>
      <CreatePostModal />
      {postStatus === "pending" ? <TransparentLoader /> : null}
    </div>
  );
}
