import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { InputGroup } from "react-bootstrap";
import { BiShow, BiHide } from "react-icons/bi";

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
    agreed: false, // Added state for terms agreement
  });
  const [validated, setValidated] = useState(false); // State for form validation

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const val = type === "checkbox" ? checked : value;
    setLoginData({ ...loginData, [name]: val });
    if (name === "agreed" && checked) {
      event.target.setCustomValidity("");
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      // Proceed with fetch request
      fetch(
        `http://localhost:2001/register/check?username=${loginData.username}&password=${loginData.password}`
      )
        .then((response) => {
          if (!response.ok) {
            alert("Enter Valid");
            throw new Error("Failed to fetch data from server");
          }
          return response.json();
        })
        .then((data) => {
          setLoginData(data);
          console.log(data);
        })
        .catch((error) => {
          console.error("Error", error);
        });
      console.log("Logging in...");
    }
    setValidated(true); // Set validated to true after form submission
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#ecf0f1", height: "auto" }}
    >
      <div
        style={{
          backgroundColor: "#bdc3c7", // Background color of the box
          padding: "20px", // Padding inside the box
          borderRadius: "10px", // Rounded corners
          boxShadow: "0 4px 8px rgba(0.5, 0.5, 0.5, .5)", // Shadow effect
        }}
      >
        <div className="text-center">
          <Button className="fs-2 mb-3" variant="outline-dark">
            <i className="bi bi-person-circle"></i>
          </Button>
        </div>

        <div className="text-dark text-center mb-3">
          <h1>Sign-In</h1>
        </div>
        <Form noValidate validated={validated} onSubmit={handleLogin}>
          <Row className="mb-3 d-flex justify-content-center">
            {/* Username Form Group */}
            <Form.Group
              as={Col}
              md="8"
              controlId="validationCustom01"
              className="mt-3"
            >
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                value={loginData.username}
                onChange={handleChange}
                required
                style={{
                  backgroundColor: "transparent",
                  borderColor: "white",
                  color: "white",
                  "::placeholder": { color: "black" },
                }}
              />
              {/* Username Form Feedback */}
              <Form.Control.Feedback type="invalid" className="text-warning">
                Please provide a username.
              </Form.Control.Feedback>
            </Form.Group>

            {/* Password Form Group */}
            <Form.Group
              as={Col}
              md="8"
              controlId="validationCustom02"
              className="mt-5"
            >
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  required
                  style={{
                    backgroundColor: "transparent",
                    borderColor: "white",
                    color: "white",
                    "::placeholder": { color: "black" },
                  }}
                />
                <Button
                  variant="outline-light"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <BiShow /> : <BiHide />}
                </Button>
                <Form.Control.Feedback type="invalid" className="text-warning">
                  Please provide a password.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>

          {/* Terms and Conditions Form Group */}
          <Form.Group className="text-white mb-3 d-flex justify-content-center align-items-center">
            <Form.Check
              label="Remember me"
              feedback="You must agree before submitting."
              feedbackType="invalid"
              name="agreed"
              checked={loginData.agreed}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Submit Button */}
          <div className="text-center">
            <Button type="submit" variant="outline-light">
              Sign In
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
