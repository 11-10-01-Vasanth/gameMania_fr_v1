import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import Tabs from "react-bootstrap/Tabs";
import Modal from "react-bootstrap/Modal";

function Admin() {
  const [gamedata, getGamedata] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedUpdImage, setSelectedUpdImage] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [avdt, setavdt] = useState({
    imageUrl: "",
  });
  const [avdata, setavdata] = useState([]);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const [deleteid, setdeleteid] = useState();

  const [updatedata, setupdatedata] = useState({
    agid: "",
    gametitle: "",
    discount: "",
    price: "",
    discountprice: "",
    imgUrl: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setavdata({ ...avdata, [name]: value });
    setavdt({ ...avdt, [name]: value });
    setupdatedata({ ...updatedata, [name]: value });
    console.log(updatedata);
  };
  const submitData = () => {
    const game = {
      gametitle: avdata.gametitle,
      discount: avdata.discount,
      price: avdata.price,
      description: avdata.description,
      imgUrl: avdata.imgUrl,
    };
    fetch("http://localhost:2001/avgames/setgamedata", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(game),
    }).then((response) => {
      console.log("Data Received " + response);
    });
  };
  const handleFile = () => {
    console.log("hello world");
    const formData = new FormData();
    formData.append("file", selectedImage);
    fetch("http://localhost:2001/file/upload", {
      method: "POST",
      body: formData,
      dataType: "jsonp",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Image upload failed");
        }
        return response.text();
      })
      .then((text) => {
        avdata.imgUrl = text;
        console.log(text);
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  const handleImage = () => {
    console.log("hello world");
    const formData = new FormData();
    formData.append("file", selectedImg);
    fetch("http://localhost:2001/file/uploadimg", {
      method: "POST",
      body: formData,
      dataType: "jsonp",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Image upload failed");
        }
        return response.text();
      })
      .then((text) => {
        avdt.imageUrl = text;
        console.log(text);
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  const handleUpd = () => {
    const formData = new FormData();
    formData.append("gameImage", selectedUpdImage);
    formData.append("gametitle", updatedata.gametitle);
    formData.append("discount", updatedata.discount);
    formData.append("discountprice", updatedata.discountprice);
    formData.append("price", updatedata.price);

    fetch(`http://localhost:2001/file/updategamedata/${updatedata.agid}`, {
      method: "PUT",
      body: formData,
    }).then((response) => {
      if (response.ok) {
        alert("Updated");
      }
      console.log("Data Received " + response);
    });
  };

  function deleteData(a) {
    fetch(`http://localhost:2001/avgames/delete/${a}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid response");
        }
        getGamedata(gamedata.filter((data) => data.agid !== a));
        return response.json();
      })
      .then((response) => {
        console.log("Deleted", response);
      });
    console.log("Deleted", a);
  }

  useEffect(() => {
    fetch("http://localhost:2001/avgames/getAllGameData")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid response");
        }
        return response.json();
      })
      .then((response) => {
        getGamedata(response);
      });
  }, []);

  return (
    // <div>

    <div className="mt-4">
      <div className="text-center mb-5">
        <h1>Admin Page</h1>
      </div>
      <Tabs
        defaultActiveKey="Add"
        id="justify-tab-example"
        className="mb-5"
        justify
      >
        <Tab eventKey="Add" title="Add">
          <div className="">
            <InputGroup size="xl" className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-sm">
                Gametitle
              </InputGroup.Text>
              <Form.Control
                aria-label="Gametitle"
                aria-describedby="inputGroup-sizing-sm"
                type="text"
                name="gametitle"
                value={avdata.gametitle}
                onChange={handleChange}
                style={{ border: "1px solid grey" }}
              />
            </InputGroup>
          </div>
          <div className="">
            <InputGroup size="xl" className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-sm">
                Discount
              </InputGroup.Text>
              <Form.Control
                aria-label="discount"
                aria-describedby="inputGroup-sizing-sm"
                type="text"
                name="discount"
                style={{ border: "1px solid grey" }}
                value={avdata.discount}
                onChange={handleChange}
              />
            </InputGroup>
          </div>
          <div className="">
            <InputGroup size="xl" className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-sm">Price</InputGroup.Text>
              <Form.Control
                aria-label="price"
                aria-describedby="inputGroup-sizing-sm"
                style={{ border: "1px solid grey" }}
                type="text"
                name="price"
                value={avdata.price}
                onChange={handleChange}
              />
            </InputGroup>
          </div>
          <div className="">
            <InputGroup size="xl" className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-sm">
                DiscountPrice
              </InputGroup.Text>
              <Form.Control
                aria-label="DiscountPrice"
                aria-describedby="inputGroup-sizing-sm"
                style={{ border: "1px solid grey" }}
                type="text"
                name="discountprice"
                value={avdata.discountprice}
                onChange={handleChange}
              />
            </InputGroup>
          </div>
          <div className="">
            <div>
              <InputGroup size="xl" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Image
                </InputGroup.Text>
                <Form.Control
                  aria-label="Image"
                  aria-describedby="inputGroup-sizing-sm"
                  style={{ border: "1px solid grey" }}
                  type="file"
                  name="imgUrl"
                  value={avdata.imgUrl}
                  onChange={(event) => {
                    console.log(event.target.files[0], "File");
                    setSelectedImage(event.target.files[0]);
                  }}
                />
              </InputGroup>
              {selectedImage && (
                <div className="text-center">
                  <img
                    alt="not found"
                    width={"200px"}
                    height={"270px"}
                    src={URL.createObjectURL(selectedImage)}
                  />
                  <br />
                  <Button
                    variant="danger"
                    onClick={() => setSelectedImage(null)}
                  >
                    Remove
                  </Button>
                  &nbsp;&nbsp;
                  <Button variant="warning" onClick={handleFile}>
                    Upload
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div>
            <div>
              <InputGroup size="xl" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Image
                </InputGroup.Text>
                <Form.Control
                  aria-label="Image"
                  aria-describedby="inputGroup-sizing-sm"
                  style={{ border: "1px solid grey" }}
                  type="file"
                  name="imageUrl"
                  value={avdt.imageUrl}
                  onChange={(event) => {
                    console.log(event.target.files[0], "File");
                    setSelectedImg(event.target.files[0]);
                  }}
                />
              </InputGroup>
              {selectedImg && (
                <div className="text-center">
                  <img
                    alt="not found"
                    width={"200px"}
                    height={"270px"}
                    src={URL.createObjectURL(selectedImg)}
                  />
                  <br />
                  <Button variant="danger" onClick={() => setSelectedImg(null)}>
                    Remove
                  </Button>
                  &nbsp;&nbsp;
                  <Button variant="warning" onClick={handleImage}>
                    Upload
                  </Button>
                </div>
              )}
            </div>
          </div>
          {/* <input type="button" value="Add Product"  /> */}
          <div className="text-center">
            <Button variant="outline-secondary" onClick={submitData}>
              Add
            </Button>
          </div>
        </Tab>
        <Tab eventKey="Update" title="Update">
          <InputGroup size="xl" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">Id</InputGroup.Text>
            <Form.Control
              aria-label="agid"
              aria-describedby="inputGroup-sizing-sm"
              style={{ border: "1px solid grey" }}
              type="text"
              name="agid"
              value={updatedata.agid}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup size="xl" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">
              Gametitle
            </InputGroup.Text>
            <Form.Control
              aria-label="gametitle"
              aria-describedby="inputGroup-sizing-sm"
              style={{ border: "1px solid grey" }}
              type="text"
              name="gametitle"
              value={updatedata.gametitle}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup size="xl" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">
              Discount
            </InputGroup.Text>
            <Form.Control
              aria-label="discount"
              aria-describedby="inputGroup-sizing-sm"
              style={{ border: "1px solid grey" }}
              type="text"
              name="discount"
              value={updatedata.discount}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup size="xl" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">Price</InputGroup.Text>
            <Form.Control
              aria-label="price"
              aria-describedby="inputGroup-sizing-sm"
              style={{ border: "1px solid grey" }}
              type="text"
              name="price"
              value={updatedata.price}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup size="xl" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">
              DiscountPrice
            </InputGroup.Text>
            <Form.Control
              aria-label="discountprice"
              aria-describedby="inputGroup-sizing-sm"
              style={{ border: "1px solid grey" }}
              type="text"
              name="discountprice"
              value={updatedata.discountprice}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup size="xl" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">Image</InputGroup.Text>
            <Form.Control
              aria-label="Image"
              aria-describedby="inputGroup-sizing-sm"
              style={{ border: "1px solid grey" }}
              type="file"
              name="imageUrl"
              value={updatedata.imgUrl}
              onChange={(event) => {
                console.log(event.target.files[0], "File");
                setSelectedUpdImage(event.target.files[0]);
              }}
            />
          </InputGroup>
          {selectedUpdImage && (
            <div className="text-center">
              <img
                alt="not found"
                width={"200px"}
                height={"270px"}
                src={URL.createObjectURL(selectedUpdImage)}
              />
              <br />
              <Button
                variant="danger"
                onClick={() => setSelectedUpdImage(null)}
              >
                Remove
              </Button>
            </div>
          )}
          <Button variant="outline-danger" type="submit" onClick={handleUpd}>
            Update
          </Button>
          {/* </Form> */}
          <Table striped bordered hover className="align-middle text-center">
            <thead>
              <tr>
                <th>Admin</th>
                <th>Gametitle</th>
                <th>Image</th>
                <th>price</th>
                <th>Discount</th>
                <th>Discountprice</th>
              </tr>
            </thead>
            {Array.isArray(gamedata) &&
              gamedata.map((arr) => (
                <tbody key={arr.agid}>
                  <tr>
                    <td>{arr.agid}</td>
                    <td>{arr.gametitle}</td>
                    <td>
                      <img
                        src={"http://localhost:2001/uploads/" + arr.imgUrl}
                        alt=""
                        style={{ height: "100px", width: "200px" }}
                      />
                    </td>
                    <td>{arr.price}</td>
                    <td>{arr.discount}</td>
                    <td>{arr.discountprice}</td>
                  </tr>
                </tbody>
              ))}
          </Table>
        </Tab>
        <Tab eventKey="AllGames" title="AllGames">
          <Table striped bordered hover className="align-middle text-center">
            <thead>
              <tr>
                <th>Admin</th>
                <th>Gametitle</th>
                <th>Image</th>
                <th>price</th>
                <th>Discount</th>
                <th>Discountprice</th>
                <th>Delete</th>
              </tr>
            </thead>
            {Array.isArray(gamedata) &&
              gamedata.map((arr) => (
                <tbody key={arr.agid}>
                  <tr>
                    <td>{arr.agid}</td>
                    <td>{arr.gametitle}</td>
                    <td>
                      <img
                        src={"http://localhost:2001/uploads/" + arr.imgUrl}
                        alt=""
                        style={{ height: "100px", width: "200px" }}
                      />
                    </td>
                    <td>{arr.price}</td>
                    <td>{arr.discount}</td>
                    <td>{arr.discountprice}</td>
                    <td>
                      <i
                        onClick={() => {
                          // setdeleteid();
                          deleteData(arr.agid);
                        }}
                        class="bi bi-trash3-fill"
                      ></i>
                    </td>
                  </tr>
                </tbody>
              ))}
          </Table>
        </Tab>
      </Tabs>
    </div>
    // </div>
  );
}

export default Admin;
