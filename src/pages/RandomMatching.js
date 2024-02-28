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
  }
  .matchingBoxItem {
    border: 1px solid #1c1b1f;
    width: 300px;
    height: 200px;
    margin: 70px auto;
    padding: 20px;
    cursor: pointer;
    span {
      display: block;
      color: #000;
      padding: 5px 0;
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
    width: 100px;
    height: 50px;
    margin: 0 auto;
  }
`;

function RandomMatching(props) {
  const [getMatchingPost, setGetMatchingPost] = useState(); // 겟요청시 보여주는 랜덤매칭
  const [reMatching, setReMatching] = useState(); // 재 매칭 요청시 보여주는 랜덤매칭

  const navigate = useNavigate();

  useEffect(() => {
    const matchingPostGet = async () => {
      const getpost = await axios.get(`${process.env.REACT_APP_ADDRESS}/RandomMatching`, { withCredentials: true });
      setGetMatchingPost(getpost);
      console.log(getpost);
    };
    matchingPostGet();
  }, []);

  // 재 매칭 버튼
  const handleRandom = async () => {
    const getSetpost = await axios.post(`${process.env.REACT_APP_ADDRESS}/RandomMatching`, "", { withCredentials: true });
    setReMatching(getSetpost);
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
      <div className="랜덤매칭">랜덤매칭</div>
      <hr />
      <div className="matchingBox">
        <div
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
              <span>
                제목: {(reMatching || getMatchingPost)?.data.data[randomIndexArray[0]].title} <br />
              </span>
              <span>
                게임: {(reMatching || getMatchingPost)?.data.data[randomIndexArray[0]].game} <br />
              </span>
              <span>
                지역: {(reMatching || getMatchingPost)?.data.data[randomIndexArray[0]].district} <br />
              </span>
              <span>
                구력: {(reMatching || getMatchingPost)?.data.data[randomIndexArray[0]].id.grade} <br />
              </span>
              <span>날짜: {(reMatching || getMatchingPost)?.data.data[randomIndexArray[0]].selectDate}</span>
            </>
          }
        </div>
        <div
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
              <span>
                제목: {(reMatching || getMatchingPost)?.data.data[randomIndexArray[1]].title} <br />
              </span>
              <span>
                게임: {(reMatching || getMatchingPost)?.data.data[randomIndexArray[1]].game} <br />
              </span>
              <span>
                지역: {(reMatching || getMatchingPost)?.data.data[randomIndexArray[1]].district} <br />
              </span>
              <span>
                구력: {(reMatching || getMatchingPost)?.data.data[randomIndexArray[1]].id.grade} <br />
              </span>
              <span>날짜: {(reMatching || getMatchingPost)?.data.data[randomIndexArray[1]].selectDate}</span>
            </>
          }
        </div>
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
      </div>
    </RanItemWrapper>
  );
}

export default RandomMatching;
