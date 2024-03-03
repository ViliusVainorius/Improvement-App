import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "../index.css"
import LoginForm from "./auth/LoginForm/LoginForm"
import RegisterForm from "./auth/RegisterForm/RegisterForm"
import { AuthProvider } from '../contexts/authContext';
import Home from './Home';
import NotFound from './NotFound';

export default function App() {

  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <LoginForm />
          </Route>
          <Route path="/register">
            <RegisterForm />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  )
}
