import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  InputBase,
  Box,
  Typography,
  Tooltip,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Search,
  Dashboard,
  Chat,
  Apps,
  Settings,
  Logout,
} from '@mui/icons-material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import HexaLayerImage from '../assests/images/HexaLayer.png';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import DnsIcon from '@mui/icons-material/Dns';

// Custom search bar container styling
const SearchContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: '5px 10px',
  borderRadius: '15px',
  margin: '20px 10px',
  backgroundColor: '#131D3B',
}));

const iconStyles = {
  color: '#fff',
  marginRight: '16px',
};

const LeftSidebar: React.FC<{
  open: boolean;
  setSidebarOpen: (open: boolean) => void;
}> = ({ open, setSidebarOpen }) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm')); // Detect mobile view
  const theme = useTheme(); // Access theme for background color

  const [selectedItem, setSelectedItem] = useState<string>('Dashboard'); // Track selected item

  const handleNavigation = (path: string, label: string) => {
    setSelectedItem(label); // Set selected item
    navigate(path);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!open);
  };

  const menuItemStyles = (label: string) => ({
    backgroundColor:
      selectedItem === label ? theme.palette.background.default : 'transparent', // Highlight selected with background color
    paddingLeft: selectedItem === label ? '20px' : '10px', // Add extra padding for selected item
    borderRadius: selectedItem === label ? '12px 0px 0px 12px' : '0px', // Only left top and left bottom radius
    padding: '10px', // Add padding for better spacing
    marginLeft: selectedItem === label ? '15px' : '0px',
    boxShadow: selectedItem === label ? '0px 4px 6px rgba(0, 0, 0, 0.2)' : 'none', // Subtle shadow effect
    transition: 'all 0.3s ease', // Smooth transition for all properties
    '&:hover': {
      backgroundColor: theme.palette.action.hover, // Change background on hover
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Increase shadow on hover
    },
  });

  return (
    <Drawer
      sx={{
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: isMobile ? '100%' : 260, // Full width on mobile
          height: isMobile ? '50%' : '100%', // Half height on mobile
          boxSizing: 'border-box',
          backgroundColor: '#202940',
          color: 'white',
        },
      }}
      variant="persistent"
      anchor={isMobile ? 'top' : 'left'} // Change anchor dynamically
      open={open}
    >
      {/* Logo and Title */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '20px',
          borderBottom: '1px solid #3c3c3c',
        }}
      >
        <img src={HexaLayerImage} alt="HexaLayer Logo" height={30} width={30} />
        <Typography variant="h6" sx={{ color: 'white', flexGrow: 1, fontFamily: 'roboto' }}>
          HexaShield
        </Typography>
        {/* Toggle Sidebar Button */}
        <Button variant="contained" onClick={toggleSidebar}>
          <MenuOpenIcon />
        </Button>
      </Box>

      {/* Search Bar */}
      <SearchContainer>
        <Search sx={{ color: '#fff' }} />
        <InputBase
          placeholder="Search"
          sx={{ color: 'white', marginLeft: '10px', flexGrow: 1 }}
        />
      </SearchContainer>

      <Divider />

      {/* Menu Items */}
      <List>
        <Tooltip title="Dashboard">
          <ListItemButton
            onClick={() => handleNavigation('/', 'Dashboard')}
            sx={menuItemStyles('Dashboard')}
          >
            <Dashboard sx={iconStyles} />
            <ListItemText primary="Dashboard" sx={{ color: '#fff' }} />
          </ListItemButton>
        </Tooltip>

        <Tooltip title="Chats">
          <ListItemButton
            onClick={() => handleNavigation('/conversations', 'Chats')}
            sx={menuItemStyles('Chats')}
          >
            <Chat sx={iconStyles} />
            <ListItemText primary="Chats" sx={{ color: '#fff' }} />
          </ListItemButton>
        </Tooltip>

        <Tooltip title="Tasks">
          <ListItemButton
            onClick={() => handleNavigation('/agents', 'Agents')}
            sx={menuItemStyles('Agents')}
          >
            <DnsIcon sx={iconStyles} />
            <ListItemText primary="Agents" sx={{ color: '#fff' }} />
          </ListItemButton>
        </Tooltip>

        <Tooltip title="Reports">
          <ListItemButton
            onClick={() => handleNavigation('/reports', 'Reports')}
            sx={menuItemStyles('Reports')}
          >
            <Apps sx={iconStyles} />
            <ListItemText primary="Reports" sx={{ color: '#fff' }} />
          </ListItemButton>
        </Tooltip>
      </List>

      <Divider />

      {/* Bottom Menu Items */}
      <List sx={{ marginTop: 'auto' }}>
        <Tooltip title="User Settings">
          <ListItemButton
            onClick={() => handleNavigation('/user-profile', 'User Settings')}
            sx={menuItemStyles('User Settings')}
          >
            <Settings sx={iconStyles} />
            <ListItemText primary="User Settings" sx={{ color: '#fff' }} />
          </ListItemButton>
        </Tooltip>

        <Tooltip title="Logout">
          <ListItemButton
            onClick={() => handleNavigation('/login', 'Logout')}
            sx={menuItemStyles('Logout')}
          >
            <Logout sx={iconStyles} />
            <ListItemText primary="Logout" sx={{ color: '#fff' }} />
          </ListItemButton>
        </Tooltip>
      </List>
    </Drawer>
  );
};

export default LeftSidebar;
