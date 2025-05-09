import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, Tabs, Tab } from '@mui/material';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

  const chartData = {
    labels: expenses.map((exp, i) => `Expense ${i + 1}`),
    datasets: [
      {
        label: 'Expense Amount ($)',
        data: expenses.map(exp => parseFloat(exp.amount || 0)),
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  };

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
          <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Expense Overview Chart
            </Typography>
            <Line data={chartData} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}