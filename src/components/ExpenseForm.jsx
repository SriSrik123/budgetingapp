import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Grid, Select, InputLabel, FormControl } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export default function ExpenseForm({ onAddExpense }) {
  const [expense, setExpense] = useState({
    name: '',
    amount: '',
    type: 'variable',
    category: '',
    dueDate: ''
  });
  useEffect(() => {
    const savedExpense = localStorage.getItem('expenseForm');
    if (savedExpense) {
      setExpense(JSON.parse(savedExpense));
    }
  }, []);

  const expenseCategories = {
    fixed: ['Rent/Mortgage', 'Utilities', 'Insurance', 'Subscriptions', 'Other'],
    variable: ['Groceries', 'Dining Out', 'Entertainment', 'Transportation', 'Shopping', 'Other'],
    debt: ['Credit Card', 'Student Loan', 'Car Loan', 'Personal Loan', 'Other']
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newExpense = { ...expense, [name]: value };
    setExpense(newExpense);
    localStorage.setItem('expenseForm', JSON.stringify(newExpense));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      if (expense.name && expense.amount && expense.category) {
      onAddExpense(expense);
      localStorage.removeItem('expenseForm');
      setExpense({
        name: '',
        amount: '',
        type: 'variable',
        category: '',
        dueDate: ''
      });
    }
  };

  const chartData = Object.entries(
    expenseCategories[expense.type].reduce((acc, category) => {
      acc[category] = 0;
      return acc;
    }, {})
  ).map(([key, value]) => ({
    name: key,
    value: expense.category === key ? parseFloat(expense.amount || 0) : 0,
  }));

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            size="small"
            label="Expense Name"
            name="name"
            value={expense.name}
            onChange={handleChange}
            required
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            label="Amount"
            name="amount"
            type="number"
            value={expense.amount}
            onChange={handleChange}
            inputProps={{ step: "0.01" }}
            required
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel>Type</InputLabel>
            <Select
              name="type"
              value={expense.type}
              onChange={handleChange}
              required
            >
              <MenuItem value="fixed">Fixed Expense</MenuItem>
              <MenuItem value="variable">Variable Expense</MenuItem>
              <MenuItem value="debt">Debt/Loan</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={expense.category}
              onChange={handleChange}
              required
            >
              {expenseCategories[expense.type].map(category => (
                <MenuItem key={category} value={category}>{category}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            label="Due Date (optional)"
            name="dueDate"
            type="date"
            value={expense.dueDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        
        <Grid item xs={12}>
          <Button type="submit" variant="contained" fullWidth>
            Add Expense
          </Button>
        </Grid>
        <Grid item xs={12}>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`hsl(${(index / chartData.length) * 360}, 70%, 50%)`} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </form>
  );
}