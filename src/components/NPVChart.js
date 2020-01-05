import React,{useEffect,useState} from 'react';
//import ApexCharts from 'apexcharts'

import Chart from "react-apexcharts";

function NPVChart(props){

  const [options,setOptions] = useState({});
  const [series,setSeries] = useState([]);

  useEffect(()=>{
    setOptions({
      dataLabels: {
        enabled: false
      },
      chart: {
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
            return new Date(timestamp) // The formatter function overrides format property
          }, 
        }
      }
      })
    setSeries([
      {
        name: "PNL",
        data: props.npvchart
      }
    ])
  },[props.npvchart]);




  
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={options}
              series={series}
              type="line"
              width="500"
            />
          </div>
        </div>
      </div>
    );
  }


export default NPVChart;
