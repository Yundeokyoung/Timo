import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register.jsx";
import Survey from "./components/Survey.jsx";
import './App.css';

export default function App() {
  
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/survey" element={<Survey />} />
      </Routes>
    </Router>
    </>
  )
}