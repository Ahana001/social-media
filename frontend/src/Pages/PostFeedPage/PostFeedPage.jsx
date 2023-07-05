import "./PostFeedPage.css";

import { SideBarStructure } from "../../Component/SideBarStructure/SideBarStructure";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PostList } from "../../Component/PostList/PostList";

export function PostFeedPage() {
  const { authUser } = useSelector((state) => state.authentication);
  const { getAllPostData, postSorting } = useSelector((state) => state.post);
  const [homePost, setHomePost] = useState([]);

  useEffect(() => {
    const filterUserPost = getAllPostData.filter(
      (post) => post.author_id === authUser.id
    );

    switch (postSorting) {
      case "trending":
        setHomePost(
          filterUserPost
            .filter((post) => post.like_count > 0)
            .sort((a, b) => b.like_count - a.like_count)
        );
        break;
      case "latest":
        setHomePost(
          filterUserPost.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
        break;
      default:
        setHomePost(filterUserPost);
    }
  }, [authUser, getAllPostData, postSorting]);

  return (
    <>
      <SideBarStructure>
        <PostList list={homePost} />
      </SideBarStructure>
    </>
  );
}
