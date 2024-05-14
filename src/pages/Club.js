import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getAllTeamInfo, getLoginUser, getTeamInfo } from "../features/useinfo/userInfoSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ClubWrapper = styled.div`
  background-color: #fff;
  width: 530px;
  height: 100vh;
  overflow-y: scroll;
  color: #1c1b1f;

  .매칭찾기 {
    margin: 30px 0 14px 37px;
    color: #1c1b1f;
    font-size: 24px;
    font-weight: 800;
  }

  hr {
    margin: 0 37px;
    border: 1px solid #4610c0;
  }

  .bigDiv {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 37px;
  }

  .제목 {
    margin-top: 20px;
    font-size: 18px;
    font-weight: 800;
    margin-bottom: 12px;
  }

  .권유 {
    font-size: 14px;
    margin-bottom: 20px;
  }
`;

const MyClub = styled.div`
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 7px;
  padding: 20px;
  line-height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  .team {
    font-size: 12px;
    color: #fff;
    width: 60px;
    padding: 2px;
    margin-bottom: 10px;
    text-align: center;
    border-radius: 30px;
    background-color: #4610c0;
  }

  h4 {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 20px;
    width: 150px;
  }

  span {
    font-weight: 900;
  }

  .right {
    padding-left: 60px;
  }

  .members {
    margin-bottom: 8px;
    margin-right: 30px;
    background-color: #d9d9d9;
    width: 100px;
    text-align: center;
    font-size: 14px;
    border-radius: 30px;
  }

  .btn {
    line-height: 18px;
    font-weight: 700;
    height: 100px;
    border: 1px solid #4610c0;
  }

  .btn:hover {
    background-color: #4610c0;
    color: #fff;
  }
`;

const CommunityInsertBtn = styled.button`
  position: relative;
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

  .hoverText {
    display: none;
  }

  &:hover .hoverText {
    display: block;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    border-radius: 10px 10px 0 10px;
    font-size: 16px;
    width: 130px;
    height: 30px;
    top: -30px;
    right: 43px;
    background-color: #4610c0;
  }

  &:hover {
    background-color: #4610c0;
    color: #fff;
    box-shadow: 1px 1px 1px 1px #000;
  }
`;

function Club(props) {
  const dispatch = useDispatch();
  const teamInfo = useSelector(getTeamInfo);
  console.log(teamInfo);
  const navigate = useNavigate();
  const loginUser = useSelector(getLoginUser);
  console.log(loginUser);

  useEffect(() => {
    const data = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_ADDRESS}/club`, { withCredentials: true });
        console.log(response);
        dispatch(getAllTeamInfo(response.data.data));
      } catch (error) {
        console.error(error);
        // alert('로그인이 필요합니다!')
      }
    };
    data();
  }, []);

  const handleInsert = async (teamName) => {
    if (loginUser) {
      try {
        // 클럽이 존재하는지 확인하는 로직 추가
        const clubExistenceCheck = await axios.get(`${process.env.REACT_APP_ADDRESS}/club/${teamName}`, { withCredentials: true });

        if (!clubExistenceCheck.data.flag) {
          // 클럽이 존재하지 않는 경우
          alert("존재하지 않는 클럽입니다.");
          return;
        }

        // 클럽에 가입하는 로직
        const response = await axios.post(
          `${process.env.REACT_APP_ADDRESS}/club/${teamName}/add-member`,
          {
            nickname: loginUser.nickname,
          },
          { withCredentials: true }
        );

        console.log(response);

        if (response.data.flag) {
          alert(response.data.message);
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("로그인이 필요합니다!");
    }
  };

  return (
    <ClubWrapper>
      <div className="매칭찾기">클럽🏸</div>
      <hr />

      <div className="bigDiv">
        <p className="제목">클럽 리스트</p>
        <span className="권유">클럽에 가입해 다양한 활동에 참여해보세요 !</span>
        {teamInfo?.map((myTeam) => {
          return (
            <MyClub>
              <div className="left">
                <div className="team">TEAM</div>
                <h4>{myTeam.teamName}</h4>
                <p>
                  <span>지역 | </span>
                  {myTeam.maindistrict}
                </p>
              </div>
              <div className="right">
                {myTeam.members.map((member) => (
                  <div className="members"> {member} </div>
                ))}
              </div>
              <button
                className="btn"
                onClick={() => {
                  handleInsert(myTeam.teamName);
                }}
              >
                가입하기
              </button>
            </MyClub>
          );
        })}

        <CommunityInsertBtn
          onClick={() => {
            navigate("/clubInsert");
          }}
        >
          +<span className="hoverText">클럽 개설하기</span>
        </CommunityInsertBtn>
      </div>
    </ClubWrapper>
  );
}

export default Club;
