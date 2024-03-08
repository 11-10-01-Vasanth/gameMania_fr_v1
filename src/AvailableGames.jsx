import React, { useState, useEffect } from "react";
import "./App.css";
import "./AvailableGames.css";
import backgroundImage from "../src/Images/249531.jpeg";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";

function Avilablegame() {
  const styles = {
    container: {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      height: "100vh",
      width: "100%",
    },
  };


  const [data, setData] = useState({});

  useEffect(() => {
    return () => {
      fetch("http://localhost:2001/avgames/getAllGameData")
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          console.log(data);
          return data;
        });
    };
  }, []);



  return (
    <div>
      <div style={styles.container}>
        <Navbar
          bg="transparent"
          variant="dark"
          expand="lg"
          className="justify-content-center border border-2"
        >
          <Container>
            <Navbar.Brand
              href="#home"
              className="text-warning text-center text-lg-start ms-auto me-auto me-lg-0"
              style={{ fontFamily: "cursive" }}
            >
              GameMania
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse
              id="navbar-nav"
              className="justify-content-between justify-content-lg-end"
            >
              <Form className="d-flex mb-2 mb-lg-0">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2 bg-transparent"
                  aria-label="Search"
                />
                <Button variant="outline-warning">
                  <i className="bi bi-search-heart"></i>
                </Button>
              </Form>
              <Nav className="ms-lg-auto">
                <Nav.Link className="text-warning" href="/loginform">
                  <i className="bi bi-person-circle fs-3"></i>
                </Nav.Link>
                <Nav.Link className="text-warning" href="/registerform">
                  <i className="bi bi-person-fill-add fs-3"></i>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

      </div>
    </div>
  );
}

export default Avilablegame;
