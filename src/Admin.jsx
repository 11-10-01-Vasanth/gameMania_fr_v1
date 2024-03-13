import { useState } from "react";

function Admin() {
  const [avdata, setavdata] = useState({
    gametitle: "",
    discount: "",
    price: "",
    discountprice: "",
    imgUrl: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const handleFile = () => {
    console.log("hello world");
    const formData = new FormData();
    formData.append("file", selectedImage);

    fetch("http://localhost:2001/file/upload", {
      method: "POST",
      body: formData,
      dataType: "jsonp",
    })
      .then((response) => response.text())
      .then((text) => {
        avdata.imgUrl = text;
        console.log(avdata.imgUrl);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setavdata({ ...avdata, [name]: value });
    console.log(name, value);
  };

  const handleData = (event) => {
    const game = {
      gametitle: avdata.gametitle,
      discount: avdata.discount,
      price: avdata.price,
      discountprice: avdata.discountprice,
      imgUrl: avdata.imgUrl,
    };
    event.preventDefault();
    fetch(`http://localhost:2001/avgames/setgamedata`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(game),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error Found");
        }
        return response.json();
      })
      .then((data) => {
        setavdata(data);
        console.log(data);
      });
  };
  return (
    <div>
      <div className="text-center">Add Game details</div>
      <form onSubmit={handleData}>
        <div>
          <label>Gametitle</label>
          <input
            type="text"
            name="gametitle"
            value={avdata.gametitle}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Discount</label>
          <input
            type="text"
            name="discount"
            value={avdata.discount}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="text"
            name="price"
            value={avdata.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>DiscountPrice</label>
          <input
            type="text"
            name="discountprice"
            value={avdata.discountprice}
            onChange={handleChange}
          />
        </div>
        <div>
          {selectedImage && (
            <div>
              <img
                alt="not found"
                width={"250px"}
                src={URL.createObjectURL(selectedImage)}
              />
              <br />
              <button onClick={() => setSelectedImage(null)}>Remove</button>
              <button onClick={handleFile}>Upload</button>
            </div>
          )}
          <br />
          <br />

          <input
            type="file"
            name="imgUrl"
            value={avdata.imgUrl}
            onChange={(event) => {
              console.log(event.target.files[0]);
              setSelectedImage(event.target.files[0]);
            }}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default Admin;
