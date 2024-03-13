import React, { useState, useEffect } from "react";
import "./App.css";
import "./AvailableGames.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Accordion from "react-bootstrap/Accordion";
import Pagination from "react-bootstrap/Pagination";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import { MdArrowCircleLeft } from "react-icons/md";
import { MdArrowCircleRight } from "react-icons/md";
import Modal from "react-bootstrap/Modal";
import backgroundImage from "../src/Images/249531.jpeg";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";

function Avilablegame() {
  const [data, setData] = useState({});
  const [show, setShow] = useState(false);
  // const [active, setActive] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedDiscountprice, setSelectedDiscountprice] = useState("");
  const [selectedDiscount, setSelectedDiscount] = useState("");
  const [selectedImgurl, setSelectedImgurl] = useState("");

  const handleBadgeTitle = (
    gametitle,
    price,
    discountprice,
    discount,
    imgUrl
  ) => {
    setShow(true);
    setSelectedTitle(gametitle);
    setSelectedPrice(price);
    setSelectedDiscountprice(discountprice);
    setSelectedDiscount(discount);
    setSelectedImgurl(imgUrl);
  };

  function handlePageChange(page) {
    setCurrentPage(page);
    console.log(page);
  }

  useEffect(() => {
    fetch(`http://localhost:2001/avgames/list/${currentPage - 1}/8`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [currentPage]);
  const styles = {
    container: {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      height: "auto",
      // width: "100%",
    },
  };

  return (
    <div style={styles.container}>
      <Container>
        <Navbar
          variant="dark"
          expand="lg"
          className="d-flex align-items-center mb-3 border"
          style={{
            borderRadius: "60px",
            height: "auto",
            background:'transparent',
            backdropFilter:'blur(10px)',
          }} // Add style for rounded edges
        >
          <Container>
            <Navbar.Brand
              href="#home"
              className="text-lg-start ms-auto me-auto me-lg-0"
              style={{ fontFamily: "cursive" }}
            >
              <Nav.Link className="text-light" href="/">
                GameMania
              </Nav.Link>
            </Navbar.Brand>

            <div className="ms-auto me-auto me-lg-0">
              <Form className="d-flex mb-2 mb-lg-0">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2 bg-transparent text-light"
                  aria-label="Search"
                />
                <Button variant="outline-light">
                  <i className="bi bi-search-heart"></i>
                </Button>
              </Form>
            </div>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav" className="justify-content-lg-end">
              <Nav>
                <div className="d-flex justify-content-around">
                  <Nav.Link className="text-light" href="/loginform">
                    <i className="bi bi-person-circle fs-3"></i>
                  </Nav.Link>
                  <Nav.Link className="text-light" href="/registerform">
                    <i className="bi bi-person-fill-add fs-3"></i>
                  </Nav.Link>
                </div>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
      <div className="container-fluid overflow-hidden">
        <div className="row ms-4 me-4 g-4 mt-4 mb-5" style={{ height: "auto" }}>
          <div>
            <Container className="d-flex justify-content-between align-items-center">
              <div
                style={{ fontFamily: "cursive" }}
                className="fs-4 text-light"
              >
                Featured Games
              </div>
              {/* <div> */}
              <Pagination className="mt-4">
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <MdArrowCircleLeft className="text-dark fs-4" />
                </Pagination.Prev>
                <Pagination.Next
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === 11}
                >
                  <MdArrowCircleRight className="text-dark fs-4" />
                </Pagination.Next>
              </Pagination>
              {/* </div> */}
            </Container>
          </div>
          <div className="fs-2 mb-4 mt-3 row d-flex justify-content-center"></div>
          {Array.isArray(data) &&
            data.slice(0, 101).map((arr) => (
              <div className="col" key={arr.agid}>
                <Card style={{ width: "18rem" }} className="bg-transparent">
                  <Card.Img
                    variant="top"
                    src={ "http://localhost:2001/uploads/" + arr.imgUrl}
                    style={{ height: "400px" }}
                  />
                  <Card.Body className="bg-transparent">
                    <div
                      className="accordion-container"
                      style={{ backgroundColor: "transparent" }}
                    >
                      <Accordion style={{ borderRadius: "50%" }}>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>
                            <Button variant="outline-dark">
                              <Card.Title
                                className=""
                                style={{
                                  fontFamily: "cursive",
                                }}
                              >
                                {arr.gametitle}
                              </Card.Title>
                            </Button>
                          </Accordion.Header>
                          <Accordion.Body>
                            <ListGroup className="list-group-flush">
                              <ListGroup.Item>
                                <Stack direction="horizontal" gap={2}>
                                  <Badge bg="secondary">Price :</Badge>
                                  <Badge bg="secondary">{arr.price}</Badge>
                                </Stack>
                              </ListGroup.Item>
                              <ListGroup.Item>
                                <Stack direction="horizontal" gap={2}>
                                  <Badge bg="secondary">DiscountPrice :</Badge>
                                  <Badge bg="secondary">
                                    {arr.discountprice}
                                  </Badge>
                                </Stack>
                              </ListGroup.Item>
                              <ListGroup.Item>
                                <Stack direction="horizontal" gap={2}>
                                  <Badge bg="secondary">Discount :</Badge>
                                  <Badge bg="secondary">{arr.discount}</Badge>
                                </Stack>
                              </ListGroup.Item>
                            </ListGroup>
                            <Card.Body className="d-flex">
                              <Card.Link
                                href="#"
                                style={{ textDecoration: "none" }}
                              >
                                <Stack direction="horizontal" gap={2}>
                                  <Badge pill bg="primary">
                                    Get
                                  </Badge>
                                </Stack>
                              </Card.Link>
                              <Card.Link
                                href="#"
                                style={{ textDecoration: "none" }}
                              >
                                <Stack direction="horizontal" gap={2}>
                                  <Badge
                                    pill
                                    variant="primary"
                                    onClick={() =>
                                      handleBadgeTitle(
                                        arr.gametitle,
                                        arr.price,
                                        arr.discountprice,
                                        arr.discount,
                                        arr.imgUrl
                                      )
                                    }
                                  >
                                    Quick Look
                                  </Badge>
                                  <Modal
                                    size="xl"
                                    centered
                                    show={show}
                                    onHide={() => setShow(false)}
                                    style={{
                                      backgroundImage: `url(${backgroundImage})`,
                                      backgroundRepeat: "no-repeat",
                                      backgroundPosition: "center",
                                      backgroundSize: "cover",
                                    }}
                                  >
                                    <Modal.Header closeButton>
                                      <Modal.Title id="example-custom-modal-styling-title">
                                        {selectedTitle}
                                        {/* {selectedImgurl} */}
                                      </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body
                                      style={{
                                        backgroundImage: `url(${selectedImgurl})`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center",
                                        backgroundSize: "cover",
                                        height: "100%",
                                      }}
                                    >
                                      <p>{selectedDiscount}</p>
                                      <p>{selectedDiscountprice}</p>
                                      <p>{selectedPrice}</p>
                                    </Modal.Body>
                                  </Modal>
                                </Stack>
                              </Card.Link>
                            </Card.Body>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Avilablegame;
