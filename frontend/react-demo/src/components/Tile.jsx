import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Tile.css';

function Tile(props) {
  return (
    <Card style={{ width: '18rem',margin:"1.5rem" }}>
      <Card.Img variant="top" src={require('../images/pexels-carocastilla-1716861.jpg')} alt="pikachu"/>
      <Card.Body>
        <Card.Title>Title : {props.title}</Card.Title>
        <Card.Text>Subject : {props.subject}</Card.Text>
        <Card.Text>Topic : {props.topic}</Card.Text>
        <Card.Text>Date : {props.date}</Card.Text>
        <Button className='btn-tile' variant="outline-dark ">Show Solution</Button>
      </Card.Body>
    </Card>
  );
}   

export default Tile;