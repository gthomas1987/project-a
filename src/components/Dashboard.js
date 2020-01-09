import React from 'react';
import {Container,Row,Col,Accordion, Button, Card} from 'react-bootstrap';
import Summary from './Summary'
import CurrentAlgos from './CurrentAlgos'
import AllAlgos from './AllAlgos'
import config from '../config';
import { Auth } from "aws-amplify";
import NPVChart from './NPVChart'

class Dashboard extends React.Component{
  constructor(props){
    super(props);
    this.state={
      userid:"",
      summary:{
        pnl:0.0,
        npv:0.0,
        accountbalance:0.0,
        amountallocated:0.0,
        usagelevel:"0.0%",
        amountfree:0.0
      },
      npvChart:[],
      allAlgos:[],
      clientAlgos:[]
    };
    this.refreshDashboard = this.refreshDashboard.bind(this)
  }
  
  async refreshDashboard(){
    const data = {"userid":this.state.userid}
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
        console.log("Fetching summary API")
        console.log(data)
        console.log(data.allAlgos)
        this.setState({
          summary:data.summary,
          npvChart:data.npvChart,
          allAlgos:data.allAlgos,
          clientAlgos:data.clientAlgos
        });

      })
      .catch(error=>console.log(error));
  }

  async componentDidMount(){
    
    await Auth.currentAuthenticatedUser({
      bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
    .then(user => {
      this.setState({userid:user.username})
      }
    )
    .catch(err => console.log(err));

    this.refreshDashboard()
    
  }

  

  
  
  render(){
    console.log("Dashboard render")
    return (
    
      <Container>
        <br></br>
        <br></br>
        <Row>
          <Col><Summary userid={this.state.userid} summary={this.state.summary} refresh={this.refreshDashboard} /></Col>
          <Col><NPVChart npvChart={this.state.npvChart}/></Col>
        </Row>
        <Row>
          <Col>
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
              <AllAlgos  userid={this.state.userid} allAlgos={this.state.allAlgos} summary={this.state.summary} refresh={this.refreshDashboard}/>
              </Col>
              </Row>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body><CurrentAlgos userid={this.state.userid} clientAlgos={this.state.clientAlgos} summary={this.state.summary} refresh={this.refreshDashboard}/></Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        </Col>
        </Row>
      </Container>
    );
  }
}

export default Dashboard;
