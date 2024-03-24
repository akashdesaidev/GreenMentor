import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import TaskCard from './TaskCard';
import { Button } from 'react-bootstrap';


const Tasks = () => {
    const token = localStorage.getItem("token")
    const [taskData, setTaskData] = useState([]);
    console.log(taskData)

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
  

        fetch("http://localhost:8080/tasks", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.message == "Invalid token") {
                    setTaskData([]);
                } else {
                    console.log(res);
                    setTaskData(res.Tasks);
                }
            })
            .catch((error) => {
                console.log('Error fetching tasks:', error);
            });
    }

    const handleDelete = (id) => {
      

        fetch(`http://localhost:8080/tasks/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res.Task);
            })
        fetchData();

    }

    return (
        <div>
            <h2 id='taskH2'>All Tasks</h2>
{!token?  <h1 style={{ "textAlign": "center", "color": "burlywood" }}>Please login first</h1>:<div>
{taskData?.length == 0 ? (
                <div>
                    <h1 style={{ "textAlign": "center", "color": "burlywood" }}>No tasks to display!..... Please Add some</h1>

                </div>
            ) :
                (<Container className="mt-5">
                    <Row xs={1} md={2} className="g-4">
                        {taskData?.map((task) => (
                            <Col key={task.id}>
                                <TaskCard task={task}
                                    handleDelete={handleDelete} />
                            </Col>
                        ))}
                    </Row>
                </Container>)}
</div>
}

            
        </div>
    )
}

export default Tasks
