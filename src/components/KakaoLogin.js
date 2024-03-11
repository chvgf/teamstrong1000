import React from "react";
import KakaoImg from "../img/kakao_login_medium_narrow.png";
import styled from "styled-components";

const KakaoBtn = styled.div`
  cursor: pointer;
`;
function KakaoLogin(props) {
  const REST_API_KEY = "995200224a6ee4538c7409c95beb2cb6";
  const REDIRECT_URL = `${process.env.REACT_APP_ADDRESS}/login`;

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URL}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };
  const code = new URL(window.location.href).searchParams.get("code");

  return (
    <KakaoBtn onClick={handleLogin}>
      <img src={KakaoImg} />
    </KakaoBtn>
  );
}

export default KakaoLogin;
