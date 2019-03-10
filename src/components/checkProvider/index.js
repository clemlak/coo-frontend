import React, { Component } from 'react';
import Web3 from 'web3';

import WrongNetwork from '../wrongNetwork';
import UnlockMetaMask from '../unlockMetaMask';
import InstallMetaMask from '../installMetaMask';
import UnlockAccount from '../unlockAccount';

import App from '../app';

class CheckProvider extends Component {
  constructor(props) {
    super(props);

    this.networkId = 3;

    this.state = {
      isMetaMaskInstalled: false,
      isMetaMaskUnlocked: false,
      networkId: -1,
      address: '',
    };
  }

  componentDidMount = () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);

      window.ethereum.enable()
        .then(() => {
          this.isMetaMaskInstalled();
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);

      this.isMetaMaskInstalled();
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    const {
      isMetaMaskInstalled,
      isMetaMaskUnlocked,
      networkId,
      address,
    } = this.state;

    if (
      isMetaMaskInstalled !== prevState.isMetaMaskInstalled
      || isMetaMaskUnlocked !== prevState.isMetaMaskUnlocked
      || networkId !== prevState.networkId
      || address !== prevState.address
    ) {
      this.isMetaMaskInstalled();
    }
  }

  getAddress = () => {
    window.web3.eth.getAccounts()
      .then((accounts) => {
        this.setState({
          address: accounts[0],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getNetwork = () => {
    window.web3.eth.net.getId()
      .then((networkId) => {
        this.setState({
          networkId,
        });

        this.getAddress();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  isMetaMaskInstalled = () => {
    if (Web3.givenProvider) {
      this.setState({
        isMetaMaskInstalled: true,
      });
    }

    this.isMetaMaskUnlocked();
  }

  isMetaMaskUnlocked = () => {
    window.web3.eth.getAccounts()
      .then((accounts) => {
        if (accounts.length > 0) {
          this.setState({
            isMetaMaskUnlocked: true,
          });

          this.getNetwork();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  checkMetaMask = () => {
    const {
      isMetaMaskInstalled,
      isMetaMaskUnlocked,
      networkId,
      address,
    } = this.state;

    if (isMetaMaskInstalled === false) {
      return <InstallMetaMask />;
    }

    if (isMetaMaskUnlocked === false) {
      return <UnlockMetaMask />;
    }

    if (networkId !== this.networkId) {
      return <WrongNetwork />;
    }

    if (address === '') {
      return <UnlockAccount />;
    }

    return <App address={address} />;
  }

  render() {
    return (
      <div>
        {this.checkMetaMask()}
      </div>
    );
  }
}

export default CheckProvider;
