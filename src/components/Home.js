import React from "react";
import "./Home.css";
import {Card,Button} from 'react-bootstrap'

export default function Home(props) {

  async function handleGoToDashboard() {
    props.history.push("/dashboard");
  }
  async function handleGoToAlgos() {
    props.history.push("/algos/all");
  }


  return (
    <div className="Home">
      <div className="lander">
      <Card bg="light">
        <Card.Header>Manage Algos</Card.Header>
        <Card.Body>
          <Card.Title>Your Dashboard shows your everything you need at a glance!</Card.Title>
          <Card.Text>
            
          </Card.Text>
          <Button variant="info" size="lg" onClick={handleGoToDashboard} >Go To Dashboard</Button>
        </Card.Body>
      </Card>
      <br></br>
      <br></br>
      <Card bg="light">
        <Card.Header>View Algos</Card.Header>
        <Card.Body>
          <Card.Title>Go Check Out all our other Algos</Card.Title>
          <Card.Text>
            
          </Card.Text>
          <Button variant="info" size="lg" onClick={handleGoToAlgos} >Go To Algos</Button>
        </Card.Body>
      </Card>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>  
      </div>
    </div>
  );
}