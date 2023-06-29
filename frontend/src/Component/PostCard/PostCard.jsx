import "./PostCard.css";

import { FiEdit } from "react-icons/fi";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BiBookmark } from "react-icons/bi";
import { LuShare } from "react-icons/lu";
import { BsDot } from "react-icons/bs";
import { SlOptions } from "react-icons/sl";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsBookmarksFill } from "react-icons/bs";
import { AvtarWithBorder } from "../AvtarWithBorder/AvtarWithBorder";
import { setEditBoxVisibility, setToggleModel } from "../../Store/displaySlice";
import { useDispatch, useSelector } from "react-redux";
import {
  bookmarkPost,
  deletePost,
  dislikePost,
  likePost,
  setPostData,
  unBookmarkPost,
} from "../../Store/postSlice";

export function PostCard({ post }) {
  const dispatch = useDispatch();
  const { editBoxVisibility } = useSelector((state) => state.display);
  const { authToken, authUser } = useSelector((state) => state.authentication);
  const currentDate = new Date();

  function getHumanizeTimeForOlderPost(date) {
    const pastDate = new Date(date);
    const timeDifference = currentDate - pastDate;
    if (timeDifference < 86400000) {
      // 86400000 milliseconds = 1 day
      const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutesDifference = Math.floor((timeDifference / (1000 * 60)) % 60);

      if (hoursDifference === 0) {
        return `${minutesDifference}m`;
      } else {
        return `${hoursDifference}h`;
      }
    } else {
      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      if (daysDifference > 30) {
        const options = { day: "numeric", month: "long" };
        const formattedDate = date.toLocaleDateString("en-US", options);
        return formattedDate;
      } else {
        return `${daysDifference}d`;
      }
    }
  }
  const isPostLikedByUser = post.liked_by.find(
    (user) => user.id === authUser.id
  );
  const isPostBookMarkedByUser = post.bookmark_by.find(
    (user) => user.id === authUser.id
  );
  return (
    <div className="PostCardContainer">
      <AvtarWithBorder url={authUser.image} />

      <div className="PostBody">
        <div className="PostHeader">
          <div className="PostHeaderLeft">
            <div className="PostUserName">{post.user.username}</div>
            <div className="PostTime">
              <BsDot />
              {getHumanizeTimeForOlderPost(post.createdAt)}
            </div>
          </div>
          <div
            className="PostHeaderRight"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(
                setEditBoxVisibility({
                  visibility: true,
                  postId: post.id,
                })
              );
            }}
          >
            {authUser.id === post.author_id ? <SlOptions /> : null}
          </div>
          <div
            className="EditPostContainer"
            style={{
              display:
                editBoxVisibility.visibility &&
                post.id === editBoxVisibility.postId
                  ? "block"
                  : "none",
            }}
          >
            <ul>
              <li
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(deletePost({ postId: post.id, token: authToken }));
                }}
              >
                <RiDeleteBinLine className="DeleteButton" />
                <span>Delete</span>
              </li>
              <li
                onClick={async (e) => {
                  e.stopPropagation();
                  dispatch(
                    setPostData({
                      id: post.id,
                      content: post.content,
                      displayPicture: post.picture_url,
                      picture: null,
                    })
                  );
                  dispatch(setToggleModel(true));
                  dispatch(
                    setEditBoxVisibility({
                      visibility: false,
                      postId: null,
                    })
                  );
                }}
              >
                <FiEdit className="EditButton" />
                <span>Edit</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="PostContent">
          <div className="PostContentText">{post.content}</div>

          <div
            className="PostImage"
            style={{ display: post.picture_url ? "inline-block" : "none" }}
          >
            <img src={post.picture_url} alt="post" />
          </div>
        </div>

        <div className="PostActionButtons">
          <div
            className="LikeButtonContainer"
            onClick={() => {
              if (isPostLikedByUser) {
                dispatch(
                  dislikePost({
                    postId: post.id,
                    token: authToken,
                  })
                );
              } else {
                dispatch(
                  likePost({
                    postId: post.id,
                    token: authToken,
                  })
                );
              }
            }}
          >
            <div className="LikeActionButton">
              {isPostLikedByUser ? (
                <FaHeart className="FillHeart" />
              ) : (
                <FaRegHeart />
              )}
            </div>
            <span>{post.like_count}</span>
          </div>
          <div
            className="BookMarkButtonContainer"
            onClick={() => {
              if (isPostBookMarkedByUser) {
                dispatch(
                  unBookmarkPost({
                    postId: post.id,
                    token: authToken,
                  })
                );
              } else {
                dispatch(
                  bookmarkPost({
                    postId: post.id,
                    token: authToken,
                  })
                );
              }
            }}
          >
            <div className="BookMarkActionButton">
              {isPostBookMarkedByUser ? (
                <BsBookmarksFill className="FillBookMark" />
              ) : (
                <BiBookmark />
              )}
            </div>
            <span>{}</span>
          </div>
          <div className="ShareButtonContainer">
            <div className="ShareActionButton">
              <LuShare />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
