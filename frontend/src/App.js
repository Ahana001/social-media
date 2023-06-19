import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { LoginPage } from "./Pages/LoginPage/LoginPage";
import { SignupPage } from "./Pages/SignupPage/SignupPage";
import { PostFeedPage } from "./Pages/PostFeedPage/PostFeedPage";
import { ExplorePage } from "./Pages/ExplorePage/ExplorePage";
import { BookMarkPage } from "./Pages/BookMarkPage/BookMarkPage";
import { LikedPostPage } from "./Pages/LikedPostPage/LikedPostPage";
import { PrivateRoute } from "./Component/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <PostFeedPage />
            </PrivateRoute>
          }
        />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/bookmarks" element={<BookMarkPage />} />
        <Route path="/liked" element={<LikedPostPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
