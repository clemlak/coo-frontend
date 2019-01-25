import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Web3 from 'web3';
import {
  Card,
  CardHeader,
  CardBody,
  Button,
} from 'reactstrap';

import TokenContract from '../../common/contracts/tokenContract';

class DisplayAccount extends Component {
  constructor(props) {
    super(props);

    const {
      address,
    } = this.props;

    this.state = {
      address,
      balance: 0,
    };
  }

  componentDidMount = () => {
    this.updateBalance();
  }

  updateBalance = () => {
    const {
      address,
    } = this.state;

    TokenContract.methods.balanceOf(address).call({
      from: address,
    })
      .then((balance) => {
        this.setState({
          balance,
        });

        console.log(`Balance is ${balance}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  claimFreeTokens = () => {
    const {
      address,
    } = this.state;

    TokenContract.methods.claimFreeTokens(
      Web3.utils.toWei('10000'),
    ).send({
      from: address,
    })
      .then((receipt) => {
        console.log(receipt);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render = () => {
    const {
      address,
      balance,
    } = this.state;

    return (
      <div>
        <Card>
          <CardBody>
            <ul>
              <li>
                Your address is:
                {address}
              </li>
              <li>
                Your balance is:
                {Web3.utils.fromWei(balance.toString())} tokens
              </li>
            </ul>
            <Button color="primary" onClick={this.claimFreeTokens}>
              Claim free tokens
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}

DisplayAccount.propTypes = {
  address: PropTypes.string.isRequired,
};

export default DisplayAccount;
