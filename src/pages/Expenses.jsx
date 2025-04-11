import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, Tabs, Tab } from '@mui/material';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [tabValue, setTabValue] = useState(0);

  const handleAddExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const fixedExpenses = expenses.filter(exp => exp.type === 'fixed');
  const variableExpenses = expenses.filter(exp => exp.type === 'variable');
  const debtExpenses = expenses.filter(exp => exp.type === 'debt');

  return (
    <Box sx={{ p: 3, pb: 10 }}>
      <Typography variant="h4" gutterBottom>
        Expenses
      </Typography>
      
      <Tabs value={tabValue} onChange={handleTabChange} aria-label="expense categories">
        <Tab label="All Expenses" />
        <Tab label="Fixed Expenses" />
        <Tab label="Variable Expenses" />
        <Tab label="Debt/Loans" />
      </Tabs>
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <ExpenseForm onAddExpense={handleAddExpense} />
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 2 }}>
            {tabValue === 0 && <ExpenseList expenses={expenses} title="All Expenses" />}
            {tabValue === 1 && <ExpenseList expenses={fixedExpenses} title="Fixed Expenses" />}
            {tabValue === 2 && <ExpenseList expenses={variableExpenses} title="Variable Expenses" />}
            {tabValue === 3 && <ExpenseList expenses={debtExpenses} title="Debt/Loans" />}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}