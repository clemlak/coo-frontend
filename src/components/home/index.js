import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Home extends Component {
  constructor(props) {
    super(props);

    const {
      address,
    } = this.props;

    this.state = {
      address,
    };
  }

  render = () => {
    const {
      address,
    } = this.state;

    return (
      <div>
        <p>
          {address}
        </p>
      </div>
    );
  }
}

Home.propTypes = {
  address: PropTypes.string.isRequired,
};

export default Home;
