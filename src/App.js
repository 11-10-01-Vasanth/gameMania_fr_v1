import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterForm from "./RegisterForm.jsx";
import LoginForm from "./LoginForm.jsx";
import Avilablegame from "./AvailableGames.jsx";
import Admin from "./Admin.jsx";
import Button from "react-bootstrap/Button";
import backgroundImage from "../src/Images/249531.jpeg";
import { Container, Row, Col } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/registerform" element={<RegisterForm />}></Route>
          <Route path="/loginform" element={<LoginForm />}></Route>
          <Route path="/" element={<Avilablegame />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
