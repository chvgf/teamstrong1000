import React from "react";
import styled, { css } from "styled-components";
import PostListItem from "../components/PostListItem";
import { BsArrowDownUp, BsChevronDown } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { selectUserList } from "../features/useinfo/userInfoSlice";
import { useNavigate } from "react-router";
import { getAllUserPostList, handleFilter, postInsertList, sortList, userPostList } from "../features/postListSlice/postListInsertSlice";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import DistrictModal from "../components/DistrictModal";
import { PulseLoader } from "react-spinners";

const PostListWrapper = styled.div`
  margin: 0 auto;
  margin-bottom: 70px;
  width: 417px;
  .insertMatching {
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 70px;
  }
`;
const PostInsertBtn = styled.button`
  background-color: #eee;
  box-shadow: 1px 1px 1px 1px gray;
  width: 200px;
  height: 35px;
  border-radius: 30px;
  border: none;
  line-height: 35px;
  opacity: 0.7;
  transition: 0.3s;
  margin: 0 10px;
  cursor: pointer;
  &:hover {
    background-color: #4610c0;
    color: #fff;
    box-shadow: 1px 1px 1px 1px #000;
  }
`;
const RandomMatching = styled.button`
  background-color: #eee;
  font-weight: bold;
  color: #4610c0;
  box-shadow: 1px 1px 1px 1px gray;
  width: 200px;
  height: 35px;
  border-radius: 30px;
  border: none;
  line-height: 35px;
  opacity: 0.7;
  transition: 0.3s;
  margin: 0 10px;
  cursor: pointer;
  &:hover {
    background-color: #4610c0;
    color: #fff;
    box-shadow: 1px 1px 1px 1px #000;
  }
`;
const PostListBtn1 = styled.button`
  width: 120px;
  height: 24px;
  border-radius: 23px;
  background-color: #ff5959;
  color: #fff;
  margin: 22px 10px 0 0;
  border: none;
  cursor: pointer;
  font-size: 12px;
  transition: 0.1s;
  &:hover {
    background-color: #e31e1e;
  }
`;
const PostListBtn2 = styled.button`
  width: 100px;
  height: 24px;
  border-radius: 23px;
  background-color: #ff5959;
  color: #fff;
  margin: 22px 0 0 0;
  border: none;
  cursor: pointer;
  font-size: 12px;
  transition: 0.1s;

  &:hover {
    background-color: #e31e1e;
  }
  ${(props) =>
    props.$showModal &&
    css`
      background-color: #4610c0;
    `}
`;

function PostList(props) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [district, setDistrict] = useState(false);
  const [district2, setDistrict2] = useState(false);
  const [district3, setDistrict3] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_ADDRESS}`)
      .then((response) => {
        dispatch(getAllUserPostList(response.data));
      })
      .catch((error) => {
        console.error(error);
      });
    setLoading(false);
  }, []);

  const navigate = useNavigate();
  // const postInsert = useSelector(postInsertList);
  const postInsert = useSelector(userPostList);

  // 필터
  const handleDistrict0 = () => {
    setDistrict(false);
    setDistrict2(false);
    setDistrict3(false);
  };
  const handleDistrict = () => {
    setDistrict(!district);
  };
  const handleDistrict2 = () => {
    setDistrict2(!district2);
  };
  const handleDistrict3 = () => {
    setDistrict3(!district3);
  };

  const handleRandom = async () => {
    // await axios.get(`${process.env.REACT_APP_ADDRESS}/RandomMatching`, { withCredentials: true });
    navigate("/RandomMatching");
  };

  return (
    <PostListWrapper>
      <PostListBtn1
        onClick={() => {
          dispatch(sortList());
        }}
      >
        <BsArrowDownUp /> 일정 가까운 순
      </PostListBtn1>
      <PostListBtn2 $showModal={showModal} onClick={handleModal}>
        모든지역 <BsChevronDown />
      </PostListBtn2>
      {showModal && (
        <DistrictModal
          postList={postInsert}
          district={district}
          district2={district2}
          district3={district3}
          handleDistrict0={handleDistrict0}
          handleDistrict={handleDistrict}
          handleDistrict2={handleDistrict2}
          handleDistrict3={handleDistrict3}
        />
      )}
      {/* {postInsert.map((postInsertMap) => {  
        return <PostListItem
          key={postInsertMap.title}  
          title={postInsertMap.title}
          content={postInsertMap.content}
          selectDate={postInsertMap.selectDate}
          gender={postInsertMap.gender}
          joinPersonnel={postInsertMap.joinPersonnel}
          game={postInsertMap.game}
        />
      })} */}

      {!district &&
        !district2 &&
        !district3 &&
        postInsert.map((postInsertMap) => {
          return (
            <PostListItem
              key={postInsertMap._id}
              address={postInsertMap._id}
              id={postInsertMap.id.userId}
              title={postInsertMap.title}
              content={postInsertMap.content}
              selectDate={postInsertMap.selectDate}
              gender={postInsertMap.gender}
              joinPersonnel={postInsertMap.joinPersonnel}
              game={postInsertMap.game}
              district={postInsertMap.district}
              joinMember={postInsertMap.joinMember}
            />
          );
        })}
      {district &&
        postInsert.map((postInsertMap) => {
          return (
            postInsertMap.district === "서울" && (
              <PostListItem
                key={postInsertMap._id}
                address={postInsertMap._id}
                id={postInsertMap.id.userId}
                title={postInsertMap.title}
                content={postInsertMap.content}
                selectDate={postInsertMap.selectDate}
                gender={postInsertMap.gender}
                joinPersonnel={postInsertMap.joinPersonnel}
                game={postInsertMap.game}
                district={postInsertMap.district}
                joinMember={postInsertMap.joinMember}
              />
            )
          );
        })}
      {district2 &&
        postInsert.map((postInsertMap) => {
          return (
            postInsertMap.district === "경기" && (
              <PostListItem
                key={postInsertMap._id}
                address={postInsertMap._id}
                id={postInsertMap.id.userId}
                title={postInsertMap.title}
                content={postInsertMap.content}
                selectDate={postInsertMap.selectDate}
                gender={postInsertMap.gender}
                joinPersonnel={postInsertMap.joinPersonnel}
                game={postInsertMap.game}
                district={postInsertMap.district}
                joinMember={postInsertMap.joinMember}
              />
            )
          );
        })}
      {district3 &&
        postInsert.map((postInsertMap) => {
          return (
            postInsertMap.district === "인천" && (
              <PostListItem
                key={postInsertMap._id}
                address={postInsertMap._id}
                id={postInsertMap.id.userId}
                title={postInsertMap.title}
                content={postInsertMap.content}
                selectDate={postInsertMap.selectDate}
                gender={postInsertMap.gender}
                joinPersonnel={postInsertMap.joinPersonnel}
                game={postInsertMap.game}
                district={postInsertMap.district}
                joinMember={postInsertMap.joinMember}
              />
            )
          );
        })}

      {loading && <PulseLoader color="#4610C0" margin={25} size={25} />}

      <div className="insertMatching">
        <PostInsertBtn onClick={() => navigate("/postInsert")}>게시글 추가</PostInsertBtn>
        <RandomMatching onClick={handleRandom}>*랜덤 매칭*</RandomMatching>
      </div>
    </PostListWrapper>
  );
}

export default PostList;
