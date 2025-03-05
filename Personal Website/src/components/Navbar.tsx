import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Layout, Menu, Dropdown, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import '../typography.css'; 

const { Header } = Layout;

const Navbar: React.FC = () => {
  const location = useLocation();

  // Determine if the viewport is small
  const isSmallScreen = useMediaQuery({ maxWidth: 768 });

  // Determine the active menu item based on the current location path
  const getSelectedKey = () => {
    switch (location.pathname) {
      case '/Resume':
        return '2';
      case '/Projects':
        return '3';
      case '/Contact':
        return '4';
      case '/':
      default:
        return '1';
    }
  };

  // Define the menu items with `Link` for navigation
  const items = [
    { key: '1', label: <Link to="/">About me</Link> },
    { key: '2', label: <Link to="/Resume">Resume</Link> },
    { key: '3', label: <Link to="/Projects">Projects</Link> },
    { key: '4', label: <Link to="/Contact">Contact</Link> },
  ];

  // Dropdown menu for small screens
  const dropdownMenu = (
      <Menu
      items={items.map(item => ({
        key: item.key,
        label: item.label,
        style: {
          fontSize: '18px', // Change text size
          fontWeight: 'bold', // Make text bold
          padding: '12px 20px', // Increase spacing

        },
      }))}
      style={{
        backgroundColor: 'white', // Light background
        borderStyle: 'double', // Double border
        borderRadius: '0px', // No border radius
        border: '2px',
        padding: '10px 0', // Vertical spacing
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)', // Shadow effect
      }}
    />
  );

  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        padding: '15px 25px', // Adjusted padding for height
        height: '90px', // Explicit height of the navbar
        backgroundColor: 'white', // White background
        borderBottom: 'none', // Remove bottom border
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow effect
        justifyContent: 'space-between', // Ensures spacing for small screens
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: isSmallScreen ? '65%' : 'auto', // Shrinks to 65% width on small screens
          transition: 'width 0.3s ease-in-out', // Smooth transition
        }}
      >
        <h2
          style={{
            fontFamily: '"Poppins", sans-serif',
            fontSize: 'clamp(1rem, 3vw, 1.7rem)', // Adjusts between 1rem and 1.7rem
            color: 'Black',
            whiteSpace: 'nowrap',
            marginLeft: isSmallScreen ? '40px' : '0px',
          }}
        >
          Jerry Wang
        </h2>
        <h2
          style={{
            fontFamily: '"Poppins", sans-serif',
            fontSize: 'clamp(0.9rem, 2.5vw, 1.5rem)', // Adjusts between 0.9rem and 1.5rem
            fontWeight: 'normal',
            color: 'Black',
            marginLeft: '3px',
            whiteSpace: 'nowrap',
            marginTop: '2px',
          }}
        >
          \ Software Developer
        </h2>
      </div>

      {isSmallScreen ? (
        <Dropdown overlay={dropdownMenu} trigger={['click']} placement="bottomRight">
          <Button
            icon={<MenuOutlined style={{ fontSize: '26px' }} />} // Adjust the icon size
            shape="circle"
            style={{
              width: '50px', 
              height: '50px', 
              fontSize: '24px', 
              backgroundColor: '#001529', 
              color: '#fff', 
              border: 'none', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
            }}
          />
        </Dropdown>
      ) : (
        <Menu
          mode="horizontal"
          selectedKeys={[getSelectedKey()]} // Only highlight active page on larger screens
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
            marginLeft: '10px',
            display: 'flex',
            justifyContent: 'right',
            borderBottom: 'none', 
            backgroundColor: 'white', 
          }}
        />
      )}
    </Header>
  );
};

export default Navbar;
