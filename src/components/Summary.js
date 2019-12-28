import React from 'react';
import {Table} from 'react-bootstrap';
import {USDFormat} from '../libs/numberFormat'

function Summary(props) {
  
  return (
    <div>
        <Table striped bordered hover>
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
              <td>Cash Deposited</td>
              <td>{USDFormat(props.summary.accountbalance)}</td>
            </tr>
            <tr>
              <td>Margin Used</td>
              <td>{USDFormat(props.summary.marginused)}</td>
            </tr>
            <tr>
              <td>Margin(%)</td>
              <td>{props.summary.marginlevel}</td>
            </tr>
            <tr>
              <td>Margin Free</td>
              <td>{USDFormat(props.summary.marginfree)}</td>
            </tr>
            
          </tbody>
        </Table>
    </div>
  );
}

export default Summary;
