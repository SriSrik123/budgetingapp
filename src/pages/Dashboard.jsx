import React, { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  AppBar,
  Toolbar,
  Container,
  Button
} from '@mui/material';
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

  const funFacts = [
    "People who budget save an average of 20% more each year than those who don't.",
    "Using cash instead of a card can help reduce impulse spending by up to 30%.",
    "50% of Americans don't have a budget — but those who do feel more in control of their finances.",
    "Budgeting just 10 minutes a week can lead to major improvements in savings and debt reduction.",
    "Creating a grocery budget can reduce monthly food expenses by up to 25%.",
    "The 50/30/20 rule is a popular budgeting method: 50% needs, 30% wants, 20% savings."
  ];

  const getRandomFact = () => {
    const randomIndex = Math.floor(Math.random() * funFacts.length);
    return funFacts[randomIndex];
  };

  const [currentFact, setCurrentFact] = useState(getRandomFact());

  const handleNewFact = () => {
    setCurrentFact(getRandomFact());
  };

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
    <>
      {/* AppBar with logo and title */}
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            <img
              src="logo192.png"
              alt="Logo"
              style={{ height: 40, marginRight: 10 }}
            />
            <Typography variant="h6" component="div">
              Budgeting App
            </Typography>
          </Box>
          <Typography variant="h6" component="div">
            About Us
          </Typography>
        </Toolbar>
      </AppBar>

      {/* About Us content */}
      <Container sx={{ my: 4 }}>
        <Typography variant="h5" gutterBottom>
          Welcome to Budgeting App!
        </Typography>
        <Typography variant="body1">
          Our mission is to help users take control of their finances by tracking income,
          expenses, and savings all in one place. Managing your money shouldn’t be stressful or complicated.
          Our budgeting app simplifies the way you track your spending, set savings goals, and plan for the future.
        </Typography>
      </Container>

      {/* Main Content */}
      <Box sx={{ p: 3, pb: 10 }}>
        <Typography variant="h4" gutterBottom>
          Budget Overview
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <BudgetSummary income={income} expenses={expenses} savings={savings} />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Recent Transactions
              </Typography>
              {/* Add transaction list here */}
            </Paper>
          </Grid>

          {/* Fun Fact Section */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 2, backgroundColor: '#e8f5e9' }}>
              <Typography variant="h6" gutterBottom>
                💡 Budgeting Fun Fact
              </Typography>
              <Typography variant="body1">{currentFact}</Typography>
              <Button
                variant="contained"
                color="success"
                onClick={handleNewFact}
                sx={{ mt: 2 }}
              >
                🔁 New Fact
              </Button>
            </Paper>
          </Grid>

          {/* Chart */}
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
    </>
  );
}
