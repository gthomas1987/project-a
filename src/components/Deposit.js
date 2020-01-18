import React,{useState,useEffect} from 'react';
import {Modal,Button,Form} from 'react-bootstrap'
import config from '../config';
import './Dashboard.css';

export function Deposit(props) {
  
  const [show, setShow] = useState(false);
  const [items, setItems] = useState([]);
  const [amount, setAmount] = useState(5000);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const AmountValue = (e) => setAmount(e.target.value);
  

  useEffect(()=>{
    const itemsToAdd=[]
    for (var i=props.min;i<=props.max;i=i+props.min){
      itemsToAdd.push(i)
    }
    setItems(itemsToAdd)
  },[props.max,props.min]);
  
  
  const handleAdd = (event) => {
    event.preventDefault();
    setShow(false)
    UpdateCash();
  }
  

  const UpdateCash = async() => {
    
    console.log(config.apiGateway.URL)
    const data = {"userid":sessionStorage.getItem("userid"),"accounttype":sessionStorage.getItem("accounttype"),"amount":{amount}.amount,"action":"add"}
    await fetch(config.apiGateway.URL+'/updateCash', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response=>response.json())
      .then(data=>{
        console.log("Deposit Update Cash API")
        console.log(data)
        props.refresh()
      })
    }
  

  return (
    <>
      <Button size="sm" variant="outline-success" onClick={handleShow}>
        Deposit
      </Button>
      <Form >
      <Modal className="my-modal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="modal-title" >Deposit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <Form.Group className="modal-title" controlId="exampleForm.ControlSelect1">
            <Form.Label>Amount To Deposit</Form.Label>
            <Form.Control onChange = {AmountValue} as="select">
              {items.map((item,key)=>(
                <option key={key}>{item}</option>
              ))}
              
            </Form.Control>
          </Form.Group>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type = "submit"variant="primary" onClick={handleAdd}>
            Add Amount
          </Button>
        </Modal.Footer>
      </Modal>
      </Form>
    </>
  );
}

