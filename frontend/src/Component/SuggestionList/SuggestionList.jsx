import "./SuggestionList.css";

import { useLocation } from "react-router-dom";

export function SuggestionList() {
  const location = useLocation();

  if (location.pathname === "/profile") {
    return null;
  }

  return (
    <div className="SuggestionListContainer">
      <div className="SuggestionListHeader">Suggested for you</div>
      <ul></ul>
    </div>
  );
}
