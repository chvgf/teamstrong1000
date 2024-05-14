import React, { useEffect } from "react";
import Header from "./Header";
import NavList from "./NavList";
import PostList from "./PostList";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import axios from "axios";
import { getAllUserInfo } from "../features/useinfo/userInfoSlice";

const MainWrapper = styled.div`
  background-color: #fff;
  width: 530px;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
`;

function MainPage(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_ADDRESS}`, { withCredentials: true })
      .then((reponse) => {
        dispatch(getAllUserInfo(reponse.data));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <MainWrapper>
      <Header />
      <NavList />
      <PostList />
    </MainWrapper>
  );
}

export default MainPage;
