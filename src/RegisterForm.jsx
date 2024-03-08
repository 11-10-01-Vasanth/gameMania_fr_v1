import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Container, Row, Col, Form } from "react-bootstrap";
import "./App.css";
import { InputGroup } from "react-bootstrap";
import { BiShow, BiHide } from "react-icons/bi";

const RegisterForm = () => {
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    agreed: false,
  });

  const [validated, setValidated] = useState(false); // State for form validation

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const val = type === "checkbox" ? checked : value;
    setRegisterData({ ...registerData, [name]: val });
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const response = await fetch(`http://localhost:2001/register/set`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(registerData),
        });

        if (!response.ok) {
          throw new Error("Failed to register");
        } else {
          console.log("Register received", response.json());
        }
      } catch (error) {
        console.error("Error during register", error);
      }
      console.log("Signing Up...");
    }
    setValidated(true);
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "rgb(29,32,51)" }}
    >
      <div
        style={{
          backgroundColor: "rgb(29,32,51)", // Background color of the box
          padding: "20px", // Padding inside the box
          borderRadius: "10px", // Rounded corners
          boxShadow: "0 4px 8px rgba(0.5, 0.5, 0.5, .5)", // Shadow effect
        }}
      >
        <div className="text-center">
          <Button className="fs-2 mb-3" variant="outline-light">
            <i class="bi bi-person-check"></i>
          </Button>
        </div>
        <div className="text-white text-center mb-3">
          <h1>Sign-Up</h1>
        </div>
        <Form noValidate validated={validated} onSubmit={handleRegister}>
          <Row className="mb-3 d-flex justify-content-center">
            <Form.Group as={Col} md="8" controlId="validationCustom01">
              <Form.Label className="text-light">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                value={registerData.username}
                onChange={handleChange}
                required
                style={{
                  backgroundColor: "transparent",
                  borderColor: "#ced4da",
                  color: "white",
                  "::placeholder": { color: "white" },
                }}
              />
              <Form.Control.Feedback type="invalid" className="text-warning">
                Please provide a username.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="8" controlId="validationCustom02">
              <Form.Label className="text-light mt-3">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={registerData.email}
                onChange={handleChange}
                required
                style={{
                  backgroundColor: "transparent",
                  borderColor: "#ced4da",
                  color: "white",
                  "::placeholder": { color: "white" },
                }}
              />
              <Form.Control.Feedback type="invalid" className="text-warning">
                Please provide an email.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="8" controlId="validationCustom03">
              {/* Password Form Label */}
              <Form.Label className="text-light mt-3">Password</Form.Label>
              {/* Password Form Control */}
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={registerData.password}
                  onChange={handleChange}
                  required
                  style={{
                    backgroundColor: "transparent",
                    borderColor: "#ced4da",
                    color: "white",
                    "::placeholder": { color: "white" },
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
          <Form.Group className="text-white mb-3 d-flex justify-content-center align-items-center">
            <Form.Check
              label="Agree to terms and conditions"
              feedback="You must agree before submitting."
              feedbackType="invalid"
              name="agreed"
              checked={registerData.agreed}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <div className="text-center mt-4 mb-3">
            <Button type="submit" variant="outline-light">
              Sign Up
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;
