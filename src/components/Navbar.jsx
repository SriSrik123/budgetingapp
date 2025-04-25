import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BottomNavigation, 
  BottomNavigationAction,
  IconButton,
  Box,
  Tooltip
} from '@mui/material';
import { 
  Home, 
  AttachMoney, 
  Savings, 
  Receipt, 
  Settings,
  Brightness4,
  Brightness7
} from '@mui/icons-material';

export default function Navbar({ darkMode, toggleDarkMode }) {
  const [value, setValue] = React.useState(0);

  return (
    <>
      <Box sx={{ 
        position: 'fixed', 
        top: 0, 
        right: 0, 
        p: 1,
        zIndex: 1000 
      }}>
        <Tooltip title={`Switch to ${darkMode ? 'light' : 'dark'} mode`}>
          <IconButton onClick={toggleDarkMode} color="inherit">
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Tooltip>
      </Box>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        style={{ position: 'fixed', bottom: 0, width: '100%' }}
      >
        <BottomNavigationAction label="Dashboard" icon={<Home />} component={Link} to="/" />
        <BottomNavigationAction label="Income" icon={<AttachMoney />} component={Link} to="/income" />
        <BottomNavigationAction label="Expenses" icon={<Receipt />} component={Link} to="/expenses" />
        <BottomNavigationAction label="Savings" icon={<Savings />} component={Link} to="/savings" />
        <BottomNavigationAction label="Settings" icon={<Settings />} component={Link} to="/settings" />
        <BottomNavigationAction label="Sign Up" icon={<Savings />} component={Link} to="/signup" />
      </BottomNavigation>
    </>
  );
}