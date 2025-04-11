import React, { useState } from 'react';
import { Box, Typography, LinearProgress, TextField, Button, Paper } from '@mui/material';
import { Savings as SavingsIcon } from '@mui/icons-material';

export default function SavingsGoal({ goal, onUpdate }) {
  const [editMode, setEditMode] = useState(false);
  const [currentAmount, setCurrentAmount] = useState(goal.currentAmount || '0');
  
  const progress = goal.targetAmount > 0 
    ? (parseFloat(currentAmount) / parseFloat(goal.targetAmount)) * 100 
    : 0;

  const handleSave = () => {
    onUpdate(currentAmount);
    setEditMode(false);
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      <Box display="flex" alignItems="center" mb={1}>
        <SavingsIcon color="primary" sx={{ mr: 1 }} />
        <Typography variant="h6">{goal.name}</Typography>
      </Box>
      
      <Typography>
        Target: ${parseFloat(goal.targetAmount).toFixed(2)}
        {goal.targetDate && ` by ${new Date(goal.targetDate).toLocaleDateString()}`}
      </Typography>
      
      {editMode ? (
        <Box mt={2}>
          <TextField
            label="Current Amount"
            type="number"
            value={currentAmount}
            onChange={(e) => setCurrentAmount(e.target.value)}
            fullWidth
            inputProps={{ step: "0.01" }}
          />
          <Button onClick={handleSave} variant="contained" sx={{ mt: 1, mr: 1 }}>
            Save
          </Button>
          <Button onClick={() => setEditMode(false)} sx={{ mt: 1 }}>
            Cancel
          </Button>
        </Box>
      ) : (
        <Box mt={2}>
          <Typography>
            Saved: ${parseFloat(currentAmount).toFixed(2)}
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={Math.min(progress, 100)} 
            sx={{ height: 10, borderRadius: 5, mt: 1, mb: 1 }}
          />
          <Typography>
            {progress.toFixed(1)}% complete
          </Typography>
          <Button 
            onClick={() => setEditMode(true)} 
            variant="outlined" 
            sx={{ mt: 1 }}
          >
            Update Progress
          </Button>
        </Box>
      )}
    </Paper>
  );
}