import React, { useState } from "react";
import styled from "styled-components";
import CommunityListItem from "./CommunityListItem";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { getAllUserCommunityList, userCommunityList } from "../features/communityListSlice/communityListSlice";
import { useNavigate } from "react-router-dom";
import { getLoginUser, getLoginUserInfo } from "../features/useinfo/userInfoSlice";

const CommunityListWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  margin-bottom: 70px;
`;
const CommunityInsertBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 888px;
  right: 0;
  bottom: 77px;
  margin: 0 auto;
  background-color: #eee;
  box-shadow: 1px 1px 1px 1px gray;
  width: 53px;
  height: 53px;
  font-size: 32px;
  border-radius: 30px;
  border: none;
  opacity: 0.7;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    background-color: #4610c0;
    color: #fff;
    box-shadow: 1px 1px 1px 1px #000;
  }
`;

function CommunityList(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userNic2 = useSelector(getLoginUser);
  const communityInsert = useSelector(userCommunityList);

  const isLoggedInInsert = () => {
    if (userNic2) {
      navigate("/CommunityInsert");
    } else {
      alert("로그인 해야함!");
    }
  };

  useEffect(() => {
    const getCommunityList = async () => {
      try {
        const result = await axios.get(`${process.env.REACT_APP_ADDRESS}/community`, { withCredentials: true });
        dispatch(getAllUserCommunityList(result.data.communityData));
      } catch (err) {
        console.error(err);
      }
    };
    getCommunityList();
  }, []);

  const date = new Date(2023, 7, 5); // 게시글 입력 날짜 계산
  function elapsedTime(date) {
    const start = new Date(date);
    const end = new Date();
    const diff = (end - start) / 1000;
    const times = [
      { name: "년", milliSeconds: 60 * 60 * 24 * 365 },
      { name: "개월", milliSeconds: 60 * 60 * 24 * 30 },
      { name: "일", milliSeconds: 60 * 60 * 24 },
      { name: "시간", milliSeconds: 60 * 60 },
      { name: "분", milliSeconds: 60 },
    ];
    for (const value of times) {
      const betweenTime = Math.floor(diff / value.milliSeconds);

      if (betweenTime > 0) {
        return `${betweenTime}${value.name} 전`;
      }
    }
    return "방금 전";
  }

  return (
    <CommunityListWrapper>
      {communityInsert.map((CommunityInsertMap) => {
        return (
          <CommunityListItem
            key={CommunityInsertMap._id} // 댓글 비교 id
            postId={CommunityInsertMap._id} // 댓글용 postId값
            userNic={CommunityInsertMap.id} // 닉네임
            // id={CommunityInsertMap.id}
            // title={CommunityInsertMap.title}
            content={CommunityInsertMap.content} // 글내용
            imagePath={CommunityInsertMap.imagePath} // 첨부파일
            like={CommunityInsertMap.like} // 좋아요
            date={CommunityInsertMap.date}
          />
        );
      })}
      <CommunityInsertBtn
        onClick={() => {
          isLoggedInInsert();
        }}
      >
        +
      </CommunityInsertBtn>
    </CommunityListWrapper>
  );
}

export default CommunityList;
