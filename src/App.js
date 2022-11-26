import React from "react";
import { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.js";
// import axios from "axios";
// import GOOGLE_API_KEY from "./Constants";
import RegisterLogin from "./components/RegisterLogin.js";
import Home from "./components/Home.js";

export const AppContext = createContext(null);

function App() {
  // constructor() {
  //   super();
  //   this.state = {
  //     books: [],
  //   };
  // }
  // componentDidMount() {
  //   axios
  //     .get(
  //       `https://www.googleapis.com/books/v1/volumes?q=pride+prejudice&key=${GOOGLE_API_KEY}`
  //     )
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // }
  const [accessToken, setAccessToken] =
    useState("");
  return (
    <AppContext.Provider
      value={{ accessToken, setAccessToken }}
    >
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <RegisterLogin title="Login" />
            }
          />
          <Route
            path="/register"
            element={
              <RegisterLogin title="Register" />
            }
          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
