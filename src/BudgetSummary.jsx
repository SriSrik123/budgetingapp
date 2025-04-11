import React from 'react';
import { Typography, LinearProgress, Box } from '@mui/material';

export default function BudgetSummary({ income, expenses, savings }) {
  const remaining = income - expenses - savings;
  const expensePercentage = income > 0 ? (expenses / income) * 100 : 0;
  const savingsPercentage = income > 0 ? (savings / income) * 100 : 0;
  const remainingPercentage = income > 0 ? (remaining / income) * 100 : 0;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Budget Summary
      </Typography>
      
      <Box mb={2}>
        <Typography>Income: ${income.toFixed(2)}</Typography>
      </Box>
      
      <Box mb={2}>
        <Typography>Expenses: ${expenses.toFixed(2)}</Typography>
        <LinearProgress variant="determinate" value={expensePercentage} color="error" />
        <Typography variant="caption">{expensePercentage.toFixed(1)}% of income</Typography>
      </Box>
      
      <Box mb={2}>
        <Typography>Savings: ${savings.toFixed(2)}</Typography>
        <LinearProgress variant="determinate" value={savingsPercentage} color="success" />
        <Typography variant="caption">{savingsPercentage.toFixed(1)}% of income</Typography>
      </Box>
      
      <Box mb={2}>
        <Typography>Remaining: ${remaining.toFixed(2)}</Typography>
        <LinearProgress variant="determinate" value={remainingPercentage} color="info" />
        <Typography variant="caption">{remainingPercentage.toFixed(1)}% of income</Typography>
      </Box>
    </Box>
  );
}