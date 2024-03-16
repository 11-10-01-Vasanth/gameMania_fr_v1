import { useState } from "react";
import Button from "react-bootstrap/Button";
// import "./Admin.css";

function Admin() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [avdata, setavdata] = useState({
    imageUrl:""
  });
  const [avdt, setavdt] = useState({
    gametitle: "",
    discount: "",
    price: "",
    discountprice: "",
    imgUrl: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setavdata({ ...avdata, [name]: value });
    console.log(name, value);
  };
  const submitData = () => {
    const game = {
      gametitle: avdata.gametitle,
      discount: avdata.discount,
      price: avdata.price,
      discountprice: avdata.discountprice,
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
    // formData.append("text", avdata);
    // console.log(formData);
    // for(var i in formData.entries()){
    //   console.log(i[0],i[1],"Formdata")
    // }
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
        // setData({ ...data, Valimage: text });
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
    // formData.append("text", avdata);
    // console.log(formData);
    // for(var i in formData.entries()){
    //   console.log(i[0],i[1],"Formdata")
    // }
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
        // setData({ ...data, Valimage: text });
        avdata.imageUrl = text;
        console.log(text);
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };
  return (
    <div>
      <div className="ad">
        <h1 className="text-center">Add a Product</h1>
        <div className="pr">
          <h3>Gametitle</h3>
          <input
            type="text"
            name="gametitle"
            value={avdata.gametitle}
            onChange={handleChange}
            style={{ border: "2px solid black" }}
          />
        </div>{" "}
        <br></br>
        <div className="pr">
          <h3>Discount</h3>
          <input
            type="text"
            name="discount"
            style={{ border: "2px solid black" }}
            value={avdata.discount}
            onChange={handleChange}
          />
        </div>{" "}
        <br></br>
        <div className="pr">
          <h3>Price</h3>
          <input
            type="text"
            name="price"
            value={avdata.price}
            onChange={handleChange}
            style={{ border: "2px solid black" }}
          />
        </div>{" "}
        <br></br>
        <div className="pr">
          <h3>DiscountPrice</h3>
          <input
            type="text"
            name="discountprice"
            value={avdata.discountprice}
            onChange={handleChange}
            style={{ border: "2px solid black" }}
          />
        </div>{" "}
        <br></br>
        <div className="pr">
          <div>
            {selectedImage && (
              <div className="text-center">
                <img
                  alt="not found"
                  width={"200px"}
                  height={"270px"}
                  src={URL.createObjectURL(selectedImage)}
                />
                <br />
                <Button variant="danger" onClick={() => setSelectedImage(null)}>
                  Remove
                </Button>
                &nbsp;&nbsp;
                <Button variant="warning" onClick={handleFile}>
                  Upload
                </Button>
              </div>
            )}
            <br />
            <br />

            <input
              type="file"
              name="imgUrl"
              value={avdata.imgUrl}
              onChange={(event) => {
                console.log(event.target.files[0], "File");
                setSelectedImage(event.target.files[0]);
              }}
            />
          </div>
        </div>
        {/* <input type="button" value="Add Product"  /> */}
        <div className="text-center">
          <Button variant="danger" onClick={submitData}>
            Add Product
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Admin;
