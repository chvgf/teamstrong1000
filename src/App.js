import { createGlobalStyle, styled } from "styled-components";
import { Reset } from "styled-reset";

import { Route, Routes } from "react-router-dom";
import BottomMenu from "./pages/BottomMenu";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MainPage from "./pages/MainPage";
import imgBg from "./img/background_01.png";
import imgBgTitle from "./img/background.title.png";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PostInsert from "./components/PostInsert";
import Community from "./pages/Community";
import MyCalendar from "./pages/MyCalendar";
import PostDetail from "./pages/PostDetail";



const GlobalStyle = createGlobalStyle`
  body {
    box-sizing: border-box;
    font-size: 16px;
    color: #1C1B1F;
    background-color: #fff;

::-webkit-scrollbar {
    width: 6px;
}
::-webkit-scrollbar-thumb {
    height: 35%;
    background: #1c1b1f;
    border-radius: 30px;
}
  }

  .box {
    background-color: #fff;
    border: 1px solid #e9e9e9;
    border-radius: 7px;
  }

  * {
    box-sizing: inherit;
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
            <Route path="/" element={<MainPage />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/myCalendar" element={<MyCalendar />}/>
            <Route path="/signUp" element={<SignUp />}/>
            <Route path="/postInsert" element={<PostInsert />}/>
            <Route path="/community" element={<Community />} />
            <Route path="/postInsert" element={<PostInsert />}/>
            <Route path="/postDetail" element={<PostDetail />}/>
            <Route path="*" element={<div>페이지가 존재하지 않습니다.</div>} />
          </Route>
        </Routes>
      </MainBg>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        pauseOnFocusLoss={false}
        theme="dark"
        />
    </>
  );
}

export default App;
