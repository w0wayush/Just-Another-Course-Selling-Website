import React from "react";
import "./App.css";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Signin from "./components/Signin";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddCourse from "./components/AddCourse";
import HomePage from "./components/HomePage";
import Courses from "./components/Courses";
import Course from "./components/Course";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

function App() {
  return (
    <div
      style={{ width: "100vw", height: "100vh", backgroundColor: "#eeeeee" }}
    >
      <RecoilRoot>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/addcourse" element={<AddCourse />} />
            <Route path="/courses/:courseId" element={<Course />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Router>
      </RecoilRoot>
    </div>
  );
}

export default App;
