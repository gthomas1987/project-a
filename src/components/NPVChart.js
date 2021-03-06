import React,{useEffect,useState} from 'react';
//import ApexCharts from 'apexcharts'

import Chart from "react-apexcharts";
import {Alert} from 'react-bootstrap'
function NPVChart(props){

  const [options,setOptions] = useState({});
  const [series,setSeries] = useState([]);

  useEffect(()=>{
    
    
    setOptions({
      
      dataLabels: {
        enabled: false
      },      
      chart: {
        foreColor: '#ffffff',
        zoom: {
            enabled: true,
            type: 'x',  
            autoScaleYaxis: false,  
            zoomedArea: {
              fill: {
                color: '#90CAF9',
                opacity: 0.4
              },
              stroke: {
                color: '#0D47A1',
                opacity: 0.4,
                width: 1
              }
            }
        }
      },
      xaxis:{
        type: 'datetime',
        labels: {
          formatter: function (value, timestamp) {
            const formattedDate = new Date(timestamp).toDateString()
            const [, month, day, year] = formattedDate.split(' ')
            return [day, month, year].join('-')
          }, 
        }
      }
      })
    setSeries([
      {
        name: "PNL",
        data: props.npvChart
      }
    ])
  },[props.npvChart]);




  
    return (
          <div>
            <Alert variant="dark">NPV Chart</Alert>
            <Chart
              options={options}
              series={series}
              type="line"
              width="100%"
              height="340"
            />
          </div>
    );
  }


export default NPVChart;
