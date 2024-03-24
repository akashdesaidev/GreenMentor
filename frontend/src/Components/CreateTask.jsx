import React, { useEffect, useState } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const CreateTask = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");

    const token = localStorage.getItem("token") || "";

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = JSON.stringify({
            title, description, status
        })
        console.log(payload)
        const token = localStorage.getItem("token");

        if (token) {
            fetch(`http://localhost:8080/tasks/create`, {
                method: "POST",
             
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: payload
            })
                .then((res) => res.json())
                .then((res) => {
                     console.log(res)
                     toast.success("task created")
                     setTimeout(()=> window.location.href = "/tasks",1000)
           
                }).catch((e)=>{
                    toast.error("something went wrong")
                })
                 

        } else {
            toast.error("Login First !!");
            window.location.href = "/";
        }
    }
console.log(token)

if(!token){
    return  <h1 style={{ "textAlign": "center", "color": "burlywood" }}>Please login first to create any task</h1>
}

    return (
        <div>
            <Container className="login-container">
                <Row className="justify-content-md-center">
                    <Col xs={12} md={6}>
                        <div className="login-form">
                            <h2>Create task</h2>
                            <Form onSubmit={handleSubmit}>

                                <Form.Group controlId="formEmail">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter title"
                                        value={title}
                                        onChange={(e) => {setTitle(e.target.value) }}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formPassword">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        placeholder="Enter description"
                                        value={description}
                                        onChange={(e) => { setDescription(e.target.value) }}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formPassword">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Control
                                        placeholder="Enter status"
                                        onChange={(e) => { setStatus(e.target.value) }}
                                        required
                                    />
                                </Form.Group>


                                <Button variant="primary" type="submit">
                                    {/* <Link to={"/tasks"} style={{ "textDecoration": "none", "color": "white" }}> */}
                                    Submit
                                    {/* </Link> */}
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CreateTask
