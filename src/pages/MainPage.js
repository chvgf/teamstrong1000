import React, { useEffect } from "react";
import Header from "./Header";
import NavList from "./NavList";
import PostList from "./PostList";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getAllCalendarInfo, getAllTeamInfo, getAllUserInfo, getLoginUser, getLoginUserInfo } from "../features/useinfo/userInfoSlice";
import { getAllUserPostList } from "../features/postListSlice/postListInsertSlice";

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
  // const doSometing = async () => {
  //   const result = await axios.get(`${process.env.REACT_APP_ADDRESS}`, {withCredentials: true})
  //   dispatch(getAllUserInfo(result.data.data))
  // };
  // useEffect(() => {
  //   doSometing();
  // }, [])
  // useEffect(() => {
  //   axios.get(`http://localhost:3000/team`)
  //     .then(response => dispatch(getAllTeamInfo(response.data)))
  //     .catch(error => console.error(error))
  // }, [])
  // useEffect(() => {
  //   axios.get(`http://localhost:3000/myCalendar`)
  //   .then(response => {
  //     dispatch(getAllCalendarInfo(response.data))
  //   })
  //   .catch(error => console.error(error))
  // }, []);

  return (
    <MainWrapper>
      <Header />
      <NavList />
      <PostList />
    </MainWrapper>
  );
}

export default MainPage;
