import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Web3 from 'web3';
import {
  Card,
  CardBody,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
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
        <p className="h5 mb-3">
          Your wallet
        </p>
        <Card className="shadow-sm">
          <CardBody>
            <Row className="mb-3">
              <Col className="text-center">
                <p>
                  Your balance
                </p>
                <h3>
                  {Web3.utils.fromWei(balance.toString())}
                </h3>
                <p className="mb-0 font-weight-bold">
                  HERC
                </p>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col className="text-center">
                <p>
                  Your address
                </p>
                <InputGroup>
                  <InputGroupAddon addonType="append">
                    <Input value={address} readOnly />
                    <Button>Copy</Button>
                  </InputGroupAddon>
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button color="primary" size="sm" onClick={this.claimFreeTokens} block>
                  Claim free tokens
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
