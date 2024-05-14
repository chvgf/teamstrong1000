import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const PostListItemWrapper = styled.div`
  box-sizing: border-box;
  width: 417px;
  height: 120px;
  border: 1px solid #e9e9e9;
  border-radius: 8px;
  text-align: left;
  padding: 9px;
  margin: 18px 0;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    border: 1px solid #4610c0;
  }

  .title {
    display: block;
    font-size: 18px;
    margin-top: 10px;
    font-weight: bold;
    margin-bottom: 8px;
  }
  .selectDate {
    text-align: center;
    border-radius: 20px;
    font-size: 12px;
    color: #9b9b9b;
    display: block;
    margin-bottom: 3px;
    width: 90px;
    background-color: #5c5c5c;
    color: #fff;
    padding: 3px;
  }
  /* .gender {
  font-size: 14px;
  color: #9b9b9b;
} */
  .district {
    font-size: 14px;
    color: #9b9b9b;
  }
  .joinPersonnel {
    font-size: 14px;
    color: #9b9b9b;
  }
  .game {
    font-size: 14px;
    color: #9b9b9b;
  }
  .id {
    font-size: 12px;
    display: flex;
    justify-content: end;
    margin-top: 12px;
  }
`;

function PostListItem(props) {
  const navigate = useNavigate();

  const isLoginUser = () => {
    navigate(`/matchingPost/${props.address}`);
  };
  return (
    <PostListItemWrapper key={props.title} onClick={() => isLoginUser()}>
      <span className="selectDate">
        {props.selectDate} <br />
      </span>
      <span className="title">
        {props.title} <br />
      </span>
      <span className="district">지역: {props.district} |&nbsp;</span>
      <span className="joinPersonnel">
        참여 인원: {props.joinMember?.length}/{props.joinPersonnel} |&nbsp;
      </span>
      <span className="game">
        경기 방식: {props.game} &emsp; <br />
      </span>
      <span className="id">{props.id}</span>
      {/* 성별: {props.gender} &emsp;
      참여 인원: {props.joinPersonnel} &emsp;
      경기 방식: {props.game} &emsp; <br/>
      작성자: {props.id} */}
    </PostListItemWrapper>
  );
}

export default PostListItem;
