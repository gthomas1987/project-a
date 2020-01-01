import React,{useState,useEffect} from 'react';
import Positions from './Positions'
import {Container,Row,Col,Accordion, Button, Card} from 'react-bootstrap';
import PositionChart from './PositionChart'
import Summary from './Summary'
import CurrentAlgos from './CurrentAlgos'

function Dashboard() {
  const [summary,setSummary] = useState([]);
  const [npvX,setNpvX] = useState([]);
  const [npvY,setNpvY] = useState([]);

  useEffect(()=>{
    fetchData();
  },[]);

  const data = {"user":"geo"}
  const fetchData = async() =>  fetch('http://localhost:5000/getsummary', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response=>response.json())
      .then(data=>{
        setSummary(data)
        setNpvX(Object.keys(data.npvchart))
        setNpvY(Object.values(data.npvchart))
      })
      .catch(error=>console.log(error));
  
  return (
    
    <Container>
      <br></br>
      <br></br>
      <Row>
        <Col><Summary summary={summary}/></Col>
        <Col><PositionChart x={npvX} y={npvY}/></Col>
        
      </Row>
      <br></br>
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Algos
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body><CurrentAlgos summary={summary}/></Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Current Positions
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body><Positions /></Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
              Trade History
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="2">
            <Card.Body><Positions /></Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </Container>
  );
}

export default Dashboard;
