import React from 'react';
import { Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import { AuthProvider } from './contexts/AuthContext';

function App() {

  return (

    <Box pt="20">
      <Router>
        <AuthProvider>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={LogIn} />
          </Switch>
        </AuthProvider>
      </Router>
    </Box>

  );
}

export default App;
