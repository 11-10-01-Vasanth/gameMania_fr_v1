import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "./App.css";
import { InputGroup } from "react-bootstrap";
import { BiShow, BiHide } from "react-icons/bi";
import * as formik from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const { Formik } = formik;
  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup
      .string()
      .matches(/^[a-z]+\d*@gmail\.com$/, "Invalid email format")
      .required(),
    password: yup.string().required(),
  });

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // const [validated, setValidated] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (val, { setSubmitting }) => {
    // event.preventDefault();
    console.log("SUBMITTING FORM:", val);
    try {
      const response = await fetch("http://localhost:2001/user/register", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
        body: JSON.stringify(val),
      });
      const responseData = await response.json();
      if (responseData) {
        console.log("the Fectched data is", responseData);
        setRegisterData(responseData);
        navigate("/loginform");
      } else {
        alert("Username already exists");
      }
    } catch (e) {
      console.log("error", e);
    }
    setSubmitting(false);
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ backgroundColor: "#ecf0f1", height: "100vh" }}
    >
      <div
        style={{
          backgroundColor: "#bdc3c7",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0.5, 0.5, 0.5, .5)",
        }}
      >
        <div className="text-center">
          <Button className="fs-2 mb-3" variant="outline-dark">
            <i className="bi bi-person-check"></i>
          </Button>
        </div>
        <div className="text-dark text-center mb-3">
          <h1>Sign-Up</h1>
        </div>
        <div>
          <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={{
              username: "",
              email: "",
              password: "",
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row className="mb-3 d-flex justify-content-center">
                  <Form.Group
                    as={Col}
                    md="8"
                    controlId="validationFormik03"
                    className="mt-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      name="username"
                      value={values.username}
                      onChange={handleChange}
                      isInvalid={!!errors.username}
                      style={{
                        backgroundColor: "transparent",
                        borderColor: "white",
                        color: "white",
                        "::placeholder": { color: "black" },
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.username}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="8"
                    controlId="validationFormik04"
                    className="mt-5"
                  >
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                      style={{
                        backgroundColor: "transparent",
                        borderColor: "white",
                        color: "white",
                        "::placeholder": { color: "black" },
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="8"
                    controlId="validationFormik05"
                    className="mt-5"
                  >
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password}
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
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Row>
                <div className="text-center mt-4 mb-3">
                  <Button type="submit" variant="outline-light">
                    Sign Up
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
