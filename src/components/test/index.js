import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Relayerlib from '../../services/relayerlib';

class Test extends Component {
  constructor(props) {
    super(props);

    const {
      address,
    } = this.props;

    this.state = {
      address,
    };

    this.relayerlib = new Relayerlib('http://localhost:3002', address, '');
  }

  createCertificate = () => {
    const {
      address,
    } = this.state;

    const testCertificate = {
      assetId: 0,
      name: 'iPhone',
      label: 'Label',
      price: 200,
      timestamp: Math.round(Date.now() / 1000),
      factomEntryHash: 'FactomEntryHash',
      anotherEncryptionKey: 'AnotherEncryptionKey',
      data: 'randomDataHash',
    };

    this.relayerlib.sendMetaTx(address, 'MetaCOO', 'metaCreateCertificate', testCertificate)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render = () => {
    return (
      <div>
        <button onClick={this.createCertificate}>
          Create certificate
        </button>
      </div>
    );
  }
}

Test.propTypes = {
  address: PropTypes.string.isRequired,
};

export default Test;
