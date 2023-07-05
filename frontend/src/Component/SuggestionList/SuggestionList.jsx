import { useSelector } from "react-redux";
import "./SuggestionList.css";

import { useLocation } from "react-router-dom";
import { Loader } from "../Loader/Loader";
import { SuggestionCard } from "../SuggestionCard/SuggestionCard";

export function SuggestionList() {
  const location = useLocation();
  const { getSuggestionListData, getSuggestionListStatus } = useSelector(
    (state) => state.authentication
  );

  if (location.pathname === "/profile") {
    return null;
  }
  const getOnlyFirstSevenSuggestions = getSuggestionListData.slice(0, 7);
  return (
    <div className="SuggestionListContainer">
      {getSuggestionListStatus === "pending" ? (
        <Loader />
      ) : (
        <>
          <div className="SuggestionListContainer">
            <div className="SuggestionListHeader">Suggested for you</div>
            <ul>
              {getOnlyFirstSevenSuggestions.map((user) => {
                return (
                  <>
                    <li key={user.id}>
                      <SuggestionCard user={user} />
                    </li>
                  </>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
