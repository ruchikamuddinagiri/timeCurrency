import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';


const SidebarData = [  {   title: 'Home', path: '/mainpage',   icon: <FaBars />,  },
                      {    title: 'Tasks',    path: '/tasks',      icon: <FaBars />,  },  
                      {    title: 'Analytics',path: '/analytics',  icon: <FaBars />,  },
                      {  title: 'Profile',    path: '/profile',     icon: <FaBars />,  },   
                      {  title: 'Settings',    path: '/settings',     icon: <FaBars />,  }, 
                      {  title: 'Logout',    path: '/logout',     icon: <FaBars />,  }, ];

const Navbar = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  height: 3.5rem;
  background-color: #000000;
`;

const MenuIconOpen = styled(Link)`
  display: flex;
  justify-content: start;
  font-size: 1.5rem;
  margin-left: 2rem;
  color: #ffffff;
`;

const MenuIconClose = styled(Link)`
  display: flex;
  justify-content: end;
  font-size: 1.5rem;
  margin-top: 0.75rem;
  margin-right: 1rem;
  color: #ffffff;
`;

const SidebarMenu = styled.div<{ close: boolean }>`
  width: 250px;
  height: 100vh;
  background-color: #000000;
  position: fixed;
  top: 0;
  left: ${({ close }) => (close ? '0' : '-100%')};
  transition: 0.6s;
`;

const MenuItems = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 90px;
  padding: 1rem 0 1.25rem;
`;

const MenuItemLinks = styled(Link)`
  display: flex; align-items: center;
  padding: 0 2rem; font-size: 20px;
  text-decoration: none; color: #ffffff;
  &:hover {
    background-color: #ffffff;
    color: #000000;
    width: 100%;
    height: 45px;
    text-align: center;
    border-radius: 5px;
    margin: 0 2rem;
  }
`;

const Sidebar: React.FC = () => {
  const [close, setClose] = useState(false);
  const toggleSidebar = () => setClose(!close);

  return (
    <>
      <Navbar>
        <MenuIconOpen to="#" onClick={toggleSidebar}>
          <FaBars />
        </MenuIconOpen>
      </Navbar>

      <SidebarMenu close={close}>
        <MenuIconClose to="#" onClick={toggleSidebar}>
          <FaTimes />
        </MenuIconClose>

        {SidebarData.map((item, index) => (
          <MenuItems key={index}>
            <MenuItemLinks to={item.path}>
              {item.icon}
              <span style={{ marginLeft: '16px' }}>{item.title}</span>
            </MenuItemLinks>
          </MenuItems>
        ))}
      </SidebarMenu>
      </>
  );
};

export default Sidebar;
