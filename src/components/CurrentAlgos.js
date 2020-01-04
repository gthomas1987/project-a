import React,{useState,useEffect} from 'react';
import {Table} from 'react-bootstrap';
import AddAmountModal from './AddAmountModal';
import WithdrawAmountModal from './WithdrawAmountModal';
import AlgoDetailsModal from './AlgoDetailsModal';
import { USDFormat } from '../libs/numberFormat';
import config from '../config';

function CurrentAlgos(props) {
  const [currentAlgos,setCurrentAlgos] = useState([]);
  const [refresh,setRefresh] = useState(false);

  const handleRefresh = () => {
    console.log("Calling refresh")
    setRefresh(!{refresh}.refresh);
  }

  useEffect(()=>{
    const data = {"email":props.email}
    fetch(config.apiGateway.URL+"/getalgos", {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response=>response.json())
      .then(data=>{
        setCurrentAlgos(data)
      })
  },[refresh,props.email]);

  
  
  return (
    
    <div>
        
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount Allocated</th>
              <th>Profit/Loss</th>
              <th>-</th>
              <th>-</th>
              <th>-</th>
            </tr>
          </thead>
          <tbody>
            
              {currentAlgos.map((item,key)=>(
                <tr key ={key}>
                  <td>{item.name}</td>
                  <td>{USDFormat(item.amount)}</td>
                  <td>{USDFormat(item.pnl)}</td>
                  <td>
                    
                    <AddAmountModal email={props.email} name={item.name} refresh ={handleRefresh} min={5000} max={props.summary.amountfree}/>
                  </td> 
                  <td>
                    <WithdrawAmountModal email={props.email} name={item.name} refresh ={handleRefresh} min={5000} max={item.amount}/>
                    
                  </td>
                  <td>
                  <AlgoDetailsModal name={item.name} email={props.email} refresh ={handleRefresh} />
                  </td>
                </tr>
                ))}
            
          </tbody>
        </Table>
    </div>
  );
}

export default CurrentAlgos;
