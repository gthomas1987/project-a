import React,{useState,useEffect} from 'react';
import {Table,Row,Col} from 'react-bootstrap';
import AddAmountModal from './AddAmountModal';
import WithdrawAmountModal from './WithdrawAmountModal';
import AlgoDetailsModal from './AlgoDetailsModal';
import { USDFormat } from '../libs/numberFormat';


function CurrentAlgos(props) {
  const [currentAlgos,setCurrentAlgos] = useState([]);

  

  useEffect(()=>{
    setCurrentAlgos(props.clientAlgos)
    
  },[props.userid,props.clientAlgos]);

  
  
  return (
    
    <div>
        
        <Table responsive variant = "dark" size="sm" striped bordered hover >
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
                  <AddAmountModal userid={props.userid} name={item.name}  min={5000} max={props.summary.amountfree} refresh={props.refresh}/>
                  </Col>  
                  <Col>
                  <WithdrawAmountModal userid={props.userid} name={item.name}  min={5000} max={item.amount} refresh={props.refresh}/>
                  </Col>
                  <Col>
                  <AlgoDetailsModal name={item.name} userid={props.userid} details={props.allAlgosDetails}/>
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
