import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CommunityComment from "./CommunityComment";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getLoginUser } from "../features/useinfo/userInfoSlice";

const CommunityListItemWrapper = styled.div`
  box-sizing: border-box;
  width: 417px;
  border: 1px solid #e9e9e9;
  border-radius: 8px;
  text-align: left;
  padding: 9px;
  transition: 0.2s;
  cursor: pointer;
  &:hover {
    border: 1px solid #4610c0;
  }
  &:last-child {
    margin-bottom: 75px;
  }
  & + & {
    margin-top: 18px;
  }
  img {
    width: 200px;
    height: 200px;
  }
  .div-between {
    display: flex;
    justify-content: space-between;
    margin: 10px;
  }
  .div-center {
    display: flex;
    justify-content: center;
    margin: 10px;
  }
  .div-start {
    display: flex;
    justify-content: start;
    align-items: center;
    margin: 10px;
  }
  .id {
    color: #4610c0;
    font-weight: 800;
    font-size: 18px;
  }
  .date {
    color: #9b9b9b;
    font-size: 14px;
  }

  .콘텐츠줄임표 {
    font-size: 18px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    flex: 4;
  }

  .말줄임표없을때 {
    font-size: 18px;
    flex: 4;
    overflow: visible;
    display: block;
    -webkit-line-clamp: 0;
  }
  .morebtn {
    background-color: #fff;
    border: none;
  }
  .경과일 {
    color: red;
    flex: 1;
  }
  .material-symbols-outlined {
    // 구글 머터리얼 아이콘
    background-color: #fff;
    border: none;
  }
  .googlered {
    color: red;
    font-weight: bold;
  }
  .editDel {
    background-color: #fff;
    margin-left: 5px;
  }
`;

function CommunityListItem(props) {
  const navigate = useNavigate();

  const [more, setMore] = useState(false);
  const [comment, setComment] = useState(true);
  const [iconRed, setIconRed] = useState(false);
  const [like, setLike] = useState(props.like);
  const [communiyCotmmentNum, setCommunityCommentNum] = useState();

  const postId = props.postId;
  const userNic = props.userNic;
  const loginUserNic = useSelector(getLoginUser);
  const date = props.date;
  console.log(date);
  const date2 = new Date(date);

  useEffect(() => {
    const commentNum = async () => {
      const result = await axios.get(`${process.env.REACT_APP_ADDRESS}/community`);
      setCommunityCommentNum(result.data.commentNum);
    };
    commentNum();
  }, []);
  useEffect(() => {
    const test = async () => {
      try {
        const id = props.postId;
        await axios.patch(`${process.env.REACT_APP_ADDRESS}/community`, { like, id, iconRed });
      } catch (err) {
        console.error(err);
      }
    };
    test();
  }, [iconRed]);

  const test = communiyCotmmentNum?.filter((id) => {
    return id.commentPostId === postId;
  });

  function elapsedTime(date) {
    const start = new Date(date);
    const end = new Date();
    const diff = (end - start) / 1000;
    const times = [
      { name: "년", milliSeconds: 60 * 60 * 24 * 365 },
      { name: "개월", milliSeconds: 60 * 60 * 24 * 30 },
      { name: "일", milliSeconds: 60 * 60 * 24 },
      { name: "시간", milliSeconds: 60 * 60 },
      { name: "분", milliSeconds: 60 },
    ];
    for (const value of times) {
      const betweenTime = Math.floor(diff / value.milliSeconds);

      if (betweenTime > 0) {
        return `${betweenTime}${value.name} 전`;
      }
    }
    return "방금 전";
  }

  const handleMore = () => {
    // 더보기 함수
    setMore((more) => !more);
  };
  const handleLike = () => {
    // 좋아요 + 패치 함수
    if (loginUserNic) {
      setIconRed(!iconRed);
      setLike(Number(`${iconRed ? like - 1 : like + 1}`));
    } else {
      alert("로그인 시 사용 가능합니다.");
    }
  };
  const handleComment = () => {
    // 댓글창 함수
    setComment(!comment);
  };
  const handleDelete = async () => {
    // 게시글 삭제
    try {
      if (userNic === loginUserNic.userId) {
        await axios.post(`${process.env.REACT_APP_ADDRESS}/community/delete`, { postId });
      } else {
        alert("내가쓴 글만 삭제 가능!");
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleEdit = async () => {
    // 게시글 수정
    if (userNic === loginUserNic.userId) {
      navigate(`/CommunityEdit/${postId}`);
    } else {
      alert("내가쓴 글만 수정 가능!");
    }
  };

  return (
    <CommunityListItemWrapper>
      {
        <div className="div-between">
          <span className="id">{props.userNic}</span>
          <span className="date">
            {date2.getFullYear()}/{date2.getMonth() + 1}/{date2.getDate()}
          </span>
        </div>
      }

      {
        comment ? (
          <>
            {
              <div className="div-center">
                <img src={props.imagePath} alt="img" />
              </div>
            }

            {
              <div className="div-between">
                <span className={`콘텐츠줄임표 ${more ? "말줄임표없을때" : "콘텐츠줄임표"}`}>{props.content}</span>
                <button
                  className="morebtn"
                  type="button"
                  value={more}
                  onClick={() => {
                    handleMore();
                  }}
                >
                  {`${more ? "" : "더보기"}`}
                </button>
                <span className="경과일">{elapsedTime(date)}</span>
              </div>
            }
          </>
        ) : (
          <CommunityComment postId={props.postId} />
        ) // 댓글창
      }

      {
        <div className="div-between">
          {
            <div>
              <button
                className={`${iconRed ? "material-symbols-outlined googlered" : "material-symbols-outlined"}`}
                value={iconRed}
                onClick={handleLike}
              >
                favorite
              </button>
              <span>{like}</span> {/* 좋아요 수 */}
              <button
                className="material-symbols-outlined"
                value={comment}
                onClick={() => {
                  handleComment();
                }}
              >
                mode_comment
              </button>
              <span>{test?.length}</span> {/* 댓글 갯수 */}
            </div>
          }
          <form>
            <button
              className="editDel"
              onClick={() => {
                handleDelete();
              }}
            >
              🗑
            </button>
            <button
              className="editDel"
              onClick={() => {
                handleEdit();
              }}
            >
              🖌
            </button>
          </form>
        </div>
      }
    </CommunityListItemWrapper>
  );
}

export default CommunityListItem;
