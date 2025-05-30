import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Container } from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Income from './pages/Income';
import Expenses from './pages/Expenses';
import Savings from './pages/Savings';
import Settings from './pages/Settings';
import Login from './pages/login';
import Contact from './components/Contact';
import Signup from './pages/Signup';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const theme = useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <Container maxWidth="lg" className="content">
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/income" component={Income} />
              <Route path="/expenses" component={Expenses} />
              <Route path="/savings" component={Savings} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route
                path="/settings"
                render={() => (
                  <Settings
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                  />
                )}
              />
              <Route path="/contact" component={Contact} />
            </Switch>
          </Container>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
