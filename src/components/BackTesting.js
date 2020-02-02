import React from 'react';
import {Form,Button,Table,Alert,Card,Row,Col,Container,Spinner} from 'react-bootstrap';
import config from '../config';
import BackTestChart from './BackTestChart'
import BackTestWeekly from './BackTestWeekly'
import {USDFormat} from '../libs/numberFormat'
import './Dashboard.css';


class BackTesting extends React.Component{
  constructor(props){
    super(props);
    this.state={
      security1:"S&P",
      security2:"Nasdaq",
      lookback:"1 Y",
      frequency:"8 hours",
      trend:"10",
      meanrev:"100",
      tp:"10",
      trailtp:"10",
      sl:"10",
      chart1:[],
      chart2:[],
      chart3:[],
    };
    this.handleChange = this.handleChange.bind(this);
    this.runBackTest = this.runBackTest.bind(this);
    
  }
 

  handleChange(e){
    console.log([e.target.name])
    console.log(e.target.value)
    this.setState({[e.target.name]:e.target.value})
    console.log(this.state)
  }

  async runBackTest(){
    const data = this.state
    await fetch(config.apiGateway.URL+"/runbacktest", {
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
          chart1:data.pnlDict,
          chart2:data.diffDict,
          chart3:data.weeklyPnL,
        });
        /*
        this.setState({isLoaded:true})
        */
      })
      .catch(error=>console.log(error));
  }

  
  
  render(){
    
    return (
      
      <div style={{'background-color': '#000000'}} >
       
          <div style={{'color':"white"}}>
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridSecurity1">
                <Form.Label>Security 1</Form.Label>
                <Form.Control as="select" value={this.state.security1} onChange={this.handleChange} name="security1">
                  <option>S&P</option>
                  <option>Nasdaq</option>
                  <option>Russell</option>
                  <option>DJI</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridSecurity2">
                <Form.Label>Security 2</Form.Label>
                <Form.Control as="select" value={this.state.security2} onChange={this.handleChange} name="security2">
                  <option>S&P</option>
                  <option>Nasdaq</option>
                  <option>Russell</option>
                  <option>DJI</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridLookback">
                <Form.Label>Look Back</Form.Label>
                <Form.Control as="select" value={this.state.lookback} onChange={this.handleChange} name="lookback">
                  <option>1 W</option>
                  <option>2 W</option>
                  <option>1 M</option>
                  <option>3 M</option>
                  <option>6 M</option>
                  <option>1 Y</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridFrequency">
                <Form.Label>Frequency</Form.Label>
                <Form.Control as="select" value={this.state.frequency} onChange={this.handleChange} name="frequency">
                  <option>1 min</option>
                  <option>2 mins</option>
                  <option>5 mins</option>
                  <option>10 mins</option>
                  <option>15 mins</option>
                  <option>30 mins</option>
                  <option>1 hour</option>
                  <option>2 hours</option>
                  <option>3 hours</option>
                  <option>4 hours</option>
                  <option>8 hours</option>
                  <option>1 day</option>
                  <option>1 week</option>
                  <option>1 month</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridTrend">
                <Form.Label>Trend</Form.Label>
                <Form.Control as="select" value={this.state.trend} onChange={this.handleChange} name="trend">
                  <option>5</option>
                  <option>10</option>
                  <option>15</option>
                  <option>20</option>
                  <option>25</option>
                  <option>30</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridMeanRev">
                <Form.Label>Mean Rev</Form.Label>
                <Form.Control as="select" value={this.state.meanrev} onChange={this.handleChange} name="meanrev">
                  <option>75</option>
                  <option>100</option>
                  <option>125</option>
                  <option>150</option>
                  <option>200</option>
                  <option>300</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridTP">
                <Form.Label>TP</Form.Label>
                <Form.Control as="select" value={this.state.tp} onChange={this.handleChange} name="tp">
                  <option>5</option>
                  <option>10</option>
                  <option>15</option>
                  <option>20</option>
                  <option>30</option>
                  <option>50</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridTrailTP">
                <Form.Label>Trail TP</Form.Label>
                <Form.Control as="select" value={this.state.trailtp} onChange={this.handleChange} name="trailtp">
                  <option>5</option>
                  <option>10</option>
                  <option>15</option>
                  <option>20</option>
                  <option>25</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridSL">
                <Form.Label>Stop Loss</Form.Label>
                <Form.Control as="select" value={this.state.sl} onChange={this.handleChange} name="sl">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                  <option>100</option>
                  <option>300</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>



            <Button onClick={this.runBackTest} variant="primary">
              Run
            </Button>
          </Form>

          
          <BackTestChart  pnlchart={this.state.chart1} diffchart={this.state.chart2}/>
          <BackTestWeekly chartKey={Object.keys(this.state.chart3)} chartValue={Object.values(this.state.chart3)}/>

          </div>
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
        <br></br>
        <br></br>
          
      
      </div>
 
    );
  }
}

export default BackTesting;
