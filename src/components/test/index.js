import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Relayerlib from '../../services/relayerlib';

class Test extends Component {
  constructor(props) {
    super(props);

    const {
      address,
    } = this.props;

    this.relayerlib = new Relayerlib('http://localhost:3000', address);
  }


}

Test.propTypes = {
  address: PropTypes.string.isRequired,
};

export default Test;
