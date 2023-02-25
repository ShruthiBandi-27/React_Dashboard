
import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from 'reactstrap';

import {Link} from 'react-router-dom';
import './style.css';

export default function NavBar() {
    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);
  
  return (
    <div>
      <Navbar>
        <NavbarBrand href="/" className="me-auto">
          <span className="navbar">Student/Teacher Management</span>
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="me-6 navbar-toggler" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <Link to="/studentlist/" className="nav-link">
              {/* <span className="link-text">Students</span> */}
              <span className="link-text">Students</span>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/teacherlist/" className="nav-link">
              <span className="link-text">Teachers</span>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/studentteacherlist/" className="nav-link">
                <span className="link-text">StudentTeacherList</span>
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
