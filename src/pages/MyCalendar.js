import React, { Component, useEffect } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from '@fullcalendar/react';
import styled from "styled-components";
import { useState } from "react";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllCalendarInfo, getMyCalendarInfo } from "../features/useinfo/userInfoSlice";
import { useNavigate } from "react-router-dom";

const CalendarWrapper = styled.div`
  width: 530px;
  height: 100vh;
  background: #fff;
  
  
  th a {
    color: #fff;
    text-decoration: none;
    font-weight: bold;
  }
  td a {
    text-decoration: none;
    color: black;
  }
  .fc-theme-standard td {
    border: 1px solid #5e0afd3b;
  }
  .fc-event {
    background-color: #4610C0;
    border: none;
    border-radius: 15px;
    padding: 1px 5px;
    font-size: 12px;
    font-weight: bold;
  }
  .fc-button {
    background-color: #4610C0;
    border: none;
    border-radius: 10px;
  }
  .fc-button:hover {
    background-color: #5E0AFD;
  }
  .fc-header-toolbar {
    margin-top: 24px;
  }
  .fc-toolbar-title {
    background-color: #4610C0;
    color: #fff;
    padding: 5px;
    border-radius: 10px;
  }
  .fc-col-header {
    background-color: #4610C0;
    color: #fff;
  }

  .fc-day-sun div.fc-daygrid-day-frame.fc-scrollgrid-sync-inner { background-color: #ffe5e3; }
  .fc-day-sat div.fc-daygrid-day-frame.fc-scrollgrid-sync-inner { background-color: #ffe5e3; }
  td.fc-day.fc-day-sat.fc-day-future.fc-daygrid-day a{ color: red;}
  td.fc-day.fc-day-sat.fc-day-past.fc-daygrid-day a{ color: red;}
  td.fc-day.fc-day-sun.fc-day-future.fc-daygrid-day a{ color: red;}
  td.fc-day.fc-day-sun.fc-day-past.fc-daygrid-day a{ color: red;}

  
  `;

const InputArea = styled.div`
  padding: 50px;
  background: #4610C0;
  border-radius: 15px;
  position: relative;

  button {
    cursor: pointer;
    border: 2px solid #fff;
    border-radius: 15px;
    padding: 5px 13px;
    background: #FFF;
    font-weight: bold;
    position: absolute;
    right: 50px;
    transition: 0.3s;
  }
  button:hover {
    background: #FF5959;
    border: 2px solid #FF5959;
    color: #FFF;
  }
`;
const InputH4 = styled.p`
  color: #fff;
  margin-bottom: 5px;
  font-weight: bold;
`;
const InputAreaDetail = styled.div`

  & + & {
    margin-top: 10px;
  }
  input[type="date"] {
    text-align: center;
    width: auto;
  }
  input {
    width: 350px;
    padding: 5px 10px;
    color: black;
    background: #FFF;
    outline: none;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    transition: 0.3s;
  }
  input:focus {
    color: #FFF;
    background: #8169b8;
  }

`;

function MyCalendar(props) {
  const [todo, setTodo] = useState('');
  const [inputStartDate, setInputStartDate] = useState('');
  const [inputEndDate, setInputEndDate] = useState('');
  const [list, setList] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const calendarList = useSelector(getMyCalendarInfo);
  
  useEffect(() => {
    axios.get(`http://localhost:3000/myCalendar`)
    .then(response => {
      console.log(response.data);
      dispatch(getAllCalendarInfo(response.data))
    })
    .catch(error => console.error(error))
  }, [setInputEndDate]);

  
  
  const handletodo = (e) => {
    setTodo(e.target.value)
  };
  const handleinputStartDate = (e) => {
    setInputStartDate(e.target.value)
  };
  const handleInputEndDate = (e) => {
    // if (inputStartDate > inputEndDate) {
    //   alert('정확한 날짜를 입력해주세요!')
    //   return
    // } else {
    // }
    setInputEndDate(e.target.value)
  };


  const data = { title: todo, start: inputStartDate, end: inputEndDate, backgroundColor: "#008000" }

  // const handlePush = (data) => {
  //   axios.post(`http://localhost:3000/myCalendar`, data)
  //   setInputEndDate('')
  // }
  const handlePush = (list) => {
    const copyList = [...list]
    copyList.push({title: todo, start: inputStartDate, end: inputEndDate});
    
    setList(copyList)
    setTodo('')
    setInputStartDate('')
    setInputEndDate('')
  }
  if (!calendarList) {
    return null;
  }

  return (
    <>
      <CalendarWrapper>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, googleCalendarPlugin]}
          initialView="dayGridMonth"
          dayMaxEvents={true}
          events={calendarList}
          height={'550px'}
          width={'500px'}
          editable={false}
          locale='ko'
          googleCalendarApiKey="AIzaSyBKjGhLK_Xjl8DgqkIMLiWIzGdPrivNWM4"
          eventSources={[
            {
              googleCalendarId : "ko.south_korea#holiday@group.v.calendar.google.com", 
              color: 'red', 
              textColor: 'white'
            }
          ]}
          dayCellContent= {function (info) {
            let number = document.createElement("a");
            number.classList.add("fc-daygrid-day-number");
            number.innerHTML = info.dayNumberText.replace("일", "");
            if (info.view.type === "dayGridMonth") {
              return {
                html: number.outerHTML
              };
            }
            return {
              domNodes: []
            }
          }}

        />
        
        <InputArea>
          <InputAreaDetail>
            <InputH4>
              추가할 일정
            </InputH4>
            <input type="text" value={todo} onChange={handletodo}/>
          </InputAreaDetail>
          <InputAreaDetail>
            <InputH4>
              시작할 날짜
            </InputH4>
            <input type="date" value={inputStartDate} onChange={handleinputStartDate}/>
          </InputAreaDetail>
          <InputAreaDetail>
            <InputH4>
              끝낼 날짜
            </InputH4>
            <input type="date" value={inputEndDate} onChange={handleInputEndDate}/>
          </InputAreaDetail>
          <button onClick={() => handlePush(list)}>
            일정 추가하기
          </button>
        </InputArea>
      </CalendarWrapper>
    </>
  );
}

export default MyCalendar;