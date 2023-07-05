import "./SuggestionCard.css";

import { Avtar } from "../Avtar/Avtar";
import { useDispatch, useSelector } from "react-redux";
import { SmallLoader } from "../SmallLoader/SmallLoader";
import { followUser } from "../../Store/authenticationSlice";

export function SuggestionCard({ user }) {
  const dispatch = useDispatch();
  const { authToken } = useSelector((state) => state.authentication);

  return (
    <div className="SuggestionCardContainer">
      <div className="AvtarAndUserInfo">
        <Avtar url={user.image} size={4} />
        <div className="SuggestionCardUserInfo">
          <span className="UserName">{user.username}</span>
          <span className="SmallUserName">@{user.username}</span>
        </div>
      </div>

      {user.followUserStatus === "pending" ? (
        <SmallLoader />
      ) : user.followUserStatus === "fulfilled" ? (
        <div className="FollowedUser">Following</div>
      ) : (
        <button
          onClick={() => {
            dispatch(followUser({ userId: user.id, token: authToken }));
          }}
        >
          Follow
        </button>
      )}
    </div>
  );
}
