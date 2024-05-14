import React, { useState } from "react";
import { useSelector } from "react-redux";

import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getLoginUser } from "../features/useinfo/userInfoSlice";
import { selectedPost } from "../features/postListSlice/postListInsertSlice";

const PostInsertWrapper = styled.div`
  background-color: #fff;
  width: 530px;
  height: 100vh;
  * {
    color: #1c1b1f;
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
    margin-bottom: 34px;
  }
  span {
    color: #4610c0;
    font-weight: 800;
  }
  select {
    display: block;
  }
  .선택 {
    font-size: 12px;
    color: #4610c0;
  }
`;

const TitleContentDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 37px;
  label {
    font-size: 18px;
    font-weight: 800;
    margin-bottom: 12px;
  }
  .title {
    width: 100%;
    padding: 10px;
    height: 45px;
    margin-bottom: 30px;
    border: 1px solid #e9e9e9;
    border-radius: 7px;
    outline: none;
    transition: 0.3s;
  }
  .title:focus {
    border: 1px solid #4610c0;
  }
  .content {
    width: 100%;
    padding: 10px;
    height: 150px;
    margin-bottom: 30px;
    border: 1px solid #e9e9e9;
    border-radius: 7px;
    outline: none;
    resize: none;
    transition: 0.3s;
  }
  .content:focus {
    border: 1px solid #4610c0;
  }
`;

const DistrictDateDiv = styled.div`
  width: 100%;
  display: flex;
  gap: 11px;
  align-items: center;
  .district {
    width: 220px;
    padding: 10px;
    height: 45px;
    margin-bottom: 30px;
    border: 1px solid #e9e9e9;
    border-radius: 7px;
    outline: none;
    transition: 0.3s;
  }
  .district:focus {
    border: 1px solid #4610c0;
  }
  .date {
    width: 220px;
    padding: 10px;
    height: 45px;
    margin-bottom: 30px;
    border: 1px solid #e9e9e9;
    border-radius: 7px;
    outline: none;
    transition: 0.3s;
  }
  .date:focus {
    border: 1px solid #4610c0;
  }
`;

const GenderJoinPersonnelGameDiv = styled.div`
  width: 100%;
  display: flex;
  gap: 11px;
  align-items: center;
  justify-content: space-between;
  .gender {
    width: 140px;
    padding: 10px;
    height: 45px;
    margin-bottom: 30px;
    border: 1px solid #e9e9e9;
    border-radius: 7px;
    outline: none;
    cursor: pointer;
    transition: 0.3s;
  }
  .gender:focus {
    border: 1px solid #4610c0;
  }
  .joinpersonnel {
    width: 140px;
    padding: 10px;
    height: 45px;
    margin-bottom: 30px;
    border: 1px solid #e9e9e9;
    border-radius: 7px;
    outline: none;
    cursor: pointer;
    transition: 0.3s;
  }
  .joinpersonnel:focus {
    border: 1px solid #4610c0;
  }
  .game {
    width: 140px;
    padding: 10px;
    height: 45px;
    margin-bottom: 30px;
    border: 1px solid #e9e9e9;
    border-radius: 7px;
    outline: none;
    transition: 0.3s;
    cursor: pointer;
  }
  .game:focus {
    border: 1px solid #4610c0;
  }
`;

const SaveButton = styled.button`
  background-color: #4610c0;
  width: 450px;
  height: 47px;
  border-radius: 30px;
  border: none;
  outline: none;
  color: #fff;
  font-size: 18px;
  transition: 0.3s;
  margin-top: 20px;
  margin-bottom: 10px;
  &:hover {
    background: #36009c;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
`;

const CancelButton = styled.button`
  background-color: #e9e9e9;
  width: 450px;
  height: 47px;
  border-radius: 30px;
  border: none;
  outline: none;
  color: #1c1b1f;
  font-size: 18px;
  transition: 0.3s;
  &:hover {
    background: #cecece;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
`;

function EditMatchPost(props) {
  const { postId } = useParams();
  const selectPost = useSelector(selectedPost);
  console.log(selectPost);
  const { selectDate, title, district, game, joinPersonnel, content, gender } = selectPost;

  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);
  const [editDistrict, setEditDistrict] = useState(district);
  const [editSelectDate, setEditSelectDate] = useState(selectDate);
  const [editGender, setEditGender] = useState(gender);
  const [editJoinPersonnel, setEditJoinPersonnel] = useState(joinPersonnel);
  const [editGame, setGame] = useState(game);
  const loginUser = useSelector(getLoginUser);
  const navigate = useNavigate();

  const titleChange = (e) => setEditTitle(e.target.value);
  const contentChange = (e) => setEditContent(e.target.value);
  const districtChange = (e) => setEditDistrict(e.target.value);
  const selectDateChange = (e) => setEditSelectDate(e.target.value);
  const genderChange = (e) => setEditGender(e.target.value);
  const joinPersonnelChange = (e) => setEditJoinPersonnel(e.target.value);
  const gameChange = (e) => setGame(e.target.value);

  // 게시글: 타이틀, 날짜, 지역, 참여인원, 경기방식, 작성자
  const postInput = {
    title: editTitle,
    content: editContent,
    selectDate: editSelectDate,
    district: editDistrict,
    joinPersonnel: editJoinPersonnel,
    game: editGame,
    gender: editGender,
    id: loginUser,
    nowDate: new Date().toISOString().slice(0, 16),
  };
  const handlePushPost = async () => {
    await axios.patch(`${process.env.REACT_APP_ADDRESS}/editMatchPost/${postId}`, postInput, { withCredentials: true });
    alert("수정이 완료되었습니다!");
    navigate("/");
  };
  return (
    <PostInsertWrapper>
      <div className="매칭찾기">매칭 수정하기</div>
      <hr />
      <TitleContentDiv>
        <label htmlFor="1" className="제목">
          제목을 입력해 주세요<span>*</span>
        </label>
        <input className="title" id="1" type="text" placeholder="제목을 입력해 주세요." value={editTitle} onChange={titleChange} />

        <DistrictDateDiv>
          <div>
            <label htmlFor="3">
              장소<span>*</span>
            </label>
            <select className="district" id="3" value={editDistrict} onChange={districtChange}>
              <option value={"서울"}>서울</option>
              <option value={"경기"}>경기</option>
              <option value={"인천"}>인천</option>
            </select>
          </div>

          <div>
            <label htmlFor="4">
              날짜/시간<span>*</span>
            </label>
            <input className="date" id="4" type="date" value={editSelectDate} onChange={selectDateChange} />
          </div>
        </DistrictDateDiv>

        <GenderJoinPersonnelGameDiv>
          <div>
            <label htmlFor="7">
              경기 방식<span>*</span>
            </label>
            <select className="game" id="7" value={editGame} onChange={gameChange}>
              <option value={"단식"}>단식</option>
              <option value={"복식"}>복식</option>
            </select>
          </div>

          <div>
            <label htmlFor="6">
              참여 인원<span>*</span>
            </label>
            <select className="joinpersonnel" id="6" value={editJoinPersonnel} onChange={joinPersonnelChange}>
              <option value={"2"}>2</option>
              <option value={"3"}>3</option>
              <option value={"4"}>4</option>
              <option value={"5"}>5</option>
              <option value={"6"}>6</option>
              <option value={"7"}>7</option>
              <option value={"8"}>8</option>
            </select>
          </div>

          <div>
            <label htmlFor="5">
              성별<span className="선택">(선택)</span>
            </label>
            <select className="gender" id="5" value={editGender} onChange={genderChange}>
              <option value={"남"}>남</option>
              <option value={"여"}>여</option>
            </select>
          </div>
        </GenderJoinPersonnelGameDiv>

        <label htmlFor="2">
          일정 소개를 입력해 주세요<span>*</span>
        </label>
        <textarea className="content" placeholder="일정 소개를 입력해 주세요." id="2" value={editContent} onChange={contentChange} />

        <SaveButton onClick={() => handlePushPost()}>수정하기</SaveButton>
        <CancelButton onClick={() => navigate("/")}>취소하기</CancelButton>
      </TitleContentDiv>
    </PostInsertWrapper>
  );
}

export default EditMatchPost;
