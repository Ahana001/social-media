import "./BookMarkPage.css";

import { SideBarStructure } from "../../Component/SideBarStructure/SideBarStructure";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { PostList } from "../../Component/PostList/PostList";

export function BookMarkPage() {
  const { getAllPostData } = useSelector((state) => state.post);
  const { authUser } = useSelector((state) => state.authentication);
  const [bookmarkedPost, setBookmarkedPost] = useState([]);

  useEffect(() => {
    const filterUserBookmarkedPost = getAllPostData.filter((post) =>
      post.bookmark_by.find((user) => user.id === authUser.id) ? true : false
    );
    setBookmarkedPost(() => filterUserBookmarkedPost);
  }, [authUser, getAllPostData]);
  return (
    <SideBarStructure>
      <PostList list={bookmarkedPost} />
    </SideBarStructure>
  );
}
