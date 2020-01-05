import React,{useState,useEffect} from 'react';
import {Table,Row,Col} from 'react-bootstrap';
import AddAmountModal from './AddAmountModal';
import WithdrawAmountModal from './WithdrawAmountModal';
import AlgoDetailsModal from './AlgoDetailsModal';
import { USDFormat } from '../libs/numberFormat';
import config from '../config';

function CurrentAlgos(props) {
  const [currentAlgos,setCurrentAlgos] = useState([]);
  const [refresh,setRefresh] = useState(false);

  const handleRefresh = () => {
    console.log("Calling current algos refresh")
    props.refresh()
    setRefresh(!{refresh}.refresh);
  }

  useEffect(()=>{
    const data = {"userid":props.userid}
    async function FetchAlgos(){
      await fetch(config.apiGateway.URL+"/getalgos", {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response=>response.json())
      .then(data=>{
        console.log("Fetching Client Algos API")
        setCurrentAlgos(data)
      })
    }
    FetchAlgos()
  },[props.userid,refresh,props.refreshDash]);

  
  
  return (
    
    <div>
        
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount Allocated</th>
              <th>Profit/Loss</th>
            </tr>
          </thead>
          <tbody>
            
              {currentAlgos.map((item,key)=>(
                <tr key ={key}>
                  <td>{item.name}</td>
                  <td>{USDFormat(item.amount)}</td>
                  <td>{USDFormat(item.pnl)}</td>
                  <Row>
                  <Col>
                  <AddAmountModal userid={props.userid} name={item.name} refresh ={handleRefresh} min={5000} max={props.summary.amountfree}/>
                  </Col>  
                  <Col>
                  <WithdrawAmountModal userid={props.userid} name={item.name} refresh ={handleRefresh} min={5000} max={item.amount}/>
                  </Col>
                  <Col>
                  <AlgoDetailsModal name={item.name} userid={props.userid} refresh ={handleRefresh} />
                  </Col>
                  </Row>
                </tr>
                ))}
            
          </tbody>
        </Table>
    </div>
  );
}

export default CurrentAlgos;
