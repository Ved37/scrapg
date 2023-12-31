import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ConfigProvider } from "antd";
import {Provider} from "react-redux";
import store from "./redux/store";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider
      store={store}
    >
      <ConfigProvider theme={{
        components: {
          Button: {
            colorPrimary: '#4A9CBF',
            colorPrimaryHover: '#176B87',
            borderRadius: '2px'
          }
        },
        token:{ //in antd token means for the whole project
          borderRadius:'2px',
          colorPrimary: '#4A9CBF'
        }
      }}>
        <App />
      </ConfigProvider>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
