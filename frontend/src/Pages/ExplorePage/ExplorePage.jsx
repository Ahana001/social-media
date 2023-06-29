import "./ExplorePage.css";

import { SideBarStructure } from "../../Component/SideBarStructure/SideBarStructure";
import { useSelector } from "react-redux";
import { PostList } from "../../Component/PostList/PostList";

export function ExplorePage() {
  const { getAllPostData } = useSelector((state) => state.post);

  return (
    <SideBarStructure>
      <PostList list={getAllPostData} />
    </SideBarStructure>
  );
}
