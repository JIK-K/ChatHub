import React from "react";
import logo from "./img/스텀프.png";
import "./css/App.css";

function IdTextArea() {
  return (
    <div style={{ padding: "2px" }}>
      <textarea
        className="main-textarea"
        placeholder="ID" // 안내 텍스트 설정
      ></textarea>
    </div>
  );
}
function PasswordTextArea() {
  return (
    <div style={{ padding: "2px" }}>
      <textarea
        className="main-textarea"
        placeholder="PASSWORD" // 안내 텍스트 설정
      ></textarea>
    </div>
  );
}
function sibaltest() {
  console.log("sibalsex");
}
function LoginButton() {
  return (
    <button className="login-button" onClick={sibaltest}>
      Login
    </button>
  );
}
function RegisterButton() {
  return <button className="register-button">Register</button>;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="main-page">
          <div>
            <IdTextArea />
            <PasswordTextArea />
          </div>
        </div>

        <div className="button">
          <LoginButton />
          <RegisterButton />
        </div>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
