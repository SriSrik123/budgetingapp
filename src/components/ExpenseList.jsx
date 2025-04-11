import React from 'react';
import { List, ListItem, ListItemText, Typography, Divider, Chip } from '@mui/material';
import { AttachMoney, CreditCard, Home, LocalGroceryStore, Restaurant} from '@mui/icons-material';

const getCategoryIcon = (category) => {
  switch(category) {
    case 'Rent/Mortgage': return <Home />;
    case 'Groceries': return <LocalGroceryStore />;
    case 'Dining Out': return <Restaurant />;
    case 'Credit Card': 
    case 'Car Loan': 
    case 'Student Loan': return <CreditCard />;
    default: return <AttachMoney />;
  }
};

export default function ExpenseList({ expenses, title }) {
  const total = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        {title} (Total: ${total.toFixed(2)})
      </Typography>
      
      {expenses.length === 0 ? (
        <Typography>No expenses added yet</Typography>
      ) : (
        <List>
          {expenses.map((expense, index) => (
            <div key={index}>
              <ListItem>
                {getCategoryIcon(expense.category)}
                <ListItemText 
                  primary={expense.name}
                  secondary={`$${parseFloat(expense.amount).toFixed(2)} - ${expense.category}`}
                  sx={{ ml: 2 }}
                />
                <Chip 
                  label={expense.type} 
                  color={
                    expense.type === 'fixed' ? 'primary' : 
                    expense.type === 'variable' ? 'secondary' : 'error'
                  } 
                  size="small"
                />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      )}
    </div>
  );
}