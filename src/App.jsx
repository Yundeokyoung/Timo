import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register -.jsx";
import Survey from "./components/Survey.jsx";
import "./App.css";
import Calendar from "./components/Calendar.jsx";
import Login from "./components/Login.jsx";
import Feedback from "./components/Feedback.jsx";
import Personal_information from "./components/Personal_information.jsx";

export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/" element={<Login />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/personal_information" element={<Personal_information />} />
      </Routes>
    </Router>
  );
}