import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const LoginForm = () => {

    const [ loginData, setLoginData ] = useState({
        username:'',
        password:'',
        })

        const handleChange = (event) => {
            const { name, value } = event.target;
            setLoginData({ ...loginData, [name]: value })
            console.log(name, value);
        }  

        const handleLogin = (event) => {
            event.preventDefault();
            if(loginData.username == "" || loginData.password == "")
            {
                return alert("Empty");
            }
            else
            {
                fetch(`http://localhost:2001/register/check?username=${loginData.username}&password=${loginData.password}`)
                .then((response) => {
                    if (!response.ok)
                    {
                        alert("Enter Valid");
                        throw new Error("Failed to fetch data from server");
                    } 
                    alert("Enter Valid");
                    return response.json();
                }) 
                .then((data) => {
                    setLoginData(data);
                    console.log(data); 
                })
                .catch((error) => {
                    console.error("Error", error);
                })
            }
        }

    return(
        <div>

            {/* <Form noValidate validated={loginData} onSubmit={handleLogin}>
            <Row className="mb-3 d-grid">
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="First name"
                    name='username'
                    value={loginData.username}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="First name"
                    name='password' 
                    value={loginData.password} 
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Form.Group className="mb-3">
                <Form.Check
                  label="Agree to terms and conditions"
                  feedback="You must agree before submitting."
                  feedbackType="invalid"
                />
                </Form.Group>
                <Button type="submit" variant="warning">Submit form</Button>
            </Form> */}
            <Container className="d-flex justify-content-center align-items-center vh-100">
      <Form noValidate validated={loginData} onSubmit={handleLogin}>
        <Row className="mb-3 d-grid">
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              name="username"
              value={loginData.username}
              onChange={handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Form.Group className="mb-3">
          <Form.Check
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
            feedbackType="invalid"
          />
        </Form.Group>
        <Button type="submit" variant="warning">Submit form</Button>
      </Form>
    </Container>
        </div>
        
    );
}

export default LoginForm;