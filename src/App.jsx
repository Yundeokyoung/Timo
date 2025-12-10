import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register.jsx";
import Survey from "./components/Survey.jsx";
import './App.css';
import Calendar from "./components/Calendar.jsx";

export default function App() {
  
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/Calendar" element={<Calendar/>} />
      </Routes>
    </Router>
    </>
  )
}