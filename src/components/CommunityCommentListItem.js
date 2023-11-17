import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

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
`;

function CommunityCommentListItem(props) {

  return (
    <CommunityCommentListItemWrapper>
        {<span className='a'>{props.text}</span>}
        {<span className='b'>작성자:junwoo</span>}
    </CommunityCommentListItemWrapper>
  );
}

export default CommunityCommentListItem;