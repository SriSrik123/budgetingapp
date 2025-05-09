import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Switch, 
  FormControlLabel, 
  TextField, 
  Button,
  MenuItem 
} from '@mui/material';

export default function Settings({ darkMode, toggleDarkMode }) {
  const [settings, setSettings] = useState({
    darkMode: darkMode,
    currency: 'USD',
    notifications: true
  });

  useEffect(() => {
    setSettings(prev => ({
      ...prev,
      darkMode: darkMode
    }));
  }, [darkMode]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    const newSettings = {
      ...settings,
      [name]: name === 'darkMode' || name === 'notifications' ? checked : value
    };
    
    setSettings(newSettings);
    
    if (name === 'darkMode') {
      toggleDarkMode();
    }
  };

  return (
    <Box sx={{ p: 3, pb: 10 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          App Preferences
        </Typography>
        
        <FormControlLabel
          control={
            <Switch
              checked={settings.darkMode}
              onChange={handleChange}
              name="darkMode"
            />
          }
          label="Dark Mode"
        />
        
        <FormControlLabel
          control={
            <Switch
              checked={settings.notifications}
              onChange={handleChange}
              name="notifications"
            />
          }
          label="Enable Notifications"
        />
        
        <TextField
          select
          label="Currency"
          name="currency"
          value={settings.currency}
          onChange={handleChange}
          fullWidth
          sx={{ mt: 2 }}
        >
          <MenuItem value="USD">US Dollar ($)</MenuItem>
          <MenuItem value="EUR">Euro (€)</MenuItem>
          <MenuItem value="GBP">British Pound (£)</MenuItem>
          <MenuItem value="JPY">Japanese Yen (¥)</MenuItem>
        </TextField>
      </Paper>
      
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Data Management
        </Typography>
        
        <Button variant="contained" color="primary" sx={{ mr: 2 }}>
          Export Data
        </Button>
        
        <Button variant="contained" color="secondary">
          Reset All Data
        </Button>
      </Paper>
    </Box>
  );
}