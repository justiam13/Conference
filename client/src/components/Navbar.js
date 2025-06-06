import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';

const Nav = styled.nav`
  background: #1a1a1a;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  position: sticky;
  top: 0;
  z-index: 999;
`;

const NavLogo = styled(Link)`
  color: #fff;
  font-size: 2rem;
  font-weight: bold;
  text-decoration: none;
`;

const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 90vh;
    position: absolute;
    top: 80px;
    left: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    opacity: 1;
    transition: all 0.5s ease;
    background: #1a1a1a;
  }
`;

const NavItem = styled.li`
  height: 80px;
  padding: 0 1rem;
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  height: 100%;
  display: flex;
  align-items: center;

  &:hover {
    color: #00ff00;
    transition: all 0.2s ease-in-out;
  }
`;

const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    color: #fff;
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navItems, setNavItems] = useState([
    { title: 'Home', path: '/' },
    { title: 'About Us', path: '/about-us' },
    { title: 'CFP', path: '/cfp' },
    { title: 'Schedule', path: '/schedule' },
    { title: 'Contact', path: '/contact' },
    { title: 'Login', path: '/auth' },
  ]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Nav>
      <NavLogo to="/">Conference</NavLogo>
      <MobileIcon onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </MobileIcon>
      <NavMenu isOpen={isOpen}>
        {navItems.map((item, index) => (
          <NavItem key={index}>
            <NavLink to={item.path} onClick={() => setIsOpen(false)}>
              {item.title}
            </NavLink>
          </NavItem>
        ))}
      </NavMenu>
    </Nav>
  );
};

export default Navbar; 