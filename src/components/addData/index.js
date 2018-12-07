import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
} from 'reactstrap';

import Contract from '../../common/contract';

class AddData extends Component {
  constructor(props) {
    super(props);

    const {
      address,
      certificateId,
      data,
    } = this.props;

    console.log('Current data', data);

    this.state = {
      address,
      certificateId,
      data,
      newData: '',
    };
  }

  componentDidMount = (prevPops, prevState) => {
    console.log('New props:', this.props.data);

    const {
      data,
    } = this.state;

    if (data !== this.props.data) {
      console.log('Pushing new data:', data);
      this.setState({
        data: this.props.data,
      });
    }
  }

  addData = () => {
    const {
      address,
      certificateId,
      data,
      newData,
    } = this.state;

    data.push(newData);

    console.log(data);

    Contract.methods.updateCertificateData(certificateId, data).send({
      from: address,
    })
      .on('transactionHash', (transactionHash) => {
        console.log(`Transaction ${transactionHash} is pending`);
      })
      .on('receipt', (receipt) => {
        console.log(receipt);
      })
      .on('confirmation', (confirmation) => {
        console.log(confirmation);
        console.log('Transaction is confirmed');
      })
      .on('error', (err) => {
        console.log(err.message);
      });
  }

  handleUpdate = (e) => {
    this.setState({
      newData: e.target.value,
    });
  }

  render = () => {
    const {
      newData,
    } = this.state;

    return (
      <div className="py-2">
        <Card>
          <CardBody>
            <InputGroup>
              <Input
                placeholder="File hash"
                value={newData}
                onChange={this.handleUpdate}
              />
              <InputGroupAddon addonType="append">
                <Button color="primary" onClick={this.addData}>
                  Add data
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </CardBody>
        </Card>
      </div>
    );
  }
}

AddData.propTypes = {
  address: PropTypes.string.isRequired,
  certificateId: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AddData;
