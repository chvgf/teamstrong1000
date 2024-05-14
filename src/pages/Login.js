import React, { useState } from "react";
import { styled } from "styled-components";
import { useDispatch } from "react-redux";
import { getLoginUserInfo } from "../features/useinfo/userInfoSlice";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import KakaoLogin from "../components/KakaoLogin";
import logoImg from "../img/logo2.png";

// kakao

const SignArea = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  width: 530px;
  height: 100vh;
  gap: 10px;

  button {
    width: 200px;
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
  button + button {
    margin: 2px 0;
  }

  input {
    width: 300px;
    padding: 10px;
    height: 45px;
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid #4610c0;
    border-radius: 7px;
    outline: none;
    transition: 0.3s;
  }

  input:focus {
    outline: none;
  }
`;

const LogoImg = styled.img`
  margin-bottom: 40px;
  margin-left: 5px;
  width: 200px;
`;

function Login(props) {
  const [inputUserId, setInputUserId] = useState("");
  const [inputUserPass, setInputUserPass] = useState("");
  const location = useLocation();

  const dispatch = useDispatch();

  const handLogin = async () => {
    if (inputUserId === "") {
      toast.error("아이디를 입력해주세요!");
      return;
    } else if (inputUserPass === "") {
      toast.error("비밀번호를 입력해주세요!");
      return;
    } else {
      const result = await axios.post(
        `${process.env.REACT_APP_ADDRESS}/user/login`,
        { userId: inputUserId, passwd: inputUserPass },
        { withCredentials: true }
      );

      if (!result.data.flag) {
        return alert("로그인 실패");
      }

      dispatch(getLoginUserInfo(result.data.user));
      alert(`환영합니다! ${result.data.user.userId} 님!`);
      navigate(location.state?.from?.pathname || "/");
    }
  };
  // const handLogin = () => {
  //   if (inputUserId== '') {
  //     toast.error('아이디를 입력해주세요!');
  //     return
  //   } else if (inputUserPass === '') {
  //     toast.error('비밀번호를 입력해주세요!');
  //     return
  //   } else if (userId === undefined) {
  //     toast.error('회원가입되지 않은 ID 입니다!');
  //   } else if (userId.passwd !== inputUserPass) {
  //     toast.error('비밀번호가 다릅니다!');
  //     return
  //   } else {
  //     alert(`환영합니다! ${userId.nick}님!`);
  //     navigate('/')
  //   }
  // };

  const navigate = useNavigate();

  const handleInputUserId = (e) => setInputUserId(e.target.value);
  const handleInputUserPass = (e) => setInputUserPass(e.target.value);

  return (
    <SignArea>
      <LogoImg src={logoImg} />
      <input type="text" value={inputUserId} onChange={handleInputUserId} placeholder="아이디" />
      <input type="password" value={inputUserPass} onChange={handleInputUserPass} placeholder="비밀번호" />

      <button onClick={handLogin}>로그인</button>
      <button onClick={() => navigate("/signUp")}>회원가입</button>
      <KakaoLogin />
    </SignArea>
  );
}

export default Login;
