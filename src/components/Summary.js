import React from 'react';
import {Table} from 'react-bootstrap';
import {USDFormat} from '../libs/numberFormat'
import {Deposit} from './Deposit'
import {Withdraw} from './Withdraw'


function Summary(props) {
    return (
      <div>
        
          <Table variant="dark" striped bordered hover>
            <tbody>
              
              <tr>
                <td>Profit/Loss</td>
                <td>{USDFormat(props.summary.pnl)}</td>
              </tr>
              <tr>
                <td>NPV</td>
                <td>{USDFormat(props.summary.npv)}</td>
              </tr>
              <tr>
                <td>Cash Deposited&nbsp;&nbsp;&nbsp;<Deposit refresh={props.refresh} userid={props.userid} min={5000} max={50000}/></td>
                <td>{USDFormat(props.summary.accountbalance)}</td>
              </tr>
              
              <tr>
                <td>Amount Allocated</td>
                <td>{USDFormat(props.summary.amountallocated)}</td>
              </tr>
              <tr>
                <td>Usage (%)</td>
                <td>{props.summary.usagelevel}</td>
              </tr>
              <tr>
                <td>Amount Free&nbsp;&nbsp;&nbsp;<Withdraw userid={props.userid} min={0} max={props.summary.amountFree}/></td>
                <td>{USDFormat(props.summary.amountfree)}</td>
              </tr>
              
            </tbody>
          </Table>
          
          
          
      </div>
    );
}

export default Summary;
