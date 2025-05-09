import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import BudgetSummary from '../components/BudgetSummary';
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

export default function Dashboard() {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [savings, setSavings] = useState(0);

  useEffect(() => {
    const savedIncome = localStorage.getItem('totalIncome');
    const savedExpenses = localStorage.getItem('totalExpenses');
    const savedSavings = localStorage.getItem('totalSavings');
    if (savedIncome) setIncome(parseFloat(savedIncome));
    if (savedExpenses) setExpenses(parseFloat(savedExpenses));
    if (savedSavings) setSavings(parseFloat(savedSavings));
  }, []);

  const chartData = {
    labels: ['Income', 'Expenses', 'Savings'],
    datasets: [
      {
        label: 'Amount ($)',
        data: [income, expenses, savings],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <Box sx={{ p: 3, pb: 10 }}>
      <Typography variant="h4" gutterBottom>
        Budget Overview
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <BudgetSummary 
              income={income}
              expenses={expenses}
              savings={savings}
            />
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Transactions
            </Typography>
            {/* Transaction list would go here */}
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Financial Overview Chart
            </Typography>
            <Line data={chartData} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}