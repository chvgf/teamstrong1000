import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import CommunityCommentListItem from "./CommunityCommentListItem";
import axios from "axios";
import { useEffect } from "react";
import { getLoginUser } from "../features/useinfo/userInfoSlice";

const CommunityCommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  background-color: pink;
  box-sizing: border-box;
  width: 417px;
  height: 350px;
  border: 1px solid #e9e9e9;
  border-radius: 8px;
  text-align: left;
  padding: 9px;
  box-shadow: 1px 1px 1px 1px #e9e9e9;
  cursor: pointer;
  &:hover {
    border: 1px solid #9b9b9b;
  }
  &:last-child {
    margin-bottom: 75px;
  }
  & + & {
    margin-top: 18px;
  }
`;
const CommunityCommentList = styled.div`
  overflow-y: scroll;
`;
const CommunityCommentIsert = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    background-color: #fff;
    height: 40px;
    flex: 1;
    margin-right: 5px;
    border-radius: 7px;
    border: none;
  }
  button {
    background-color: #ff5959;
    outline: none;
    height: 40px;
    width: 80px;
    border: none;
    border-radius: 7px;
  }
`;
function CommunityComment(props) {
  const [addComment, setAddComment] = useState(); // 댓글 DB 객체
  const [addCommentE, setAddCommentE] = useState([]); // 댓글 입력값 + 객체

  const userNic = useSelector(getLoginUser);

  const postId = props.postId;
  const filterComment = addCommentE?.filter((id) => {
    return id.commentPostId == postId;
  });
  const changeAddComment = (e) => setAddComment(e.target.value);
  const handleAddComment = async () => {
    // 댓글 등록 버튼
    if (userNic.userId) {
      if (!addComment) {
        alert("댓글을 입력해주세요.");
      } else {
        const result = await axios.post(
          `${process.env.REACT_APP_ADDRESS}/community/communityComment`,
          { addComment, postId },
          { withCredentials: true }
        );

        setAddCommentE(result.data.rePost); // 새로고침 없이 재렌더링..(post 보낼때 새 다시 find 받아오기)
        setAddComment("");
      }
    } else {
      alert("로그인 시 사용 가능합니다.");
    }
  };
  useEffect(() => {
    const getComments = async () => {
      // 댓글 리스트 받아오기
      try {
        const result = await axios.get(`${process.env.REACT_APP_ADDRESS}/community/communityComment`, { withCredentials: true });
        setAddCommentE(result.data.comments);
      } catch (err) {
        console.error(err);
      }
    };
    getComments();
  }, []);

  const commentDel = async () => {
    try {
      const result = await axios.get(`${process.env.REACT_APP_ADDRESS}/community/communityComment`, { withCredentials: true });
      setAddCommentE(result.data.comments);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CommunityCommentWrapper>
      <CommunityCommentList>
        {filterComment.map((addCommentMap) => {
          return (
            <CommunityCommentListItem
              key={addCommentMap._id}
              commentPostId={addCommentMap._id}
              addComment={addCommentMap.addComment}
              userId={addCommentMap.userId}
              commentDel={commentDel}
            />
          );
        })}
      </CommunityCommentList>

      <CommunityCommentIsert>
        <input type="text" name="content" value={addComment} onChange={changeAddComment} />
        <button
          type="submit"
          onClick={() => {
            handleAddComment();
          }}
        >
          게시
        </button>
      </CommunityCommentIsert>
    </CommunityCommentWrapper>
  );
}

export default CommunityComment;
