import React, { useState, useEffect } from "react";
import "./App.css";
import "./AvailableGames.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Accordion from "react-bootstrap/Accordion";
import Pagination from "react-bootstrap/Pagination";
import backgroundImage from "../src/Images/249531.jpeg";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";

function Avilablegame() {
  // const styles = {
  //   container: {
  //     backgroundImage: `url(${backgroundImage})`,
  //     backgroundSize: "cover",
  //     backgroundPosition: "center",
  //     backgroundRepeat: "no-repeat",
  //     height: "100vh",
  //     // width: "100%",
  //   },
  // };

  const [data, setData] = useState({});
  // const [a, setA] = useState(0);
  // const [active, setActive] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);

  function handlePageChange(page) {
    setCurrentPage(page);
    console.log(page, "page");
  }

  // useEffect(() => {
  //   return () => {
  //     fetch("http://localhost:2001/avgames/getAllGameData")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setData(data);
  //         console.log(data);
  //         return data;
  //       });
  //   };
  // }, []);

  useEffect(() => {
    return () => {
      fetch(`http://localhost:2001/avgames/list/${currentPage - 1}/8`)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          console.log(data);
          return data;
        });
    };
  }, [currentPage]);

  return (
    <div>
      <div className="container-fluid overflow-hidden">
        <div
          className="row ms-5 g-4 mt-4"
          style={{ backgroundColor: "#ecf0f1", height: "auto" }}
        >
          {Array.isArray(data) &&
            data.slice(0, 101).map((arr) => (
              <div className="col" key={arr.agid}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    src={arr.imgUrl}
                    style={{ height: "300px" }}
                  />
                  <Card.Body>
                    <Accordion flush>
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>
                          <Button variant="outline-dark">
                            <Card.Title
                              className="text-center"
                              style={{
                                fontFamily: "fantasy",
                              }}
                            >
                              {arr.gametitle}
                            </Card.Title>
                          </Button>
                        </Accordion.Header>
                        <Accordion.Body>
                          <ListGroup className="list-group-flush">
                            <ListGroup.Item>{arr.price}</ListGroup.Item>
                            <ListGroup.Item>{arr.discountprice}</ListGroup.Item>
                            <ListGroup.Item>{arr.discount}</ListGroup.Item>
                          </ListGroup>
                          <Card.Body>
                            <Card.Link
                              href="#"
                              style={{ textDecoration: "none" }}
                            >
                              Get
                            </Card.Link>
                            <Card.Link
                              href="#"
                              style={{ textDecoration: "none" }}
                            >
                              Quick Look
                            </Card.Link>
                          </Card.Body>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Card.Body>
                </Card>
              </div>
            ))}
        </div>
      </div>
      <div>
        <div>
          <Pagination>
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {currentPage > 2 && (
              <Pagination.Item
                onClick={() => handlePageChange(currentPage - 1)}
              >
                {currentPage - 1}
              </Pagination.Item>
            )}
            <Pagination.Item active>{currentPage}</Pagination.Item>
            {currentPage < 9 && (
              <Pagination.Item
                onClick={() => handlePageChange(currentPage + 1)}
              >
                {currentPage + 1}
              </Pagination.Item>
            )}
            {currentPage < 8 && <Pagination.Ellipsis />}
            <Pagination.Item
              onClick={() => handlePageChange(10)}
              active={currentPage === 10}
            >
              {10}
            </Pagination.Item>
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === 10}
            />
          </Pagination>
        </div>
      </div>
    </div>
  );
}

export default Avilablegame;
