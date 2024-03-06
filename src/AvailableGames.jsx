import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './App.css';
import './AvailableGames.css';
import backgroundImage from '../src/Images/249531.jpeg';
import background from '../src/Images/fortnite-1920x1080-hd-cvavgntkwzkn72rg.jpg'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container, Row, Col } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import LoginForm from './LoginForm.jsx';


function Avilablegame()  {
  
  const styles = {
    container: {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '100vh',
      width:"100%"
    },
  };


  useEffect(() => {
    fetch("http://localhost:2001/avgames/getgamedata")
        .then((response) => {
            // if(!response.ok){
            //     throw new Error("Error found!!!");
            // }
            return response.json();
        })
        .then((data) =>{
            // setData(data);
            console.log(data);
        })
},[])

      return (


        <div>

        <div style={styles.container} >    
        <Navbar bg="transparent" data-bs-theme="dark" className="justify-content-center border border-2" expand="lg">
          <Container>
            <Navbar.Brand href="#home" className='text-warning' style={{ fontFamily:"cursive"}}>GameMania</Navbar.Brand>
            <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 bg-transparent"
              aria-label="Search"
            />
            <Button variant="outline-warning"><i class="bi bi-search-heart"></i></Button>
          </Form>
            <Nav className='d-flex'>
              <Nav.Link className='text-warning' href="/loginform"><i class="bi bi-person-circle fs-3"></i></Nav.Link>
              <Nav.Link className='text-warning' href="/registerform"><i class="bi bi-person-fill-add fs-3"></i></Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        </div>




        </div>
        
        
      );

      
}

export default Avilablegame;