import React, { useEffect, useState } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const EditTask = () => {
    const { id } = useParams()
  const token  = localStorage.getItem("token")
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        getInputData();
    }, [token])

    const getInputData = async () => {
        const token = localStorage.getItem("token");

        await fetch(`https://green-mentor-peach.vercel.app/tasks/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
            .then((res) => res.json())
            .then((res) => {
                      
                setTitle(res.Task[0].title)
                setDescription(res.Task[0].description)
                setStatus(res.Task[0].status)
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = JSON.stringify({
            title, description, status
        })
        const token = localStorage.getItem("token");

        fetch(`https://green-mentor-peach.vercel.app/tasks/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: payload
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                setTitle(res.Task.title || '');
                setDescription(res.Task.description || '');
                setStatus(res.Task.status || '');

            })
        window.location.href = "/tasks";
    }


    return (
        <div>
            <Container className="login-container">
                <Row className="justify-content-md-center">
                    <Col xs={12} md={6}>
                        <div className="login-form">
                            <h2>Edit task</h2>
                            <Form onSubmit={handleSubmit}>

                                <Form.Group controlId="formEmail">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter title"
                                        value={title}
                                        onChange={(e) => { setTitle(e.target.value) }}
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
                                        value={status}
                                        onChange={(e) => { setStatus(e.target.value) }}
                                        required
                                    />
                                </Form.Group>


                                <Button variant="primary" type="submit">
                                    {/* <Link to={"/tasks"} style={{ "textDecoration": "none", "color": "white" }}> */}
                                    Save
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

export default EditTask
