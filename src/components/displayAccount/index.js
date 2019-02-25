import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Web3 from 'web3';
import {
  Button,
  Row,
  Col,
} from 'reactstrap';

import TokenContract from '../../common/contracts/tokenContract';

import Herc from '../../common/img/herc.png';

class DisplayAccount extends Component {
  constructor(props) {
    super(props);

    const {
      address,
    } = this.props;

    this.state = {
      address,
      balance: 0,
      buttonText: 'Purchase HERC Tokens',
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
        <Row className="justify-content-center account__background py-2">
          <Col>
            <Row className="justify-content-center align-item-center mb-1">
              <Col md="7" className="text-center account__secondary-background py-2">
                <h5 className="text-light mb-3">Your balance</h5>
                <Row className="justify-content-center">
                  <Col md="3" className="text-right">
                    <h3 className="account__balance">
                      {Web3.utils.fromWei(balance.toString())}
                    </h3>
                    <p className="mb-0 text-white">
                      HERC
                    </p>
                  </Col>
                  <Col md="1" className="text-left">
                    <img src={Herc} alt="Herc" />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="justify-content-center align-item-center">
              <Col md="4" className="py-2">
                <Row className="mb-1">
                  <Col>
                    <p className="text-white mb-0">
                      Your address
                    </p>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col>
                    <div className="account__address align-item-center">
                      <p className="small mb-0 text-light">
                        {address}
                      </p>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col className="text-center">
                    <Button
                      color="primary"
                      size="sm"
                      onClick={this.claimFreeTokens}
                      disabled={txState !== 'null' && true}
                    >
                      {buttonText}
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

DisplayAccount.propTypes = {
  address: PropTypes.string.isRequired,
};

export default DisplayAccount;
