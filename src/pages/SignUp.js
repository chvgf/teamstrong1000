import React, { useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignArea = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  width: 530px;
  height: 100vh;
  gap: 15px;

  button {
    margin-top: 20px;
    border: none;
    background: #4610c0;
    color: #fff;
    padding: 5px 10px;
    border-radius: 15px;
    transition: 0.3s;
    cursor: pointer;
    border: 1px solid #4610c0;
  }

  button:hover {
    background: #fff;
    color: #4610c0;
    border: 1px solid #4610c0;
  }

  input {
    border-radius: 10px;
    border: 2px solid #ccc;
    transition: 0.3s;
    width: 300px;
    height: 40px;
    padding: 13px;
  }
  select {
    border-radius: 10px;
    border: 2px solid #ccc;
    transition: 0.3s;
    width: 300px;
    height: 40px;
    text-align: center;
  }
  input:focus,
  select:focus {
    outline: none;
    border: 2px solid #4610c0;
    background: #d8d1e8;
  }

  span {
    font-size: 12px;
    color: red;
  }
`;

function SignUp(props) {
  const [inputUserId, setInputUserId] = useState("");
  const [inputUserPass, setInputUserPass] = useState("");
  const [inputUserPassCheck, setInputUserPassCheck] = useState("");
  const [inputUserNick, setInputUserNick] = useState("");
  const [inputUserGrade, setInputUserGrade] = useState("");
  const [inputUserClub, setInputUserClub] = useState("");
  const signUp = { id: inputUserId, passwd: inputUserPass, nick: inputUserNick, grade: inputUserGrade, teamName: inputUserClub };
  const navigate = useNavigate();

  const handleInputUserId = (e) => {
    setInputUserId(e.target.value);
  };
  const handleInputUserPass = (e) => setInputUserPass(e.target.value);
  const handleInputUserPassCheck = (e) => {
    setInputUserPassCheck(e.target.value);
  };
  const handleInputUserNick = (e) => setInputUserNick(e.target.value);
  const handleInputGrade = (e) => {
    return setInputUserGrade(e.target.value);
  };
  const handleInputUserClub = (e) => {
    setInputUserClub(e.target.value);
  };

  const handlePushUserInfo = async (signUp) => {
    const result = await axios.post(`${process.env.REACT_APP_ADDRESS}/register`, signUp);
    if (result.data.flag === true) {
      alert("가입을 환영합니다! 로그인해주세요!");
      navigate("/login");
    } else {
      alert(`${result.data.message}`);
    }
    console.log(result.data);

    // if (inputUserId === '') {
    //   alert('ID를 입력해주세요!')
    // } else if (inputUserPass !== inputUserPassCheck) {
    //   alert('비밀번호가 일치하지 않습니다!')
    // } else if (userId.find(id => id.id === inputUserId)) {
    //   alert('이미 가입된 아이디 입니다!')
    // } else if (inputUserNick === '') {
    //   alert('닉네임을 입력해주세요!')
    // } else if (userId.find(id => id.nick === inputUserNick)) {
    //   alert('이미 존재하는 닉네임입니다!')
    // } else {
    //   axios.post(`http://43.201.7.114/cors`, signUp)
    //   alert('가입을 환영합니다! 로그인해주세요!')
    //   navigate('/login')
    // }
  };
  // console.log(userId.find(id => id.id === "지민"));

  return (
    <SignArea>
      아이디 <input type="text" value={inputUserId} onChange={handleInputUserId} />
      {/* {
        !(inputUserId !== '')
        ? <span></span>
        : userId.find(id => id.id === inputUserId)
          ? <span>이미 가입된 아이디입니다.</span>
          : <span>사용할 수 있는 아이디입니다.</span>
      } */}
      비밀번호 <input type="password" value={inputUserPass} onChange={handleInputUserPass} />
      비밀번호 확인
      <input type="password" value={inputUserPassCheck} onChange={handleInputUserPassCheck} />
      {!(inputUserPass !== "") ? (
        <span></span>
      ) : inputUserPass === inputUserPassCheck ? (
        <span>비밀번호가 일치합니다.</span>
      ) : (
        <span>비밀번호가 일치하지 않습니다.</span>
      )}
      닉네임 <input type="text" value={inputUserNick} onChange={handleInputUserNick} />
      {/* {
        !(inputUserNick !== '')
        ? <span></span>
        : userId.find(id => id.nick === inputUserNick)
          ? <span>이미 가입된 닉네임입니다.</span>
          : <span>사용할 수 있는 닉네임입니다.</span>
      } */}
      구력
      <select value={inputUserGrade} onChange={handleInputGrade}>
        <option>자강조</option>
        <option>A조</option>
        <option>B조</option>
        <option>C조</option>
        <option>D조</option>
        <option>초심조</option>
        <option>해당없음</option>
      </select>
      <span>*필수</span>
      소속 클럽 <input type="text" value={inputUserClub} onChange={handleInputUserClub} />
      <span>*선택사항</span>
      <button onClick={() => handlePushUserInfo(signUp)}>가입하기</button>
    </SignArea>
  );
}

export default SignUp;
