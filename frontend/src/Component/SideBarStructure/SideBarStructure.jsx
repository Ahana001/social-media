import { MenuBar } from "./Components/MenuBar/MenuBar";

export function SideBarStructure({ children }) {
  return (
    <div className="PostFeedPageContainer">
      <div className="LeftMenubarContainer">
        <MenuBar />
      </div>
      <div className="PostListContainer">{children}</div>
    </div>
  );
}
