import React from "react";
import styled from "styled-components";
import img1 from "../img/groups(1).png";
import img2 from "../img/map.png";
import img3 from "../img/rewarded_ads.png";
import img4 from "../img/forum.png";
import { useNavigate } from "react-router-dom";

const NavListWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  :nth-child(1) {
    width: 88px;
    height: 88px;
    :nth-child(1) {
      width: 50px;
      height: 30px;
      margin-bottom: 4px;
    }
  }

  .NavImg1 {
    border: 2px solid #4610c0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
`;

const NavListItemWrapper = styled.div`
  width: 86px;
  height: 88px;
  border: 1px solid #e9e9e9;
  border-radius: 7px;
  margin: 0 12px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  transition: 0.1s;

  &:hover {
    border: 2px solid #4610c0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }

  .NavImg {
    width: 40px;
    height: 33px;
    margin-bottom: 4px;
  }
`;

function NavList(props) {
  const navigate = useNavigate();

  return (
    <NavListWrapper>
      <NavListItemWrapper className="NavImg1">{<img src={img1} alt="" />} 매칭 찾기</NavListItemWrapper>

      <NavListItemWrapper
        onClick={() => {
          navigate("/map");
        }}
      >
        {<img className="NavImg" src={img2} alt="icon" />} 민턴장 찾기
      </NavListItemWrapper>

      <NavListItemWrapper onClick={() => navigate("/ranking")}>
        {<img className="NavImg" src={img3} alt="icon" />} 명예의 전당
      </NavListItemWrapper>

      <NavListItemWrapper onClick={() => navigate("/community")}>
        {<img className="NavImg" src={img4} alt="icon" />} 커뮤니티
      </NavListItemWrapper>
    </NavListWrapper>
  );
}

export default NavList;
