import "./styles/main.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Course from "./components/Course";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "../auth/Register";
import Login from "../auth/Login";
import ForgotPass from "../auth/forgotPass";
import AddSection from "./components/forms/AddSection";
import AddCourse from "./components/forms/AddCourse";
import EditSection from "./components/forms/EditSection";
import EditChapter from "./components/forms/EditChapter";
import UpdateCourse from "./components/forms/UpdateCourse";
function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course/:id" element={<Course />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPass />} />
          <Route path="/add-course" element={<AddCourse />} />
          <Route path="/update-course/:id" element={<UpdateCourse />} />
          <Route path="/add-section/:id" element={<AddSection />} />
          <Route path="/edit-section/:id" element={<EditSection />} />
          <Route path="/edit-chapter/:id" element={<EditChapter />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
