import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { InputGroup } from "react-bootstrap";
import { BiShow, BiHide } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import * as formik from "formik";
import * as yup from "yup";
import Nav from "react-bootstrap/Nav";

const LoginForm = () => {
  const { Formik } = formik;
  const navigate = useNavigate();

  const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  });

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (val, { setSubmitting }) => {
    // event.preventDefault();
    console.log("SUBMITTING FORM:", val);
    try {
      const response = await fetch("http://localhost:2001/user/login", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
        body: JSON.stringify(val),
      });
      const responseData = await response.json();
      // localStorage.setItem("authToken", responseData);

      if (responseData) {
        console.log("the Fectched data is", response);
        // const tokenResponse = localStorage.getItem("authToken");
        setLoginData(response);
        // console.log("token", tokenResponse);
        navigate("/");
      } else {
        alert("Invalid login data");
      }
      setSubmitting(false);
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#ecf0f1", height: "100vh" }}
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
        <div>
          <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={{
              username: "",
              password: "",
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
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
                      {/* {errors.username} */}
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
                        {/* {errors.password} */}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Row>
                <div className="text-center">
                  <div className="d-flex justify-content-center align-items-center mb-3">
                    <div className="text-light">Don't have an account?</div>
                    <div>
                      <Nav.Link className="text-dark" href="/registerform">
                        <i className="bi bi-person-fill-add fs-3"></i>
                      </Nav.Link>
                    </div>
                  </div>
                  <Button type="submit" variant="outline-light">
                    Sign In
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
