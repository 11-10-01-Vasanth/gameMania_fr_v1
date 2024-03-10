import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterForm from "./RegisterForm.jsx";
import LoginForm from "./LoginForm.jsx";
import Avilablegame from "./AvailableGames.jsx";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";

function App() {
  return (
    <div style={{ backgroundColor:"#ecf0f1"}}>
      <Container>
        <Navbar
          variant="dark"
          expand="lg"
          className="d-flex align-items-center mb-3"
          style={{
            borderRadius: "60px",
            backgroundColor: "#bdc3c7",
            height: "auto",
          }} // Add style for rounded edges
        >
          <Container>
            <Navbar.Brand
              href="#home"
              className="text-lg-start ms-auto me-auto me-lg-0"
              style={{ fontFamily: "cursive" }}
            >
              <Nav.Link className="text-black" href="/">
                GameMania
              </Nav.Link>
            </Navbar.Brand>

            <div className="ms-auto me-auto me-lg-0">
              <Form className="d-flex mb-2 mb-lg-0">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2 bg-transparent"
                  aria-label="Search"
                />
                <Button variant="outline-dark">
                  <i className="bi bi-search-heart"></i>
                </Button>
              </Form>
            </div>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav" className="justify-content-lg-end">
              <Nav>
                <div className="d-flex justify-content-around">
                  <Nav.Link className="text-dark" href="/loginform">
                    <i className="bi bi-person-circle fs-3"></i>
                  </Nav.Link>
                  <Nav.Link className="text-dark" href="/registerform">
                    <i className="bi bi-person-fill-add fs-3"></i>
                  </Nav.Link>
                </div>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>

      <BrowserRouter>
        <Routes>
          <Route path="/registerform" element={<RegisterForm />}></Route>
          <Route path="/loginform" element={<LoginForm />}></Route>
          <Route path="/" element={<Avilablegame />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
