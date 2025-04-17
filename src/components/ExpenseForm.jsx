import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Grid, Select, InputLabel, FormControl } from '@mui/material';

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

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
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
          <FormControl fullWidth>
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
          <FormControl fullWidth>
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
      </Grid>
    </form>
  );
}