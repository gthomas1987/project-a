import React from 'react';
import {Card,Spinner,Container,Row,Col} from 'react-bootstrap';
import Summary from './Summary'
import CurrentAlgos from './CurrentAlgos'
import AllAlgos from './AllAlgos'
import config from '../config';
import { Auth } from "aws-amplify";
import NPVChart from './NPVChart'
import AllocationChart from './AllocationChart'
import './Dashboard.css';


class Dashboard extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isLoaded:false,
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
      clientAlgos:[],
      allAlgosDetails:{},
      allocationDetails:{}
    };
    this.refreshDashboard = this.refreshDashboard.bind(this)
  }
  
  
  async refreshDashboard(){
    function sleepSeconds(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    const data = {"userid":this.state.userid}
    await sleepSeconds(1000)
    console.log("refreshing dashboard")
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
        //console.log(data.allAlgosDetails)
        this.setState({
          summary:data.summary,
          npvChart:data.npvChart,
          allAlgos:data.allAlgos,
          clientAlgos:data.clientAlgos,
          allAlgosDetails:data.allAlgosDetails,
          allocationDetails:data.allocation,
        });
        this.setState({isLoaded:true})

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
    
    return (
      
      <div >
        {this.state.isLoaded
        ?
        <div>
          
      <Container >
        <Card bg="light">
        <br></br>
        <Row>
          <Col>
          <Summary userid={this.state.userid} summary={this.state.summary} refresh={this.refreshDashboard} />
          </Col>
          <Col lg="5" md="5" sm="auto" xl="5" xs="auto">
          <AllocationChart allocation={this.state.allocationDetails}/>
          </Col>
          <Col>
          <NPVChart npvChart={this.state.npvChart}/>
          </Col>
        </Row>
        </Card>
        <br></br>
        
            <Row>
              <Col>
            <AllAlgos  userid={this.state.userid} allAlgos={this.state.allAlgos} allAlgosDetails={this.state.allAlgosDetails} summary={this.state.summary} refresh={this.refreshDashboard}/>
            </Col>
            </Row>
            <Row>
              <Col>
            <CurrentAlgos userid={this.state.userid} allAlgosDetails={this.state.allAlgosDetails} clientAlgos={this.state.clientAlgos} summary={this.state.summary} refresh={this.refreshDashboard}/>
            </Col>
            </Row>
            
      </Container>
      </div>
      :
      <div>
        <Container>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Row>
        <Col></Col>
        <Col md="auto">
          <Spinner animation="border" variant ="info" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Col>
        <Col></Col>
        </Row>
        </Container>
      </div>
      }
      </div>
    );
  }
}

export default Dashboard;
