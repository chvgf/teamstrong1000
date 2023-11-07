import React, { useEffect, useState } from 'react';
import { styled } from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserInfo, getUserInfo, selectUserList } from '../features/useinfo/userInfoSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignArea = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  width: 530px;
  height: 100vh;
`;


function Login(props) {
  const [inputUserId, setInputUserId] = useState('');
  const [inputUserPass, setInputUserPass] = useState('');
  const [loingBtn, setLoginBtn] = useState(false);
  const userInfo = useSelector(selectUserList);
  
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get('https://my-json-server.typicode.com/zziimm/db-user/userInfo')
      .then((reponse) => {
        console.log(reponse);
        dispatch(getAllUserInfo(reponse.data))
      })
      .catch((error) => {
        console.error(error);
      });
  },[]);


  const userId = userInfo.find(user => inputUserId === user.id);

  const handLogin = () => {
    if (userId.passwd === inputUserPass) {
      alert(`환영합니다! ${userId.nick}님!`)
    } else {
      alert(`비밀번호가 일치하지 않습니다!`)
      return;
    }
  };

  const navigate = useNavigate();


  const handleInputUserId = (e) => setInputUserId(e.target.value);
  const handleInputUserPass = (e) => setInputUserPass(e.target.value);






  return (
    <SignArea>
      아이디<input type='text' value={inputUserId} onChange={handleInputUserId} />
      비밀번호<input type='password' value={inputUserPass} onChange={handleInputUserPass} />
      <button onClick={handLogin}>
        로그인
      </button>
      <button disabled onClick={() => navigate('/signUp')}>
        회원가입
      </button>
    </SignArea>
  );
}

export default Login;