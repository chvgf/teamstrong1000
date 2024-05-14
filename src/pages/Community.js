import React from "react";
import styled from "styled-components";
import CommunityList from "../components/CommunityList";

const CommunityWrapper = styled.div`
  background-color: #fff;
  width: 530px;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;

  h1 {
    font-size: 35px;
    font-weight: bold;
    margin: 0 0 30px 55px;
  }

  .매칭찾기 {
    margin: 44px 0 14px 37px;
    color: #1c1b1f;
    font-size: 24px;
    font-weight: 800;
  }

  hr {
    margin: 0 37px;
    border: 1px solid #4610c0;
    margin-bottom: 37px;
  }
`;

function Community(props) {
  return (
    <CommunityWrapper>
      <div className="매칭찾기">커뮤니티</div>
      <hr />
      <CommunityList />
    </CommunityWrapper>
  );
}

export default Community;
