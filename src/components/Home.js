import React from "react";
import "./Home.css";
import {Card,Button} from 'react-bootstrap'

export default function Home(props) {
  return (
    <div className="Home">
      <div className="lander">
      <Card>
        <Card.Header>Manage Algos</Card.Header>
        <Card.Body>
          <Card.Title>Your Dashboard shows your everything you need at a glance!</Card.Title>
          <Card.Text>
            
          </Card.Text>
          <Button variant="info" size="lg" href="/dashboard" >Go To Dashboard</Button>
        </Card.Body>
      </Card>
      <br></br>
      <br></br>
      <Card>
        <Card.Header>View Algos</Card.Header>
        <Card.Body>
          <Card.Title>Go Check Out all our other Algos</Card.Title>
          <Card.Text>
            
          </Card.Text>
          <Button variant="info" size="lg" href="/algos" >Go To Algos</Button>
        </Card.Body>
      </Card>
        
      </div>
    </div>
  );
}