import React from 'react';
import ReactApexChart from 'react-apexcharts';
import {Container,Row,Col,Spinner} from 'react-bootstrap';
import config from '../config';

class TopAlgosChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show:false,
      series: [{
        data: []
      }],
      options: {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: [],
        }
      },
    
      
    };
    this.handleClose = this.handleClose.bind(this)
    this.handleShow = this.handleShow.bind(this)
    this.runQuery = this.runQuery.bind(this)
  }

  handleClose = () => this.setState({show:false});
  handleShow = () => this.setState({show:true});

  async runQuery(){
    await fetch(config.apiGateway.URL+"/gettopalgos", {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response=>response.json())
    .then(data=>{
      console.log("Fetching top algos API")
      console.log(data)
      this.setState({
        show:true,
        series: [{
          data: Object.values(data.topalgos)
        }],
        options: {
          chart: {
            type: 'bar',
            height: 350
          },
          plotOptions: {
            bar: {
              horizontal: true,
            }
          },
          dataLabels: {
            enabled: false
          },
          xaxis: {
            categories: Object.keys(data.topalgos) ,
          }
        },
      
        
      })

    })
    .catch(error=>console.log(error));
  }

  componentDidMount(){
    this.runQuery()
  }

  render() {
    return (
      
      <div id="chart">
      {this.state.show
        ?
        <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
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

export default TopAlgosChart