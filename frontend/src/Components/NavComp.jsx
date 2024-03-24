
import Container from 'react-bootstrap/Container';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { toast } from 'sonner';

function NavComp() {
    const token = localStorage.getItem("token") || "";

    const handleLogout = () => {
        if (token) {
            localStorage.removeItem("token");
           toast.success("You are logged out !!");
        }
    }
    return (
        <>
            <Navbar bg="primary" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">Task Manager</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/tasks">All Tasks</Nav.Link>
                        <Nav.Link href="/create">Create</Nav.Link>
                       {
                        !token? <Nav.Link href="/signup">Signup</Nav.Link>
:<Nav.Link href="/profile">Profile</Nav.Link>
                       }
                       
                        <NavDropdown title={!token?"login":"Logout"} id="navbarScrollingDropdown">
                           
                            <NavDropdown.Item href={token ? "/signup" : "/login"} onClick={handleLogout}>
                                {token ? "Logout" : "Login"}
                            </NavDropdown.Item>
                            
                        </NavDropdown>
                    </Nav>

                </Container>
            </Navbar>
        </>
    );
}

export default NavComp;