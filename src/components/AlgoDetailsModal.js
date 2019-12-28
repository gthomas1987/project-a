import React,{useState,useEffect} from 'react';
import {Modal,Button,Form,Table,Card,Accordion} from 'react-bootstrap'

function AlgoDetailsModal(props) {
  
  const [show, setShow] = useState(false);
  const [positions, setPositions] = useState([]);
  const [trades, setTrades] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(()=>{
    
    const data = {"algoname":props.name}
    fetch('http://localhost:5000/getalgodetails', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response=>response.json())
      .then(data=>{
        console.log(data)
        console.log(data.trades)
        setPositions(data.positions)
        setTrades(data.trades)
      })
      .catch(error=>console.log(error));
  },[props.name]);
  

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Details
      </Button>
      <Form>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Accordion defaultActiveKey="0">
          <Card>
            <Card.Header>
              
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Positions
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Security</th>
                    <th>Symbol</th>
                    <th>Exchange</th>
                    <th>Currency</th>
                    <th>Position</th>
                    <th>Avg Cost</th>
                    <th>Current Px</th>
                    <th>Profit/Loss</th>
                  </tr>
                </thead>
                <tbody>
                  
                    {positions.map((item,key)=>(
                      <tr key ={key}>
                        <td>{item.security}</td>
                        <td>{item.symbol}</td>
                        <td>{item.exchange}</td>
                        <td>{item.ccy}</td>
                        <td>{item.amount}</td>
                        <td>{item.avgcost}</td>
                        <td>{item.currentprice}</td>
                        <td>{item.pnl}</td>
                      </tr>
                      ))}
                  
                </tbody>
              </Table>
                
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                Trades
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Security</th>
                      <th>Symbol</th>
                      <th>Exchange</th>
                      <th>Currency</th>
                      <th>Size</th>
                      <th>Direction</th>
                      <th>Price</th>
                      <th>Trade Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    
                      {trades.map((item,key)=>(
                        <tr key ={key}>
                          <td>{item.security}</td>
                          <td>{item.symbol}</td>
                          <td>{item.exchange}</td>
                          <td>{item.ccy}</td>
                          <td>{item.size}</td>
                          <td>{item.direction}</td>
                          <td>{item.tradedprice}</td>
                          <td>{item.time}</td>
                        </tr>
                        ))}
                    
                  </tbody>
                </Table>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </Form>
    </>
  );
}


export default AlgoDetailsModal;
