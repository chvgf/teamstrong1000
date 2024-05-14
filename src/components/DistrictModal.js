import React from "react";
import styled, { css } from "styled-components";

const ModalWrapper = styled.div`
  width: 100%;
  margin-bottom: 22px;
`;

const DistrictBtn = styled.button`
  width: 80px;
  height: 24px;
  outline: none;
  border: 2px solid #4610c0;
  border-radius: 15px;
  background: white;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #4610c0;
    color: white;
    font-weight: bold;
  }
  ${(props) =>
    props.$district &&
    css`
      background: #4610c0;
      color: white;
    `}
  ${(props) =>
    props.$district2 &&
    css`
      background: #4610c0;
      color: white;
    `}
  ${(props) =>
    props.$district3 &&
    css`
      background: #4610c0;
      color: white;
    `}
`;

function DistrictModal(props) {
  const { district, district2, district3, handleDistrict0, handleDistrict, handleDistrict2, handleDistrict3 } = props;

  return (
    <ModalWrapper>
      <DistrictBtn onClick={handleDistrict0}>전체</DistrictBtn>
      <DistrictBtn $district={district} onClick={handleDistrict}>
        서울
      </DistrictBtn>
      <DistrictBtn $district2={district2} onClick={handleDistrict2}>
        경기
      </DistrictBtn>
      <DistrictBtn $district3={district3} onClick={handleDistrict3}>
        인천
      </DistrictBtn>
    </ModalWrapper>
  );
}

export default DistrictModal;
