import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getAllCalendarInfo, getLoginUser, getLoginUserInfo } from "../features/useinfo/userInfoSlice";
import MypageMatchItem from "../components/MypageMatchItem";

const MyPageArea = styled.div`
  background-color: #000;
  width: 530px;
  height: 100vh;
  overflow-y: scroll;
  background-image: url(/back2.jpg);
  background-size: cover;

  .myPageHeader {
    margin: 44px 0 14px 37px;
    color: #fff;

    font-size: 24px;
    font-weight: 800;
  }

  hr {
    margin: 0 37px;
    border: 1px solid #fff;
  }

  button {
    width: 457px;
    height: 40px;
    margin-top: 50px;
    border: none;

    background: #4610c0;
    color: #fff;
    padding: 5px 10px;
    border-radius: 30px;
    transition: 0.3s;
    border: 1px solid #4610c0;
    cursor: pointer;
  }

  button:hover {
    background: #fff;
    color: #4610c0;
    border: 1px solid #4610c0;
  }

  .bigDiv {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 37px;
  }

  .top {
    display: flex;
    gap: 30px;
    margin-top: 50px;
    margin-bottom: 50px;
  }

  .win {
    width: 250px;
    height: 140px;
    color: #fff;
    font-weight: 900;
    font-size: 30px;
    text-align: center;
    line-height: 190px;
    background-image: url(/win.png);
    background-position: center;
    background-repeat: no-repeat;
  }

  .lose {
    width: 250px;
    height: 140px;
    color: #fff;
    font-size: 30px;
    text-align: center;
    line-height: 190px;
    font-weight: 900;
    background-image: url(/lose.png);
    background-position: center;
    background-repeat: no-repeat;
  }

  h4 {
    margin-top: 34px;
    font-size: 25px;
    font-weight: 800;
    color: #fff;
    margin-bottom: 30px;
  }

  .signArea {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

const MyMatchList = styled.div`
  /* width: 457px; */
  max-width: 457px;
  height: 190px;
  overflow: scroll;
  border-radius: 7px;
  padding: 20px;
  line-height: 20px;
  /* display: flex; */
  justify-content: space-between;
  align-items: center;
  background-image: url(/board.png);
  background-position: center;
  background-repeat: no-repeat;
  color: #fff;

  div {
    position: relative;
    cursor: pointer;
  }

  div .popupBox {
    cursor: default;
    width: 100%;
    height: 100%;
    background-color: #efefef;
    position: absolute;
    top: 0;
  }

  button {
    width: 100px;
    height: 30px;
    margin-top: 20px;
    border: none;
    background: #4610c0;
    color: #fff;
    padding: 5px 10px;
    border-radius: 15px;
    transition: 0.3s;
    border: 1px solid #4610c0;
    cursor: pointer;
  }

  button:hover {
    background: #fff;
    color: #4610c0;
    border: 1px solid #4610c0;
  }
`;

function MyPage(props) {
  const [matchList, setMatchList] = useState([]);
  const [winPoint, setWinPoint] = useState(0);
  const [losePonit, setLosePonit] = useState(0);
  const loginUser = useSelector(getLoginUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getMatchList = async () => {
      const result = await axios.get(`${process.env.REACT_APP_ADDRESS}/myPage/matchList`, { withCredentials: true });
      setMatchList(result.data.data);
      setWinPoint(result.data.userData?.win);
      setLosePonit(result.data.userData?.lose);
    };
    getMatchList();
  }, []);

  const handleLogout = async () => {
    const result = await axios.post(`${process.env.REACT_APP_ADDRESS}/user/logout`, {}, { withCredentials: true });
    console.log(result.data);
    if (result.data.flag) {
      alert(result.data.message);
      dispatch(getLoginUserInfo(null));
      dispatch(getAllCalendarInfo(null));
      navigate("/");
    }
  };

  const reFresh = (data) => {
    setMatchList(data);
  };
  const reFreshConfirm = (data) => {
    setMatchList(data.data);
    console.log(data.data);
    setWinPoint(data.userData?.win);
    setLosePonit(data.userData?.lose);
  };

  return (
    <MyPageArea>
      <div className="myPageHeader">내 정보</div>
      <hr />

      <div className="bigDiv">
        <div className="top">
          <div className="win">{winPoint}</div>
          <div className="lose">{losePonit}</div>
        </div>

        <h4>내 경기 일정</h4>
        <MyMatchList>
          {matchList.map((match) => (
            <MypageMatchItem
              key={match._id}
              title={match.title}
              district={match.district}
              joinPersonnel={match.joinPersonnel}
              joinMember={match.joinMember}
              game={match.game}
              userId={match.id.userId}
              selectDate={match.selectDate}
              postId={match?.postId}
              lo={match.news?.postId == match.postId ? "red" : ""}
              check={match.check ? "check" : ""}
              win={match.winner?.win === "win" ? "win" : ""}
              reFresh={reFresh}
              reFreshConfirm={reFreshConfirm}
            />
          ))}
        </MyMatchList>
      </div>

      <div className="signArea">
        <button
          className="lastbtn"
          onClick={() => {
            handleLogout();
          }}
        >
          로그아웃
        </button>
      </div>
    </MyPageArea>
  );
}

export default MyPage;
