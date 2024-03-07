import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getLoginUser } from "../features/useinfo/userInfoSlice";
import axios from "axios";

const CommunityCommentListItemWrapper = styled.div`
  height: 38px;
  font-size: 14px;
  background-color: #fff;
  color: #0b0b0b;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  border-radius: 7px;
  margin: 7px 0;
  .a {
    flex: 1;
    display: block;
  }
  .b {
    font-size: 10px;
    color: gray;
    display: block;
  }
  .c {
    font-size: 24px;
    color: red;
    display: block;
    padding-left: 7px;
  }
`;

function CommunityCommentListItem(props) {
  const [testt, settestt] = useState([]);

  const commentPostId = props.commentPostId;
  const userNic = props.userId;
  const loginUserNic = useSelector(getLoginUser);

  const handleDelete = async () => {
    // 게시글 삭제
    try {
      if (userNic == loginUserNic.userId) {
        const result = await axios.post(`${process.env.REACT_APP_ADDRESS}/community/communityComment/delete`, { commentPostId });
        console.log(result);
        settestt(result.data.commentDel);
        props.commentDel();
      } else {
        alert("내가쓴 댓글만 삭제 가능!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {
        <CommunityCommentListItemWrapper>
          {<span className="a">{props.addComment}</span>}
          {<span className="b">{props.userId}</span>}
          {
            <span
              className="c"
              onClick={() => {
                handleDelete();
              }}
            >
              ×
            </span>
          }
        </CommunityCommentListItemWrapper>
      }
    </>
  );
}

export default CommunityCommentListItem;
