import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, Tabs, Tab } from '@mui/material';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem('expensesList');
    if (stored) {
      const parsed = JSON.parse(stored);
      setExpenses(parsed);
    }
  }, []);

  const handleAddExpense = (newExpense) => {
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    const total = updatedExpenses.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0);
    localStorage.setItem('totalExpenses', total);
    localStorage.setItem('expensesList', JSON.stringify(updatedExpenses));
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const fixedExpenses = expenses.filter(exp => exp.type === 'fixed');
  const variableExpenses = expenses.filter(exp => exp.type === 'variable');
  const debtExpenses = expenses.filter(exp => exp.type === 'debt');

  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + parseFloat(exp.amount || 0);
    return acc;
  }, {});
  
  const pieChartData = Object.entries(categoryTotals).map(([category, total]) => ({
    name: category,
    value: total,
  }));

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
          <Grid container spacing={2}>
            <Grid item xs={12} md={7}>
              <Paper elevation={3} sx={{ p: 2 }}>
                {tabValue === 0 && <ExpenseList expenses={expenses} title="All Expenses" />}
                {tabValue === 1 && <ExpenseList expenses={fixedExpenses} title="Fixed Expenses" />}
                {tabValue === 2 && <ExpenseList expenses={variableExpenses} title="Variable Expenses" />}
                {tabValue === 3 && <ExpenseList expenses={debtExpenses} title="Debt/Loans" />}
              </Paper>
            </Grid>
            <Grid item xs={12} md={5}>
              <Typography variant="h6" gutterBottom>
                Expense Overview by Category
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`hsl(${(index / pieChartData.length) * 360}, 70%, 50%)`} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}