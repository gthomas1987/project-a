import React,{useState,useEffect} from 'react';
import {Modal,Button,Form} from 'react-bootstrap'
import config from '../config';
import './Dashboard.css';

function AddAmountModal(props) {
  
  const [show, setShow] = useState(false);
  const [items, setItems] = useState([]);
  const [amount, setAmount] = useState(5000);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const AmountValue = (e) => setAmount(e.target.value);

  useEffect(()=>{
    const itemsToAdd=[]
    setAmount(5000)
    for (var i=props.min;i<=props.max;i=i+props.min){
      itemsToAdd.push(i)
    }
    setItems(itemsToAdd)
  },[props.max,props.min]);
  
  const handleAdd = (event) => {
    event.preventDefault();
    setShow(false)
    UpdateAmount();
    props.refresh()
  }

  const UpdateAmount = async() => {
    try {
      const data = {"userid":props.userid,"algoname":props.name,"amount":{amount}.amount,"action":"add"}
      await fetch(config.apiGateway.URL+'/updateAmount', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
          'Content-Type': 'application/json'
        }
      });
      //const json = await response.json();
      //console.log('Success:', JSON.stringify(json));
    } catch (error) {
      //console.error('Error:', error);
    }
  }
  

  return (
    <>
      <Button size="sm" variant="outline-success" onClick={handleShow} block>
        Add
      </Button>
      <Form>
      <Modal className="my-modal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">{props.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          
          <Form.Group className="modal-title" controlId="exampleForm.ControlSelect1">
            <Form.Label>Amount To Add</Form.Label>
            <Form.Control defaultValue="5000" onChange = {AmountValue} as="select">
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


export default AddAmountModal;
