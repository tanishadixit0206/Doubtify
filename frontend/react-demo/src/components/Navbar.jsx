import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css'; 
import { useLogout } from '../hooks/UseLogout';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/UseAuthContext';


function NavBar() {
  var {user} = useAuthContext()
  console.log(user)
  const navigate= useNavigate()
  const logout = useLogout()
  const handleClick = ()=>{
    logout()
    navigate("/")
  }
  return (
    <Navbar expand="lg" className="custom-navbar py-3">
      <Container fluid>
        <Navbar.Brand className='custom-navbar-text mx-5' href="#">Doubtify</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link className='custom-navbar-text1' href="#action1">Sort By :</Nav.Link>
            <NavDropdown title="Date" id="navbarScrollingDropdown" className='custom-navbar-text1'>
              <NavDropdown.Item href="#action3" className='custom-navbar-text1'>Newest to Oldest</NavDropdown.Item>
              <NavDropdown.Item href="#action4" className='custom-navbar-text1'>
                Oldest to Newest
              </NavDropdown.Item>
            </NavDropdown>  
          </Nav>
          <Form className="d-flex custom-navbar-text1">
            <Form.Control
              type="search"
              placeholder="Search by Topic"
              className="me-2"
              aria-label="Search"
            />
            <Button className='btn-nav' variant="outline-light">Search</Button>
          </Form>
          {user ?  <Button onClick={handleClick} className='btn-nav mx-1' variant="outline-light">Logout</Button>:null}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
