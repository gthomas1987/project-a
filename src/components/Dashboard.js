import React,{useState,useEffect} from 'react';
import {Container,Row,Col,Accordion, Button, Card} from 'react-bootstrap';
import NPVChart from './NPVChart'
import Summary from './Summary'
import CurrentAlgos from './CurrentAlgos'
import AllAlgos from './AllAlgos'
import config from '../config';
import { Auth } from "aws-amplify";

function Dashboard(props) {
  const [summary,setSummary] = useState([]);
  const [npvChart,setNpvChart] = useState([]);
  const [refresh,setRefresh] = useState(false);
  const [userid,setUserid] = useState("");

  

  const handleRefresh = () => {
    console.log("Calling dashboard refresh")
    setRefresh(!{refresh}.refresh);
  }

  async function onLoad(){
    await Auth.currentAuthenticatedUser({
      bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
    .then(user => setUserid(user.username))
    .catch(err => console.log(err));
  }

  
  
  useEffect(()=>{
    
    onLoad();
    async function FetchSummary(){
      const data = {"userid":userid}
      await fetch(config.apiGateway.URL+"/getsummary", {
          method: 'POST', // or 'PUT'
          body: JSON.stringify(data), // data can be `string` or {object}!
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
        .then(response=>response.json())
        .then(data=>{
          console.log("Fetching dashboard API")
          setSummary(data)
          console.log(data)
          setNpvChart(data.npvchart)
        })
        .catch(error=>console.log(error));
    }
    FetchSummary();
    
  },[userid,refresh]);

  
  return (
    
    <Container>
      <br></br>
      <br></br>
      <Row>
        <Col><Summary refresh ={handleRefresh} userid={userid} summary={summary}/></Col>
        <Col><NPVChart npvchart={npvChart}/></Col>
        
      </Row>
      <br></br>
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            <Row>
            <Col sm={10}>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Algos
            </Accordion.Toggle>
            </Col>
            <Col sm={2}>
            <AllAlgos summary={summary} userid={userid} refresh ={handleRefresh} refreshDash={refresh}/>
            </Col>
            </Row>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body><CurrentAlgos summary={summary} userid={userid} refresh ={handleRefresh} refreshDash={refresh}/></Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </Container>
  );
}

export default Dashboard;
