import React, { useEffect } from "react";
import styled from "styled-components";
import Header from "./Header";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllTeamInfo, getTeamInfo } from "../features/useinfo/userInfoSlice";
import logoImg from "../img/logo2.png";

const RankingWrapper = styled.div`
  background-color: #001a35;
  width: 530px;
  height: 100vh;
  background-image: url(/back.png);
  background-size: cover;

  .매칭찾기 {
    margin: 44px 0 14px 37px;
    color: #fff;
    font-size: 24px;
    font-weight: 800;
  }

  hr {
    margin: 0 37px;
    border: 1px solid #fff;
    margin-bottom: 34px;
  }

  div + div {
    margin-top: 10px;
  }

  &:nth-child() {
    width: 450px;
    height: 120px;
    margin: 0 auto;
    border: 1px solid #e9e9e9;
    border-radius: 7px;
  }

  .firstTeam {
    width: 450px;
    height: 120px;
    margin: 0 auto;
    border: 1px solid #e9e9e9;
    border-radius: 7px;
    background-color: #ffd700;
  }

  .secondTeam {
    width: 450px;
    height: 80px;
    margin: 0 auto;
    border: 1px solid #e9e9e9;
    border-radius: 7px;
    background-color: #c0c0c0;
  }

  .thirdTeam {
    width: 450px;
    height: 70px;
    margin: 0 auto;
    border: 1px solid #e9e9e9;
    border-radius: 7px;
    background-color: #743531;
  }
`;

const FirstTeam = styled.div`
  width: 457px;
  height: 160px;
  margin: 0 auto;
  color: #fff;
  border: none;
  background-image: url(/gold.png);
  background-size: cover;

  .inner {
    font-size: 14px;
    margin-left: 150px;
    padding-top: 30px;
    line-height: 22px;
  }

  .teamTitle {
    font-size: 35px;
    font-weight: 800;
    margin-bottom: 15px;
  }
`;

const SecondTeam = styled.div`
  width: 457px;
  height: 140px;
  margin: 0 auto;
  background-image: url(/silver.png);
  color: #fff;

  .inner {
    font-size: 14px;
    margin-left: 150px;
    padding-top: 30px;
    line-height: 22px;
  }

  .teamTitle {
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 15px;
  }
`;

const ThirdTeam = styled.div`
  width: 457px;
  height: 110px;
  margin: 0 auto;
  background-image: url(/copper.png);
  color: #fff;

  .inner {
    font-size: 14px;
    margin-left: 150px;
    padding-top: 20px;
    line-height: 22px;
  }

  .teamTitle {
    font-size: 25px;
    font-weight: 800;
    margin-bottom: 10px;
  }
`;

const TeamList = styled.div`
  width: 457px;
  height: 70px;
  box-sizing: border-box;
  margin: 0 auto;
  border: 2px solid #003a76;
  border-radius: 7px;
  background-color: #000e1c;
  color: #fff;
  display: flex;
  gap: 50px;
  align-items: center;

  .teamTitle {
    font-size: 20px;
    font-weight: bold;
    margin-left: 30px;
  }

  .lastdiv {
    display: flex;
    gap: 20px;
  }
`;
function Ranking(props) {
  const dispatch = useDispatch();
  const teamList = useSelector(getTeamInfo);

  // useEffect(() => {
  //   axios.get(`http://localhost:3000/team`)
  //     .then((response) => {
  //       dispatch(getAllTeamInfo(response.data))
  //     })
  //     .catch(error => console.error(error))
  // }, []);

  useEffect(() => {
    const data = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_ADDRESS}/club`);
        dispatch(getAllTeamInfo(response.data.data));
      } catch (error) {
        console.error(error);
      }
    };

    data();
  }, []);

  if (!teamList) {
    return null;
  }

  return (
    <RankingWrapper>
      <h1>명예의 전당</h1>
      <div className="매칭찾기">명예의 전당</div>
      <hr />
      {teamList.map((team, index) => {
        return index === 0 ? (
          <FirstTeam key={team.teamName}>
            <div className="inner">
              <p className="teamTitle">{team.teamName}</p>
              <p>승률 | {Math.round(100 * (team.winscore / (team.winscore + team.losescore)))}%</p>
              <p>지역 | {team.maindistrict}</p>
              {team.members.map((member) => (
                <span>{member} </span>
              ))}
            </div>
          </FirstTeam>
        ) : index === 1 ? (
          <SecondTeam key={team.teamName}>
            <div className="inner">
              <p className="teamTitle">{team.teamName}</p>
              <p>승률 | {Math.round(100 * (team.winscore / (team.winscore + team.losescore)))}%</p>
              <p className>지역 |{team.maindistrict}</p>
            </div>
          </SecondTeam>
        ) : index === 2 ? (
          <ThirdTeam key={team.teamName}>
            <div className="inner">
              <p className="teamTitle">{team.teamName}</p>
              <p>승률 | {Math.round(100 * (team.winscore / (team.winscore + team.losescore)))}%</p>
              <p>지역 |{team.maindistrict}</p>
            </div>
          </ThirdTeam>
        ) : (
          <TeamList key={team.teamName}>
            <p className="teamTitle">{team.teamName}</p>
            <div className="lastdiv">
              <p>승률 | {Math.round(100 * (team.winscore / (team.winscore + team.losescore)))}%</p>
              <p>지역 | {team.maindistrict}</p>
            </div>
          </TeamList>
        );
      })}

      {/* 
      <FirstTeam>
      </FirstTeam>
      <SecondTeam>

      </SecondTeam>
      <ThirdTeam>

      </ThirdTeam> */}
    </RankingWrapper>
  );
}

export default Ranking;
