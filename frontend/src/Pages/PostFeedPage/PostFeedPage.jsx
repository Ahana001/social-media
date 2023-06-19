import "./PostFeedPage.css";

import { SideBarStructure } from "../../Component/SideBarStructure/SideBarStructure";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserPost } from "../../Store/postSlice";

export function PostFeedPage() {
  const dispatch = useDispatch();
  const { authToken } = useSelector((state) => state.authentication);
  const { getAllUserPostData, getAllUserPostStatus } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    if (authToken) {
      dispatch(getAllUserPost(authToken));
    }
  }, []);

  console.log(getAllUserPostData);
  console.log(getAllUserPostStatus);
  return <SideBarStructure></SideBarStructure>;
}
