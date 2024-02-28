import { createGlobalStyle, styled } from "styled-components";
import { Reset } from "styled-reset";
import "./font.css";

import { Route, Routes } from "react-router-dom";
import BottomMenu from "./pages/BottomMenu";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import SignUp from "./pages/SignUp";
import MainPage from "./pages/MainPage";
import imgBg from "./img/background_01.png";
import imgBgTitle from "./img/background.title.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PostInsert from "./components/PostInsert";
import Community from "./pages/Community";
import MyCalendar from "./pages/MyCalendar";
import PostDetail from "./pages/PostDetail";
import CommunityInsert from "./pages/CommunityInsert";
import Map from "./pages/Map";
import Ranking from "./pages/Ranking";
import Club from "./pages/Club";
import ClubInsert from "./pages/ClubInsert";
import CommunityEdit from "./pages/CommunityEdit";
import EditMatchPost from "./pages/EditMatchPost";
import RequireAuth from "./auth/RequireAuth";
import RandomMatching from "./pages/RandomMatching";

const GlobalStyle = createGlobalStyle`
  body {
    box-sizing: border-box;
    font-size: 16px;
    color: #1C1B1F;
    background-color: #fff;

/* ::-webkit-scrollbar {
    width: 6px;
}
::-webkit-scrollbar-thumb {
    height: 35%;
    background: #1c1b1f;
    border-radius: 30px;
} */
  }

  .box {
    background-color: #fff;
    border: 1px solid #e9e9e9;
    border-radius: 7px;
  }

  * {
    box-sizing: inherit;

    ::-webkit-scrollbar {
    width: 6px;
}
    ::-webkit-scrollbar-thumb {
    height: 35%;
    background: #1c1b1f;
    border-radius: 30px;
}
  }
`;

const MainBg = styled.div`
  background-image: url(${imgBg});
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const MainTitle = styled.div`
  background-image: url(${imgBgTitle});
  width: 442px;
  height: 515px;
  background-repeat: no-repeat;
  margin-right: 50px;
  margin-bottom: 333px;
`;

function App() {
  return (
    <>
      <Reset />
      <GlobalStyle />
      <MainBg>
        <MainTitle />
        <Routes>
          <Route path="/" element={<BottomMenu />}>
            <Route path="/" element={<MainPage />} />
            {/* <Route path="/login" element={<Login />}/> */}
            {/* <Route path="/myPage" element={<MyPage />}/> */}
            <Route path="/login" element={<Login />} />
            <Route
              path="/myPage"
              element={
                <RequireAuth>
                  <MyPage />
                </RequireAuth>
              }
            />
            <Route
              path="/myCalendar"
              element={
                <RequireAuth>
                  <MyCalendar />
                </RequireAuth>
              }
            />
            <Route path="/club" element={<Club />} />
            <Route
              path="/clubInsert"
              element={
                <RequireAuth>
                  <ClubInsert />
                </RequireAuth>
              }
            />
            <Route path="/signUp" element={<SignUp />} />
            <Route
              path="/postInsert"
              element={
                <RequireAuth>
                  <PostInsert />
                </RequireAuth>
              }
            />
            {/* <Route path="/matchingPost/:postId" element={<PostDetail />}/> */}
            <Route
              path="/matchingPost/:postId"
              element={
                <RequireAuth>
                  <PostDetail />
                </RequireAuth>
              }
            />
            <Route path="/editMatchPost/:postId" element={<EditMatchPost />} />
            <Route path="/community" element={<Community />} />
            <Route path="/CommunityInsert" element={<CommunityInsert />} />
            <Route path="/CommunityEdit/:postId" element={<CommunityEdit />} />
            <Route path="/map" element={<Map />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/RandomMatching" element={<RandomMatching />} />
            <Route path="*" element={<div>페이지가 존재하지 않습니다.</div>} />
          </Route>
        </Routes>
      </MainBg>
      <ToastContainer position="bottom-right" autoClose={3000} pauseOnFocusLoss={false} theme="dark" />
    </>
  );
}

export default App;
