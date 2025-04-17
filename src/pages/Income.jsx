import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemText,
  Grid 
} from '@mui/material';
import IncomeForm from '../components/IncomeForm';

export default function Income() {
  const [incomeSources, setIncomeSources] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    const savedSources = localStorage.getItem('incomeSources');
    const savedTotal = localStorage.getItem('totalIncome');
    if (savedSources) setIncomeSources(JSON.parse(savedSources));
    if (savedTotal) setTotalIncome(parseFloat(savedTotal));
  }, []);

  const handleAddIncome = (newIncome) => {
    const updatedSources = [...incomeSources, newIncome];
    const updatedTotal = totalIncome + parseFloat(newIncome.amount);
    setIncomeSources(updatedSources);
    setTotalIncome(updatedTotal);
    localStorage.setItem('incomeSources', JSON.stringify(updatedSources));
    localStorage.setItem('totalIncome', updatedTotal.toString());
  };

  return (
    <Box sx={{ p: 3, pb: 10 }}>
      <Typography variant="h4" gutterBottom>
        Income
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <IncomeForm onAddIncome={handleAddIncome} />
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Income Sources
            </Typography>
            <List>
              {incomeSources.map((source, index) => (
                <ListItem key={index}>
                  <ListItemText 
                    primary={source.source} 
                    secondary={`$${parseFloat(source.amount).toFixed(2)} - ${source.frequency}`} 
                  />
                </ListItem>
              ))}
            </List>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Total Monthly Income: ${totalIncome.toFixed(2)}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}