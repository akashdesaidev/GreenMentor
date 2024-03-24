import React from 'react'
import './task.css';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TaskCard = ({ task, handleDelete }) => {

    const id = task._id;


    return (
        <div>
            <Card className="h-100" id='task-card'>
                <Card.Body>
                    <Card.Title>{task.title}</Card.Title>
                    <Card.Text id='desc'>{task.description}</Card.Text>
                    <Card.Text >Status - {task.status}</Card.Text>
                    <Button variant="primary"><Link to={`/editTask/${id}`} style={{ "textDecoration": "none", "color": "white" }}>Edit</Link></Button>
                    <Button variant="danger" onClick={() => { handleDelete(id) }}>Delete</Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default TaskCard
