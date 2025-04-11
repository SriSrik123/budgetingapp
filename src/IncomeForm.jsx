import React, { useState } from 'react';
import { TextField, Button, MenuItem, Grid } from '@mui/material';

export default function IncomeForm({ onAddIncome }) {
  const [income, setIncome] = useState({
    source: '',
    amount: '',
    frequency: 'monthly'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncome(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (income.source && income.amount) {
      onAddIncome(income);
      setIncome({
        source: '',
        amount: '',
        frequency: 'monthly'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Income Source"
            name="source"
            value={income.source}
            onChange={handleChange}
            required
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Amount"
            name="amount"
            type="number"
            value={income.amount}
            onChange={handleChange}
            inputProps={{ step: "0.01" }}
            required
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            label="Frequency"
            name="frequency"
            value={income.frequency}
            onChange={handleChange}
          >
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="bi-weekly">Bi-Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="annually">Annually</MenuItem>
          </TextField>
        </Grid>
        
        <Grid item xs={12}>
          <Button type="submit" variant="contained" fullWidth>
            Add Income Source
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}