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
import { useContext, useEffect, useState } from 'react';
import { SubjectContext } from '../context/SubjectContext'
import {maths,chemistry,biology,all,physics} from '../subjects'
import axios from 'axios';

function NavBar(props) {
  const {user} = useAuthContext()
  const [doubts,setDoubts] = useState([])
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState([]);
  const [sortOrder, setSortOrder] = useState("Newest to Oldest"); 

  const handleChange = async (event) => {
    const {value} = event.target
    setSelectedOption(value);
    console.log("yeh hai " + value)
    try {
      const response = await axios.post("http://localhost:5000/home/filter", {
        topic: value,
        sortOrder:sortOrder
      }, {
        headers: {
          'Authorization': `Bearer ${user}`,
        }
      });
      console.log(response)
      setDoubts(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  var { subject } = useContext(SubjectContext);
  const navigate = useNavigate()
  const logout = useLogout()

  const handleClick = () => {
    logout()
    navigate("/")
  }
  useEffect(() => {
    let options;
    switch (subject) {
      case "All":
        options = all;
        break;
      case "Physics":
        options = physics;
        break;
      case "Chemistry":
        options = chemistry
        break;
      case "Biology":
        options = biology 
        break; 
      case "Maths":
        options = maths 
        break; 
      default:
        options = []; 
    }
    setOptions(options); 
  }, [subject]);

  const handleSortOrderChange = (event,order) => {
    setSortOrder(order);
    console.log(order)
    handleChange(event)
  };

  return (
    <Navbar style={{ position: "fixed", zIndex: 2, top: "0", right: "0", left: "0" }} expand="lg" className="custom-navbar py-3">
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
               <NavDropdown.Item className='custom-navbar-text1' onClick={()=>{handleSortOrderChange("Newest to Oldest")}}>Newest to Oldest</NavDropdown.Item>
              <NavDropdown.Item className='custom-navbar-text1' onClick={()=>{handleSortOrderChange("Oldest to Newest")}}>Oldest to Newest</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex custom-navbar-text1">

            <form className=' px-2'>
              <select className='form-select' id="select-option" value={selectedOption} onChange={handleChange}>
                <option value="">Select a Topic</option>
                {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
              </select>
            </form>
            <Button onClick={()=>{
              props.searchFunction(doubts)
            }} className='btn-nav mr-3' variant="outline-light">Search</Button>
          </Form>
          {user ? <Button onClick={handleClick} className='btn-nav mx-1' variant="outline-light">Logout</Button> : null}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
