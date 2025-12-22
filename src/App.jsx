import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register.jsx";
import Survey from "./components/Survey.jsx";
import './App.css';
import Calendar from "./components/Calendar.jsx";
import Login from "./components/Login.jsx";
import Dashboard from "./components/dashboard.jsx";

export default function App() {
  
  return (
    <>
    <Router>
      <Routes>
        <Route path="/regsiter" element={<Register />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}/>
      </Routes>
    </Router>
    </>
  )
}