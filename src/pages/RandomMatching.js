import axios from "axios";
import React from "react";

function RandomMatching(props) {
  const handleRandom = async () => {
    await axios.post(`${process.env.REACT_APP_ADDRESS}/RandomMatching`, "뭐지이거", { withCredentials: true });
  };

  return <button onClick={handleRandom}>랜덤매칭 시작</button>;
}

export default RandomMatching;
