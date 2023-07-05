import "./PostList.css";

import { useDispatch, useSelector } from "react-redux";

import { PostCard } from "../PostCard/PostCard";
import { Loader } from "../Loader/Loader";
import { changeSorting } from "../../Store/postSlice";
import { useLocation } from "react-router-dom";

export function PostList({ list }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { getAllPostStatus, postSorting } = useSelector((state) => state.post);

  return (
    <div
      className="PostFilterListContainer"
      style={{ marginTop: location.pathname === "/" ? "4.5rem" : "0.5rem" }}
    >
      <div
        className="PostFilters"
        style={{ display: location.pathname === "/" ? "flex" : "none" }}
      >
        <div
          className="TrendingPost"
          onClick={() => dispatch(changeSorting("trending"))}
        >
          <div>Trending</div>
          <div
            className="CurrentFilterLine"
            style={{
              backgroundColor: postSorting === "trending" ? " #fa383e" : "",
            }}
          ></div>
        </div>
        <div
          className="LatestPost"
          onClick={() => dispatch(changeSorting("latest"))}
        >
          <div>Latest</div>
          <div
            className="CurrentFilterLine"
            style={{
              backgroundColor: postSorting === "latest" ? " #fa383e" : "",
            }}
          ></div>
        </div>
      </div>

      <div
        className="PostListContainer"
        style={{
          borderRight: location.pathname === "/profile" ? "none" : "",
        }}
      >
        {getAllPostStatus === "pending" ? (
          <Loader />
        ) : list.length === 0 ? (
          <div className="NoPost">
            <img src="../asserts/camera.png" alt="No Post" />
            <p>No Posts Yet</p>
          </div>
        ) : (
          <ul>
            {list.map((post) => {
              return <PostCard key={post.id} post={post} />;
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
