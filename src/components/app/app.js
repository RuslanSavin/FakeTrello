import React, { useState } from "react";
import "./app.scss";
import { LoginPage, RegisterPage, TrelloPage } from "../pages";
import { Navigate, Route, Routes } from "react-router-dom";
import { getToken } from "../../utils/local-storage";

const App = () => {
  const [auth, setAuth] = useState(getToken());

  if (auth) {
    return (
      <>
        <Routes>
          <Route path="/board" element={<TrelloPage />} />
          <Route path="*" element={<Navigate to="/board" />} />
        </Routes>
      </>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage setAuth={setAuth} />} />
        <Route path="/register" element={<RegisterPage setAuth={setAuth} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
