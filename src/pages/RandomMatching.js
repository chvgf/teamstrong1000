import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const RanItemWrapper = styled.div`
  background-color: #fff;
  width: 530px;
  height: 100vh;
  color: #1c1b1f;

  .matchingBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .matchingBoxItem {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 417px;
      height: 200px;
      border: 1px solid #e9e9e9;
      border-radius: 8px;
      text-align: left;
      padding: 30px 15px;
      margin: 18px auto;
      cursor: pointer;
      transition: 0.2s;
      &:hover {
        border: 1px solid #4610c0;
      }
      .title {
        display: block;
        font-size: 18px;
        margin: 0 auto;
        font-weight: bold;
      }
      .GDGcentet {
        margin: 0 auto;
      }
      .game,
      .grade,
      .district {
        font-size: 16px;
        margin: 0 13px;
      }
      .selectDate {
        text-align: center;
        line-height: 23px;
        border-radius: 20px;
        margin: 0 auto;
        font-size: 12px;
        color: #9b9b9b;
        display: block;
        width: 300px;
        height: 30px;
        background-color: #5c5c5c;
        color: #fff;
        padding: 3px;
      }
      &:hover {
        background-color: #eee;
      }
    }
  }
  .랜덤매칭 {
    margin: 44px 0 14px 37px;
    color: #1c1b1f;
    font-size: 24px;
    font-weight: 800;
  }
  hr {
    margin: 0 37px;
    border: 1px solid #4610c0;
    margin-bottom: 34px;
  }
  .reMatchingBtn {
    margin: 10px auto;
    background-color: #eee;
    box-shadow: 1px 1px 1px 1px gray;
    width: 200px;
    height: 35px;
    border-radius: 30px;
    border: none;
    line-height: 35px;
    opacity: 0.7;
    transition: 0.3s;
    cursor: pointer;
    &:hover {
      background-color: #4610c0;
      color: #fff;
      box-shadow: 1px 1px 1px 1px #000;
    }
  }
`;

function RandomMatching(props) {
  const [getMatchingPost, setGetMatchingPost] = useState(); // 겟요청시 보여주는 랜덤매칭
  const [reMatching, setReMatching] = useState(); // 재 매칭 요청시 보여주는 랜덤매칭

  const navigate = useNavigate();

  useEffect(() => {
    const matchingPostGet = async () => {
      try {
        const getpost = await axios.get(`${process.env.REACT_APP_ADDRESS}/RandomMatching`, { withCredentials: true });
        setGetMatchingPost(getpost);
      } catch (error) {
        console.error(error);
      }
    };
    matchingPostGet();
  }, []);

  // 재 매칭 버튼
  const handleRandom = async () => {
    try {
      const getSetpost = await axios.post(`${process.env.REACT_APP_ADDRESS}/RandomMatching`, "", { withCredentials: true });
      setReMatching(getSetpost);
    } catch (error) {
      console.error(error);
    }
  };

  // 랜덤, 중복제거
  let randomIndexArray = [];
  for (let i = 0; i < 2; i++) {
    const randomNum = Math.floor(Math.random() * getMatchingPost?.data.data.length);
    if (randomIndexArray.indexOf(randomNum) === -1) {
      randomIndexArray.push(randomNum);
    } else {
      i--;
    }
  }

  return (
    <RanItemWrapper>
      <header className="랜덤매칭">랜덤매칭테테테테테스트</header>
      <hr />
      <main className="matchingBox">
        <section
          className="matchingBoxItem"
          onClick={() => {
            navigate(
              `/matchingPost/${
                reMatching?.data.data[randomIndexArray[0]]._id
                  ? reMatching?.data.data[randomIndexArray[0]]._id
                  : getMatchingPost?.data.data[randomIndexArray[0]]._id
              }`
            );
          }}
        >
          {
            <>
              <span className="title">제목: {(reMatching || getMatchingPost)?.data.data[randomIndexArray[0]].title}</span>
              <div className="GDGcentet">
                <span className="game">게임: {(reMatching || getMatchingPost)?.data.data[randomIndexArray[0]].game}</span>
                <span className="district">지역: {(reMatching || getMatchingPost)?.data.data[randomIndexArray[0]].district}</span>
                <span className="grade">구력: {(reMatching || getMatchingPost)?.data.data[randomIndexArray[0]].id.grade}</span>
              </div>
              <span className="selectDate">날짜: {(reMatching || getMatchingPost)?.data.data[randomIndexArray[0]].selectDate}</span>
            </>
          }
        </section>
        <section
          className="matchingBoxItem"
          onClick={() => {
            navigate(
              `/matchingPost/${
                reMatching?.data.data[randomIndexArray[1]]._id
                  ? reMatching?.data.data[randomIndexArray[1]]._id
                  : getMatchingPost?.data.data[randomIndexArray[1]]._id
              }`
            );
          }}
        >
          {
            <>
              <span className="title">제목: {(reMatching || getMatchingPost)?.data.data[randomIndexArray[1]].title}</span>
              <div className="GDGcentet">
                <span className="game">게임: {(reMatching || getMatchingPost)?.data.data[randomIndexArray[1]].game}</span>
                <span className="district">지역: {(reMatching || getMatchingPost)?.data.data[randomIndexArray[1]].district}</span>
                <span className="grade">구력: {(reMatching || getMatchingPost)?.data.data[randomIndexArray[1]].id.grade}</span>
              </div>
              <span className="selectDate">날짜: {(reMatching || getMatchingPost)?.data.data[randomIndexArray[1]].selectDate}</span>
            </>
          }
        </section>
        {/* <div
          className="matchingBoxItem"
          onClick={() => {
            navigate(
              `/matchingPost/${
                reMatching?.data.data[randomIndexArray[0]]._id
                  ? reMatching?.data.data[randomIndexArray[0]]._id
                  : getMatchingPost?.data.data[randomIndexArray[0]]._id
              }`
            );
          }}
        >
          {reMatching?.data.data[randomIndexArray[0]].content ? (
            <span>
              게임: {reMatching?.data.data[randomIndexArray[0]].game} <br />
              지역: {reMatching?.data.data[randomIndexArray[0]].district} <br />
              구력: {reMatching?.data.data[randomIndexArray[0]].id.grade}
            </span>
          ) : (
            <span>
              게임: {getMatchingPost?.data.data[randomIndexArray[0]].game} <br />
              지역: {getMatchingPost?.data.data[randomIndexArray[0]].district} <br />
              구력: {getMatchingPost?.data.data[randomIndexArray[0]].id.grade}
            </span>
          )}
        </div> */}
        {/* <div
          className="matchingBoxItem"
          onClick={() => {
            navigate(
              `/matchingPost/${
                reMatching?.data.data[randomIndexArray[1]]._id
                  ? reMatching?.data.data[randomIndexArray[1]]._id
                  : getMatchingPost?.data.data[randomIndexArray[1]]._id
              }`
            );
          }}
        >
          {reMatching?.data.data[randomIndexArray[1]].content
            ? reMatching?.data.data[randomIndexArray[1]].content
            : getMatchingPost?.data.data[randomIndexArray[1]].content}
        </div> */}

        <button className="reMatchingBtn" onClick={handleRandom}>
          재 매칭
        </button>
      </main>
    </RanItemWrapper>
  );
}

export default RandomMatching;
