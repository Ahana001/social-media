import "./LikedPostPage.css";

import { SideBarStructure } from "../../Component/SideBarStructure/SideBarStructure";
import { PostList } from "../../Component/PostList/PostList";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function LikedPostPage() {
  const { getAllPostData } = useSelector((state) => state.post);
  const { authUser } = useSelector((state) => state.authentication);
  const [likedPost, setLikedPost] = useState([]);

  useEffect(() => {
    const filterUserLikdedPost = getAllPostData.filter((post) =>
      post.liked_by.find((user) => user.id === authUser.id) ? true : false
    );
    setLikedPost(() => filterUserLikdedPost);
  }, [authUser, getAllPostData]);

  return (
    <SideBarStructure>
      <PostList list={likedPost} />
    </SideBarStructure>
  );
}
