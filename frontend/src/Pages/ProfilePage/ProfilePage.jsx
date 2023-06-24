import "./ProfilePage.css";

import { SideBarStructure } from "../../Component/SideBarStructure/SideBarStructure";
import { Avtar } from "../../Component/Avtar/Avtar";
import { useSelector } from "react-redux";
import { BsGrid3X3, BsBookmark } from "react-icons/bs";

export function ProfilePage() {
  const { authUser } = useSelector((state) => state.authentication);
  const { getAllPostData } = useSelector((state) => state.post);
  const filterUserPost = getAllPostData.filter(
    (post) => post.author_id === authUser.id
  );
  const followersCount = authUser.followers.length;
  const followingCount = authUser.following.length;

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
            <ul className="UserProfilePostHeader">
              <li className="UserPRofilePostHeaderItem">
                <BsGrid3X3 className="UserPRofilePostHeaderIcon" />
                <span>Post</span>
              </li>
              <li className="UserPRofilePostHeaderItem">
                <BsBookmark className="UserPRofilePostHeaderIcon" />
                <span>Bookmarks</span>
              </li>
            </ul>
          </div>
        </div>
      </SideBarStructure>
    </>
  );
}
