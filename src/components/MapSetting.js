import React from "react";
import { Container as MapDiv, NaverMap, useNavermaps, InfoWindow, Marker, Overlay } from "react-naver-maps";
import axios, { Axios } from "axios";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

const ATag = styled.a`
  z-index: 100;
  overflow: hidden;
  display: inline-block;
  position: absolute;
  top: 7px;
  left: 5px;
  width: 34px;
  height: 34px;
  border: 1px solid rgba(58, 70, 88, 0.45);
  border-radius: 2px;
  background: #fcfcfd;
  background-clip: border-box;
  text-align: center;
  -webkit-background-clip: padding;
  background-clip: padding-box;
`;
const SpanTag = styled.span`
  overflow: hidden;
  display: inline-block;
  color: transparent !important;
  vertical-align: top;
  background: url(https://ssl.pstatic.net/static/maps/m/spr_trff_v6.png) 0 0;
  background-position-x: 0px;
  background-position-y: 0px;
  background-size: auto;
  background-size: 200px 200px;
  -webkit-background-size: 200px 200px;
  width: 20px;
  height: 20px;
  margin: 7px 0 0 0;
  background-position: -153px -31px;
`;

function MapSetting(props) {
  const navermaps = useNavermaps();

  const [map, setMap] = useState(null);
  const [infowindow, setInfoWindow] = useState(null);

  const [myData, setMyData] = useState([]);

  const [state, setState] = useState(false);

  function onSuccessGeolocation(position) {
    if (!map || !infowindow) return;

    const location = new navermaps.LatLng(position.coords.latitude, position.coords.longitude);
    map.setCenter(location);
    map.setZoom(15);
    infowindow.setContent('<div style="padding:10px; ">' + "현재 위치" + "</div>");

    infowindow.open(map, location);
    console.log("Coordinates: " + location.toString());
  }

  function onErrorGeolocation() {
    if (!map || !infowindow) return;

    const center = map.getCenter();
    infowindow.setContent(
      '<div style="padding:20px;">' +
        '<h5 style="margin-bottom:5px;color:#f00;">Geolocation failed!</h5>' +
        "latitude: " +
        center.lat() +
        "<br />longitude: " +
        center.lng() +
        "</div>"
    );
    infowindow.open(map, center);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccessGeolocation, onErrorGeolocation);
    } else {
      const center = map.getCenter();
      infowindow.setContent('<div style="padding:20px;"><h5 style="margin-bottom:5px;color:#f00;">Geolocation not supported</h5></div>');
      infowindow.open(map, center);
    }
  }

  useEffect(() => {
    if (!map || !infowindow) {
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccessGeolocation, onErrorGeolocation, handleMyPosition);
    } else {
      var center = map.getCenter();
      infowindow.setContent('<div style="padding:20px;"><h5 style="margin-bottom:5px;color:#f00;">Geolocation not supported</h5></div>');
      infowindow.open(map, center);
    }
  }, [map, infowindow]);

  useEffect(() => {
    axios
      .get(
        `https://api.odcloud.kr/api/15089659/v1/uddi:9b78da91-c003-47c0-a828-f370fa41b851?page=1&perPage=10&serviceKey=uG0rKc%2FJoy2c7uhPdzA0IIpgiNXPmz%2FN6BGDt%2BAEQ4p8meKwkp1xbZjMD90IIzxIiGF86lRhsMXXm3Wb9ArPwQ%3D%3D`
      )
      .then((response) => {
        console.log(response);
        setMyData(response.data.data);
        // console.log(mydata); // axios 라이브러리 JSON -> 객체로 변환해 주는 작업을 자동으로 해줌
      })
      .catch((error) => {
        // 요청 실패한 경우 에러 핸들링
        console.log(error);
      });
  }, []);

  const handleOnClick = (latitude, longitude) => {
    const ok = myData.find((lo) => lo.위도 === latitude && lo.경도 === longitude);
    const location = new navermaps.LatLng(ok.위도, ok.경도);
    infowindow.setContent(`
      <div>${ok.체육시설명}</div>
      <div>${ok.주소}</div>
    `);
    infowindow.open(map, location);
    map.setCenter(location);
  };

  const handleMyPosition = () => {};

  return (
    <NaverMap
      // uncontrolled
      defaultCenter={new navermaps.LatLng(37.5666805, 126.9784147)}
      defaultZoom={10}
      defaultMapTypeId={navermaps.MapTypeId.NORMAL}
      ref={setMap}
    >
      <InfoWindow ref={setInfoWindow} />

      {/* 마커 표시 */}
      {myData.map((el) => (
        <Marker key={el.배드민턴장} position={new navermaps.LatLng(el.위도, el.경도)} onClick={() => handleOnClick(el.위도, el.경도)} />
      ))}
      <ATag onClick={handleMyPosition}>
        <SpanTag>NAVER 그린팩토리</SpanTag>
      </ATag>
    </NaverMap>
  );
}

export default MapSetting;
