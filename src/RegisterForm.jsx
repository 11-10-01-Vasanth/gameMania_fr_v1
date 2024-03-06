import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './App.css';

const RegisterForm = () => {

    const [ registerData, setRegisterData ] = useState({
        username:'',
        email:'',
        password:''
        })

    const [errmsg,setErrMsg] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        // setRegisterData({ ...registerData, [name]: value })
        setRegisterData({ ...registerData, [name]: value })
        console.log(name, value);
    } 

    const handleRegister = async (event) => {
        event.preventDefault();

        try{
            const response  = await fetch(`http://localhost:2001/register/set`, {
            headers: { 
                "Content-Type": "application/json" 
            },
            method:'POST', 
            body: JSON.stringify(registerData)
        });
        if(!response.ok){
            if(response.status===302)
            {
                setErrMsg('Username Already taken');
            }
            else
            {
                throw new Error('Failed to register');
            }
        }
        else
        {
            const data = await response.json();
            console.log('Register received', data);
        }
    }
    catch(error){
        console.error('Error during register',error);
        setErrMsg('Failed to register',error);
    }
    }   

    return(
        <div>

            <Container className="d-flex justify-content-center align-items-center vh-100">
      <Form noValidate validated={registerData} onSubmit={handleRegister}>
        <Row className="mb-3 d-grid">
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              name="username"
              value={registerData.username}
              onChange={handleChange}
            />
            {errmsg && <p style={{ color: "red"}}>{errmsg}</p>}
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              value={registerData.email}
              onChange={handleChange}
            />
            {errmsg && <p style={{ color: "red"}}>*Required</p>}
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={registerData.password}
              onChange={handleChange}
            />
            {errmsg && <p style={{ color: "red"}}>*Required</p>}
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

const register = {
    backgroundColor: "red"
}

export default RegisterForm;