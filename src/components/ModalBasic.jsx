import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// 검색창 스타일
const SearchModalWrapper = styled.div`
  background-color: #370e97;
  width: 530px;
  min-height: 400px;
  max-height: 800px;
  border-radius: 20px;
  padding: 0.1px;
  position: absolute;
  top: 70px;
  right: -48px;
  opacity: 0.98;
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: 1px 1px 1px 1px #000;
  .aaa {
    background-color: #370e97;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 35px 0;
    div {
      background-color: #fff;
      /* border: 1px solid #000; */
    }
  }
`;
const Box = styled.div`
  margin: 0 auto;
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 100px;
`;
const InputBox = styled.input`
  background: none;
  border: 1px solid #fff;
  border-radius: 30px;
  outline: none;
  flex: 1;
  padding: 12px;
  color: #fff;
`;
const Xbutton = styled.button`
  background: none;
  color: #fff;
  border: none;
  font-weight: 700;
  font-size: 16px;
  margin-left: 10px;
`;
const SearchMatchingBox = styled.div`
  width: 350px;
  height: 100px;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  /* cursor: pointer; */
  .flexCol {
    display: flex;
    flex-direction: column;
    border: none;
  }
  span {
    margin: 4px 0;
  }
  button {
    width: 150px;
    border-radius: 5px;
    &:hover {
      background-color: aqua;
      transition: 0.2s;
    }
  }
`;

function ModalBasic(props) {
  const { setModalOpen } = props;

  const [searchValue, setSearchValue] = useState("");
  const [getMatchingListState, setGetMatchingListState] = useState(); // 매칭리스트
  const [getCommunityListState, setGetCommunityListState] = useState(); // 커뮤니티리스트

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const getPostList = async () => {
        const getMatchingList = await axios.get(`${process.env.REACT_APP_ADDRESS}`); // 매칭 get요청
        const getCommunityList = await axios.get(`${process.env.REACT_APP_ADDRESS}/community`); // 커뮤 get요청
        setGetMatchingListState(getMatchingList.data.data);
        setGetCommunityListState(getCommunityList.data.communityData);
      };
      getPostList();
    } catch (error) {
      console.error(error);
    }
  }, []);
  console.log(getMatchingListState);
  console.log(getCommunityListState);

  // 매칭 리스트 필터
  const searchFilter = getMatchingListState?.filter(
    (item) =>
      item.title.toLowerCase().includes(searchValue) ||
      item.game.toLowerCase().includes(searchValue) ||
      item.id.nickname?.toLowerCase().includes(searchValue) ||
      item.district.toLowerCase().includes(searchValue)
  );
  // 커뮤니티 리스트 필터
  const serrchComFilter = getCommunityListState?.filter(
    (itemCom) => itemCom.id.nickname?.toLowerCase().includes(searchValue) || itemCom.content.toLowerCase().includes(searchValue)
  );

  const closeModal = () => setModalOpen(false);
  const changeSearch = (e) => {
    setSearchValue(e.target.value?.toLowerCase());
  };

  return (
    <SearchModalWrapper>
      <Box>
        <InputBox type="text" placeholder="검색어를 입력하세요" value={searchValue} onChange={changeSearch} />
        <style>{`::placeholder {color: #9B9B9B;}`}</style>
        <Xbutton onClick={closeModal}>취소</Xbutton>
      </Box>

      {
        <div className="aaa">
          {searchValue
            ? searchFilter.map((item) => {
                return (
                  <SearchMatchingBox>
                    <div className="flexCol">
                      <span>제목: {item.title}</span>
                      <span>지역: {item.district}</span>
                      {/* <span>게임: {item.game}</span> */}
                      <span>날짜: {item.selectDate}</span>
                    </div>
                    <button
                      onClick={() => {
                        navigate(`/matchingPost/${item._id}`);
                      }}
                    >
                      본문으로 이동
                    </button>
                  </SearchMatchingBox>
                );
              })
            : null}
          {searchValue
            ? serrchComFilter.map((itemCom) => {
                return <div>{itemCom.title}</div>;
              })
            : null}
        </div>
      }
    </SearchModalWrapper>
  );
}

export default ModalBasic;
