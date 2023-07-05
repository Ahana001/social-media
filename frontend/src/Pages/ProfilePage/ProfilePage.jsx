import "./ProfilePage.css";

import { SideBarStructure } from "../../Component/SideBarStructure/SideBarStructure";
import { Avtar } from "../../Component/Avtar/Avtar";
import { useSelector } from "react-redux";
import { BsGrid3X3, BsBookmark } from "react-icons/bs";
import { useState } from "react";
import { PostList } from "../../Component/PostList/PostList";

export function ProfilePage() {
  const { authUser } = useSelector((state) => state.authentication);
  const { getAllPostData } = useSelector((state) => state.post);
  const filterUserPost = getAllPostData.filter(
    (post) => post.author_id === authUser.id
  );
  const followersCount = authUser?.followers?.length;
  const followingCount = authUser?.following?.length;
  const [userProfileTab, setUserProfileTab] = useState("Posts");
  const filterBookmarkedPosts = getAllPostData.filter((post) =>
    post.bookmark_by.find((user) => user.id === authUser.id)
  );

  return (
    <>
      <SideBarStructure>
        <div className="UserProfilePageContainer">
          <div className="UserInformationContainer">
            <Avtar url={authUser.image} />
            <div className="UserProfileDetails">
              <div className="UserNameAndEditButton">
                <div>{authUser.username}</div>
                <button>Edit Profile</button>
              </div>
              <div className="PostFollowDetails">
                <div>
                  <span>{filterUserPost.length}</span> Posts
                </div>
                <div>
                  <span>{followersCount} </span>Followers
                </div>
                <div>
                  <span>{followingCount}</span> Followings
                </div>
              </div>
            </div>
          </div>
          <div className="HorizontalLine"></div>
          <div className="UserProfilePostContainer">
            <div className="UserProfilePostWrapper">
              <ul className="UserProfilePostHeader">
                <li
                  onClick={() => {
                    setUserProfileTab(() => "Posts");
                  }}
                  style={{
                    borderTop:
                      userProfileTab === "Posts" ? "0.1rem solid" : "none",
                    color: userProfileTab === "Posts" ? "black" : "grey",
                  }}
                >
                  <BsGrid3X3
                    className="UserProfilePostHeaderIcon"
                    style={{
                      color: userProfileTab === "Posts" ? "black" : "grey",
                    }}
                  />
                  <span>Posts</span>
                </li>
                <li
                  onClick={() => {
                    setUserProfileTab(() => "Bookmarked");
                  }}
                  style={{
                    borderTop:
                      userProfileTab === "Bookmarked" ? "0.1rem solid" : "none",
                    color: userProfileTab === "Bookmarked" ? "black" : "grey",
                  }}
                >
                  <BsBookmark
                    className="UserProfilePostHeaderIcon"
                    style={{
                      color: userProfileTab === "Bookmarked" ? "black" : "grey",
                    }}
                  />
                  <span>Bookmarked</span>
                </li>
              </ul>
              <PostList
                list={
                  userProfileTab === "Posts"
                    ? filterUserPost
                    : filterBookmarkedPosts
                }
              />
            </div>
          </div>
        </div>
      </SideBarStructure>
    </>
  );
}
