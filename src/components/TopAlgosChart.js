import React from 'react';
import ReactApexChart from 'react-apexcharts';
import {Button,Modal} from 'react-bootstrap';
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

  render() {
    return (
      <div id="chart">
      <Button size="sm" variant="primary" onClick={this.runQuery} block  >
        Top Performing Algos
      </Button>
      <Modal size="lg" show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Top Performing Algos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    );
  }
}

export default TopAlgosChart