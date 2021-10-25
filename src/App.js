import React from 'react';
import { Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './components/ForgotPassword';
import UpdateProfile from './components/UpdateProfile';
import { AuthProvider } from './contexts/AuthContext';

function App() {

  return (

    <Box pt="20">
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={LogIn} />
            <Route path="/reset-password" component={ForgotPassword} />
          </Switch>
        </AuthProvider>
      </Router>
    </Box>

  );
}

export default App;
