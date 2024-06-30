import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Tile.css';
import ViewSolutionDiv from './ViewSolutionDiv';

function Tile(props) {

  const [isClicked,setIsClicked] = useState(false)

  function handleClick(){
    setIsClicked(!isClicked)
  }

  return (
    <Card style={{ width: '18rem',margin:"1.5rem" }}>
      <Card.Img variant="top" src={props.image} alt="pikachu"/>
      <Card.Body>
        <Card.Title>Title : {props.title}</Card.Title>
        <Card.Text>Subject : {props.subject}</Card.Text>
        <Card.Text>Topic : {props.topic}</Card.Text>
        <Card.Text>Date : {props.date}</Card.Text>
        {isClicked ? <ViewSolutionDiv title={props.title} subject={props.subject} topic={props.topic} q_url={props.image} sol_url={props.sol_url} /> : null}
        <Button className='btn-tile' onClick={handleClick} variant="outline-dark ">Expand</Button>
      </Card.Body>
    </Card>
  );
}   

export default Tile;