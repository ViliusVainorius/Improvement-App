import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginForm from "./auth/LoginForm/LoginForm"
import RegisterForm from "./auth/RegisterForm/RegisterForm"
import { AuthProvider } from '../contexts/authContext';
import Home from './Home';
import NotFound from './NotFound';
import Calendar from './Calendar/Calendar';
import StravaActivity from './StravaActivity/StravaActivity';

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
          <Route path="/calendar">
            <Calendar />
          </Route>
          <Route path="/activities">
            <StravaActivity />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  )
}
