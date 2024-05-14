import React, { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";
import { getLoginUser } from "../features/useinfo/userInfoSlice";

const CommunityInsertWrapper = styled.div`
  background-color: #fff;
  width: 530px;
  height: 100vh;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;
  overflow-y: hidden;
  * {
    color: #1c1b1f;
  }
  .커뮤니티글쓰기 {
    width: 100%;
    margin: 44px 0 15px;
    color: #1c1b1f;
    font-size: 24px;
    font-weight: 800;
    padding: 0 37px;
  }
  hr {
    width: 450px;
    margin: 0 37px;
    margin-bottom: 15px;
    border: 1px solid #4610c0;
  }
  span {
    color: #4610c0;
  }
  .titleContentDiv {
    width: 100%;
    height: 600px;
    display: flex;
    flex-direction: column;
    padding: 0 37px;
    margin: 15px 0;
  }
  label {
    font-size: 18px;
    font-weight: 800;
    margin-bottom: 12px;
  }
  .title {
    width: 100%;
    height: 50px;
    margin-bottom: 24px;
    border: 1px solid #e9e9e9;
    border-radius: 7px;
    outline: none;
    transition: 0.3s;
    &:focus {
      border: 1px solid #4610c0;
    }
  }
  .content {
    width: 100%;
    height: 400px;
    margin-bottom: 10px;
    border: 1px solid #e9e9e9;
    border-radius: 7px;
    resize: none;
    outline: none;
    transition: 0.3s;
    &:focus {
      border: 1px solid #4610c0;
    }
  }
  .imgup {
    width: 100%;
  }
  button:last-child {
    margin-bottom: 90px;
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

function CommunityInsert(props) {
  const navigate = useNavigate();
  const userNic = useSelector(getLoginUser);
  console.log(userNic);

  // const [insertTitle, setInsertTitle] = useState('');
  const [insertContent, setInsertContent] = useState("");
  const [insertImgUp, setInsertImgUp] = useState([]);
  let like = 0;

  // const changeTitle = (e) => setInsertTitle(e.target.value)
  const changeContent = (e) => setInsertContent(e.target.value);

  const imgRef = useRef();
  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setInsertImgUp(reader.result);
    };
  };
  const date = new Date();

  const communityInput = {
    id: userNic,
    content: insertContent,
    imagePath: insertImgUp,
    like,
    date,
  };
  const handlePushCommunity = async () => {
    await axios.post(`${process.env.REACT_APP_ADDRESS}/community/communityInsert`, communityInput);
    navigate("/community");
  };

  return (
    <CommunityInsertWrapper>
      <div className="커뮤니티글쓰기">
        <div>커뮤니티 글쓰기</div>
      </div>
      <hr />
      {
        <form className="titleContentDiv">
          <label htmlFor="2">
            내용 입력<span>*</span>
          </label>
          {<textarea id="2" className="content" placeholder="내용 입력" value={insertContent} onChange={changeContent} />}
          <label htmlFor="3" />
          {<input id="3" className="imgup" type="file" accept="image/*" ref={imgRef} onChange={saveImgFile} />}
        </form>
      }

      <SaveButton
        type="submit"
        onClick={() => {
          handlePushCommunity();
          alert("게시글이 작성되었습니다!");
        }}
      >
        게시글 추가하기
      </SaveButton>
      <CancelButton
        onClick={() => {
          navigate("/community");
        }}
      >
        취소하기
      </CancelButton>
    </CommunityInsertWrapper>
  );
}

export default CommunityInsert;
