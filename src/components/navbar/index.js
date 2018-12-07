import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Nav,
  NavItem,
} from 'reactstrap';

const Navbar = () => (
  <div>
    <Nav pills>
      <NavItem>
        <NavLink exact to="/" className="nav-link" activeClassName="active">
          My certificates
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink exact to="/new" className="nav-link" activeClassName="active">
          Create new certificate
        </NavLink>
      </NavItem>
    </Nav>
  </div>
);

export default Navbar;
