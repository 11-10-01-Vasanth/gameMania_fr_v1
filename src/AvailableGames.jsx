import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useCookies } from "react-cookie";
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
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import backgroundImage from "../src/Images/249531.jpeg";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Carousel from "react-bootstrap/Carousel";
import NavDropdown from "react-bootstrap/NavDropdown";
import LoginForm from "./LoginForm.jsx";

function Avilablegame() {
  const [data, setData] = useState({});
  const [carouseldata, setcarouselData] = useState([{}]);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [pagedata, setpageData] = useState({});
  const [show, setShow] = useState(false);
  // const [active, setActive] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentPa, setCurrentPa] = useState(1);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedDiscountprice, setSelectedDiscountprice] = useState("");
  const [selectedDiscount, setSelectedDiscount] = useState("");
  const [selectedImgurl, setSelectedImgurl] = useState("");
  const [cookieValue, setCookieValue] = useState(null);

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

  function handlePaChange(page) {
    setCurrentPa(page);
    console.log(page);
  }

  const getCookie = (name) => {
    const cookieString = document.cookie;
    const cookies = cookieString.split("; ");
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  };

  const [cookies] = useCookies(["JSESSIONID"]);
  const myCookieValue = cookies["JSESSIONID"];
  useEffect(
    () => {
      Cookies.set("myCookieKey", myCookieValue);
      // console.log(Cookies.get('myCookieKey'));
      // const sessionId = getCookie('JSESSIONID');
      // setCookieValue(sessionId);
      // console.log(cookieValue,"cookie");
      // function simulateNetworkRequest() {
      //   return new Promise((resolve) => setTimeout(resolve, 2000));
      // }

      // const tokenResponse = localStorage.getItem("authToken");
      // console.log(tokenResponse);
      // if (tokenResponse) {

      fetch(`http://localhost:2001/avgames/list/${currentPage - 1}/4`)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });

      fetch("http://localhost:2001/avgames/getAllImagestoredata")
        .then((response) => response.json())
        .then((data) => {
          setcarouselData(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });

      fetch(`http://localhost:2001/avgames/list/${currentPa - 1}/4`)
        .then((response) => response.json())
        .then((data) => {
          setpageData(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
      // } else {
      //   navigate("/loginform");
      // }
    },
    [currentPage, currentPa],
    []
  );

  const styles = {
    container: {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      height: "100%",
      // width: "100%",
    },
  };

  return (
    <div style={styles.container} className="pt-1">
      <div>
        <Container className="mt-5">
          <Navbar
            expand="lg"
            className="d-flex align-items-center mb-3 border p-3"
            variant="dark"
            style={{
              borderRadius: "50px",
              height: "auto",
              background: "transparent",
            }}
          >
            <Container fluid>
              <Navbar.Brand
                href="#home"
                className="text-lg-start ms-auto me-auto me-lg-0"
                style={{ fontFamily: "cursive" }}
              >
                <Nav.Link className="text-light" href="/">
                  GameMania
                </Nav.Link>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className="me-auto my-2 my-lg-0"
                  style={{ maxHeight: "100px" }}
                  navbarScroll
                >
                  <Nav.Link href="#action1">Home</Nav.Link>
                  <Nav.Link href="#action2">Link</Nav.Link>
                  <NavDropdown title="Link" id="navbarScrollingDropdown">
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <div className="ms-auto me-auto me-lg-0">
                  <Form className="d-flex mb-2 mb-lg-0">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2 bg-transparent text-light"
                      aria-label="Search"
                    />
                    <div></div>
                    <Button variant="outline-light">
                      <i className="bi bi-search-heart"></i>
                    </Button>
                  </Form>
                </div>
                <Nav>
                  <div className="d-flex justify-content-around">
                    <Nav.Link className="text-light" href="/loginform">
                      <i className="bi bi-person-circle fs-3"></i>
                    </Nav.Link>
                  </div>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Container>
      </div>

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
                  disabled={currentPage === 3}
                >
                  <MdArrowCircleRight className="text-dark fs-4" />
                </Pagination.Next>
              </Pagination>
              {/* </div> */}
            </Container>
          </div>
          {Array.isArray(data) &&
            data.slice(0, 101).map((arr) => (
              <div className="col" key={arr.agid}>
                <Card style={{ width: "18rem" }} className="bg-transparent">
                  <Card.Img
                    variant="top"
                    src={"http://localhost:2001/uploads/" + arr.imgUrl}
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
                                      </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                      <div className="row d-flex">
                                        <div className="col">
                                          <img
                                            src={
                                              "http://localhost:2001/uploads/" +
                                              selectedImgurl
                                            }
                                            alt=""
                                            height={"250px"}
                                            width={"500px"}
                                            style={{
                                              backgroundRepeat: "no-repeat",
                                              backgroundPosition: "center",
                                              backgroundSize: "cover",
                                            }}
                                          />
                                        </div>
                                        <div className="col d-grid">
                                          {/* <div
                                            style={{ fontFamily: "cursive" }}
                                            className=""
                                          >
                                            {selectedTitle}
                                          </div> */}
                                          <div className="d-flex justify-content-around">
                                            <div>
                                              MicroSoft Studios - Racing &
                                              flying{" "}
                                            </div>
                                            <div className="text-warning">
                                              <i className="bi bi-star"></i>
                                              <i className="bi bi-star"></i>
                                              <i className="bi bi-star"></i>
                                              <i className="bi bi-star"></i>
                                            </div>
                                            <div>
                                              <i className="bi bi-currency-rupee"></i>
                                              {selectedDiscountprice}
                                            </div>
                                          </div>
                                          <div className="d-flex justify-content-around">
                                            <div>
                                              Optimized for{" "}
                                              <i className="bi bi-xbox"></i>{" "}
                                              Xbox Series
                                            </div>
                                            <div>
                                              <i className="bi bi-truck"></i>
                                              Smart Delivery
                                            </div>
                                            <div>
                                              <i className="bi bi-universal-access-circle"></i>
                                              Accessibility features
                                            </div>
                                            <div>17 Supported languages</div>
                                          </div>
                                          <div className="mt-4 row me-4">
                                            <div className="col">
                                              <Button variant="outline-danger">
                                                GetGamePass
                                              </Button>
                                            </div>
                                            <div className="col">
                                              <Button variant="outline-danger">
                                                <div>
                                                  Buy
                                                  <i className="bi bi-currency-rupee"></i>
                                                  {selectedPrice}
                                                </div>
                                              </Button>
                                            </div>
                                            <div className="col">
                                              <DropdownButton
                                                id="dropdown-basic-button"
                                                title="Choose Edition"
                                                variant="outline-danger"
                                              >
                                                <Dropdown.Item href="#/action-1">
                                                  Action
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">
                                                  Another action
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">
                                                  Something else
                                                </Dropdown.Item>
                                              </DropdownButton>
                                            </div>
                                          </div>
                                          {/* <p>{selectedDiscount}</p>
                                          <p>{selectedDiscountprice}</p>
                                          <p>{selectedPrice}</p> */}
                                        </div>
                                      </div>
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

      <div>
        <Container>
          <Carousel fade interval={3000} pause="hover">
            {carouseldata.map((p) => (
              <Carousel.Item key={p.agid}>
                <img
                  src={"http://localhost:2001/uploads/" + p.imageUrl}
                  alt=""
                  height={"500px"}
                  width={"100%"}
                  style={{
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    borderRadius: "20px",
                    // filter:"contrast(40%)",
                    // filter:"blur(10px)",
                  }}
                />
                <Carousel.Caption>
                  <div className="col d-grid">
                    {/* <div
                                            style={{ fontFamily: "cursive" }}
                                            className=""
                                          >
                                            {selectedTitle}
                                          </div> */}
                    <div className="d-flex justify-content-around">
                      <div>MicroSoft Studios - Racing & flying </div>
                      <div className="text-warning">
                        <i className="bi bi-star"></i>
                        <i className="bi bi-star"></i>
                        <i className="bi bi-star"></i>
                        <i className="bi bi-star"></i>
                      </div>
                      {/* <div>
                        <i className="bi bi-currency-rupee"></i>
                        {p.discountprice}
                      </div> */}
                    </div>
                    <div className="d-flex justify-content-around">
                      <div>
                        Optimized for <i className="bi bi-xbox"></i> Xbox Series
                      </div>
                      <div>
                        <i className="bi bi-truck"></i>Smart Delivery
                      </div>
                      <div>
                        <i className="bi bi-universal-access-circle"></i>
                        Accessibility features
                      </div>
                      <div>17 Supported languages</div>
                    </div>
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Container>
      </div>

      <div>
        <div className="container-fluid overflow-hidden">
          <div
            className="row ms-4 me-4 g-4 mt-4 mb-5"
            style={{ height: "auto" }}
          >
            <div>
              <Container className="d-flex justify-content-between align-items-center">
                <div
                  style={{ fontFamily: "cursive" }}
                  className="fs-4 text-light"
                >
                  Free to play
                </div>
                <div
                  style={{ fontFamily: "cursive" }}
                  className="fs-4 text-light"
                >
                  <Button variant="outline-warning">Click To Play</Button>
                </div>
                <Pagination className="mt-4">
                  <Pagination.Prev
                    onClick={() => handlePaChange(currentPa - 1)}
                    disabled={currentPa === 1}
                  >
                    <MdArrowCircleLeft className="text-dark fs-4" />
                  </Pagination.Prev>
                  <Pagination.Next
                    onClick={() => handlePaChange(currentPa + 1)}
                    disabled={currentPa === 11}
                  >
                    <MdArrowCircleRight className="text-dark fs-4" />
                  </Pagination.Next>
                </Pagination>
              </Container>
            </div>
            {Array.isArray(pagedata) &&
              pagedata.slice(0, 101).map((arr) => (
                <div className="col" key={arr.agid}>
                  <Card style={{ width: "18rem" }} className="bg-transparent">
                    <Card.Img
                      variant="top"
                      src={"http://localhost:2001/uploads/" + arr.imgUrl}
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
                                    <Badge bg="secondary">
                                      DiscountPrice :
                                    </Badge>
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
                                      Play Now
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
                                        </Modal.Title>
                                      </Modal.Header>
                                      <Modal.Body>
                                        <div className="row d-flex">
                                          <div className="col">
                                            <img
                                              src={
                                                "http://localhost:2001/uploads/" +
                                                selectedImgurl
                                              }
                                              alt=""
                                              height={"250px"}
                                              width={"500px"}
                                              style={{
                                                backgroundRepeat: "no-repeat",
                                                backgroundPosition: "center",
                                                backgroundSize: "cover",
                                              }}
                                            />
                                          </div>
                                          <div className="col d-grid">
                                            <div className="d-flex justify-content-around">
                                              <div>
                                                MicroSoft Studios - Racing &
                                                flying{" "}
                                              </div>
                                              <div className="text-warning">
                                                <i className="bi bi-star"></i>
                                                <i className="bi bi-star"></i>
                                                <i className="bi bi-star"></i>
                                                <i className="bi bi-star"></i>
                                              </div>
                                              <div>
                                                <i className="bi bi-currency-rupee"></i>
                                                {selectedDiscountprice}
                                              </div>
                                            </div>
                                            <div className="d-flex justify-content-around">
                                              <div>
                                                Optimized for{" "}
                                                <i className="bi bi-xbox"></i>{" "}
                                                Xbox Series
                                              </div>
                                              <div>
                                                <i className="bi bi-truck"></i>
                                                Smart Delivery
                                              </div>
                                              <div>
                                                <i className="bi bi-universal-access-circle"></i>
                                                Accessibility features
                                              </div>
                                              <div>17 Supported languages</div>
                                            </div>
                                            <div className="mt-4 row me-4">
                                              <div className="col">
                                                <Button variant="outline-danger">
                                                  GetGamePass
                                                </Button>
                                              </div>
                                              <div className="col">
                                                <Button variant="outline-danger">
                                                  <div>
                                                    Buy
                                                    <i className="bi bi-currency-rupee"></i>
                                                    {selectedPrice}
                                                  </div>
                                                </Button>
                                              </div>
                                              <div className="col">
                                                <DropdownButton
                                                  id="dropdown-basic-button"
                                                  title="Choose Edition"
                                                  variant="outline-danger"
                                                >
                                                  <Dropdown.Item href="#/action-1">
                                                    Action
                                                  </Dropdown.Item>
                                                  <Dropdown.Item href="#/action-2">
                                                    Another action
                                                  </Dropdown.Item>
                                                  <Dropdown.Item href="#/action-3">
                                                    Something else
                                                  </Dropdown.Item>
                                                </DropdownButton>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
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
    </div>
  );
}

export default Avilablegame;
