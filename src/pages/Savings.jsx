import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, TextField, Button} from '@mui/material';
import SavingsGoal from '../components/SavingsGoal';

export default function Savings() {
  const [savingsGoals, setSavingsGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    currentAmount: '',
    targetDate: ''
  });

  const handleAddGoal = () => {
    if (newGoal.name && newGoal.targetAmount) {
      setSavingsGoals([...savingsGoals, newGoal]);
      setNewGoal({
        name: '',
        targetAmount: '',
        currentAmount: '',
        targetDate: ''
      });
    }
  };

  const handleUpdateCurrentAmount = (index, amount) => {
    const updatedGoals = [...savingsGoals];
    updatedGoals[index].currentAmount = amount;
    setSavingsGoals(updatedGoals);
  };

  return (
    <Box sx={{ p: 3, pb: 10 }}>
      <Typography variant="h4" gutterBottom>
        Savings Goals
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Add New Goal
            </Typography>
            
            <TextField
              fullWidth
              label="Goal Name"
              value={newGoal.name}
              onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
              margin="normal"
            />
            
            <TextField
              fullWidth
              label="Target Amount"
              type="number"
              value={newGoal.targetAmount}
              onChange={(e) => setNewGoal({...newGoal, targetAmount: e.target.value})}
              margin="normal"
              inputProps={{ step: "0.01" }}
            />
            
            <TextField
              fullWidth
              label="Current Amount"
              type="number"
              value={newGoal.currentAmount}
              onChange={(e) => setNewGoal({...newGoal, currentAmount: e.target.value})}
              margin="normal"
              inputProps={{ step: "0.01" }}
            />
            
            <TextField
              fullWidth
              label="Target Date"
              type="date"
              value={newGoal.targetDate}
              onChange={(e) => setNewGoal({...newGoal, targetDate: e.target.value})}
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            
            <Button 
              variant="contained" 
              fullWidth 
              onClick={handleAddGoal}
              sx={{ mt: 2 }}
            >
              Add Goal
            </Button>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Your Savings Goals
            </Typography>
            
            {savingsGoals.length === 0 ? (
              <Typography>No savings goals added yet</Typography>
            ) : (
              savingsGoals.map((goal, index) => (
                <SavingsGoal
                  key={index}
                  goal={goal}
                  onUpdate={(amount) => handleUpdateCurrentAmount(index, amount)}
                />
              ))
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}