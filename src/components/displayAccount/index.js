import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Web3 from 'web3';
import {
  Card,
  CardBody,
  Button,
  Input,
  Row,
  Col,
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
      buttonText: 'Claim free tokens',
      txState: 'null',
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
      })
      .catch((err) => {
        console.log(err);
      });
  }

  claimFreeTokens = () => {
    const {
      address,
    } = this.state;

    this.setState({
      buttonText: 'Waiting approval in MetaMask...',
      txState: 'waitingApproval',
    });

    TokenContract.methods.claimFreeTokens(
      Web3.utils.toWei('10000'),
    ).send({
      from: address,
    })
      .on('transactionHash', () => {
        this.setState({
          buttonText: 'Transaction is pending...',
          txState: 'pending',
        });
      })
      .on('confirmation', () => {
        this.setState({
          buttonText: 'Transaction is confirmed!',
          txState: 'confirmed',
        });
      })
      .on('error', (err) => {
        this.setState({
          buttonText: err.message,
          txState: 'error',
        });
      });
  }

  render = () => {
    const {
      address,
      balance,
      buttonText,
      txState,
    } = this.state;

    return (
      <div>
        <p className="h5 mb-3">
          Your wallet
        </p>
        <Card className="shadow-sm">
          <CardBody>
            <Row className="mb-3">
              <Col className="text-center">
                <p className="mb-0">
                  Your balance
                </p>
                <h3 className="mb-0">
                  {Web3.utils.fromWei(balance.toString())}
                </h3>
                <p className="mb-0 font-weight-bold">
                  HERC
                </p>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col className="text-center">
                <p className="mb-0">
                  Your address
                </p>
                <Input value={address} className="address-input" readOnly />
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  color="primary"
                  size="sm"
                  onClick={this.claimFreeTokens}
                  disabled={txState !== 'null' && true}
                  block
                >
                  {buttonText}
                </Button>
              </Col>
            </Row>
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
