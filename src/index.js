import React from "react";
import ReactDOM from "react-dom/client";
import "./font.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./app/store";
import axios from "axios";
import { getLoginUser, getLoginUserInfo } from "./features/useinfo/userInfoSlice";

const root = ReactDOM.createRoot(document.getElementById("root"));

const loginUser = async () => {
  const result = await axios.get(`${process.env.REACT_APP_ADDRESS}/user/loginUser`, { withCredentials: true });
  store.dispatch(getLoginUserInfo(result.data.data));
};
loginUser();

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
