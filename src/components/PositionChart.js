import React,{useEffect,useState} from 'react';
import ApexCharts from 'apexcharts'

import Chart from "react-apexcharts";

function PositionChart(props){

  const [options,setOptions] = useState({});
  const [series,setSeries] = useState([]);

  useEffect(()=>{
    setOptions({
        chart: {
          id: "basic-line",
          type: "line"
        },
        annotations: {
          xaxis: [
            {
              // in a datetime series, the x value should be a timestamp, just like it is generated below
              x: 20191222,
              strokeDashArray: 0,
              borderColor: "#775DD0",
              label: {
                borderColor: "#775DD0",
                style: {
                  color: "#fff",
                  background: "#775DD0"
                },
                text: "X Axis Anno Vertical"
              }
            },
            {
              x: "20191222",
              borderColor: "#FEB019",
              label: {
                borderColor: "#FEB019",
                style: {
                  color: "#fff",
                  background: "#FEB019"
                },
                orientation: "horizontal",
                text: "X Axis Anno Horizonal"
              }
            }
          ],
          points: [{
            x: 20191222,
            y: 51000,
            marker: {
              size: 8,
              fillColor: '#fff',
              strokeColor: 'red',
              radius: 2,
              cssClass: 'apexcharts-custom-class'
            },
            label: {
              borderColor: '#FF4560',
              offsetY: 0,
              style: {
                color: '#fff',
                background: '#FF4560',
              },

              text: 'Point Annotation',
            }
          }]
        },
        xaxis:{
          categories:props.x,
          type: "datetime"
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "straight"
        }

      })
      setSeries([
        {
          name: "NPV",
          data: props.y
        }])
  },[props.x,props.y]);


  
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


export default PositionChart;
