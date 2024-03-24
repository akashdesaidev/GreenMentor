import React, { useState } from 'react'
import './signup.css';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Link, redirect} from 'react-router-dom';

import { toast } from 'sonner';
const Signup = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
 


    const handleSubmit = (e) => {
        e.preventDefault();

        if (name === "" || email === "" || password === "") {
            toast.error("Please fill all fields");
            return; 
        }

        const user = {
            name,
            email,
            password
        };

        axios.post(`https://green-mentor-peach.vercel.app/signup`, user)
            .then((res) => {
             toast.success('Signup Success');
             
            })
            .catch((error) => {
                if (error.response) {         
                    toast.error(`Server Error: ${error.response.data.message}`);
                } else if (error.request) {
                  
                    toast.error('Network Error: Please try again later');
                } else {
                  
                    toast.error('An unexpected error occurred');
                }
            });
    };
   
    return (
       
        <div className='signup-outer-div'>
            <Container className="signup-container">
                <Row className="justify-content-md-center">
                    <Col xs={12} md={6}>
                        <div className="signup-form">
                            <h2>Sign Up</h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter username"
                                        // name="name"
                                        // value={name}
                                        onChange={(e) => { setName(e.target.value) }}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        // name="email"
                                         value={email}
                                        onChange={(e) => { setEmail(e.target.value) }}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter password"
                                        // name="password"
                                        // value={formData.password}
                                        onChange={(e) => { setPassword(e.target.value) }}
                                        required
                                    />
                                </Form.Group>
                                <div style={{ "textAlign": "center", "marginTop": "10px" }}> <text>Already an user ? </text>
                                    <Link to={"/login"}>Login</Link></div>
                                <br />
                                <Button variant="primary" type="submit">
                                    Sign Up
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Signup
