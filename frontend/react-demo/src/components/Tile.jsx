import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Tile.css';

function Tile(props) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={props.image} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>Subject : {props.subject}</Card.Text>
        <Card.Text>Topic : {props.topic}</Card.Text>
        <Card.Text>{props.date}</Card.Text>
        <Button className='btn-tile' variant="outline-dark ">Show Solution</Button>
      </Card.Body>
    </Card>
  );
}   

export default Tile;