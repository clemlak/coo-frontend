import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Collapse,
  Nav,
  Navbar,
  NavItem,
  NavbarToggler,
  NavbarBrand,
} from 'reactstrap';

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
    };
  }

  toggle = () => {
    const {
      isOpen,
    } = this.state;

    this.setState({
      isOpen: !isOpen,
    });
  }

  render = () => {
    const {
      isOpen,
    } = this.state;

    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">COO</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink exact to="/" className="nav-link" activeClassName="active">
                  Dashboard
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink exact to="/marketplace" className="nav-link" activeClassName="active">
                  Marketplace
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink exact to="/new" className="nav-link" activeClassName="active">
                  New certificate
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
