import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginForm from "./auth/LoginForm/LoginForm"
import RegisterForm from "./auth/RegisterForm/RegisterForm"
import { AuthProvider } from '../contexts/authContext';
import Home from './Home';
import NotFound from './NotFound';
import Calendar from './Calendar/Calendar';
import StravaActivity from './StravaActivity/StravaActivity';
import StravaCallback from './StravaActivity/StravaCallback';
import StravaDashboard from './StravaActivity/StravaDashboard';
import Activities from './StravaActivity/ActivitiesProfile/Activities';
import Profile from './Profile/Profile';
import Food from './Food/Food';

export default function App() {

  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <LoginForm

            />
          </Route>
          <Route path="/register">
            <RegisterForm

            />
          </Route>
          <Route path="/home">
            <Home

            />
          </Route>
          <Route path="/calendar">
            <Calendar

            />
          </Route>
          <Route path="/activities-sync">
            <StravaActivity

            />
          </Route>
          <Route path="/activities">
            <Activities

            />
          </Route>
          <Route path="/profile">
            <Profile

            />
          </Route>
          <Route path="/food">
            <Food

            />
          </Route>
          <Route path="/strava_callback">
            <StravaCallback

            />
          </Route>
          <Route path="/strava_dashboard">
            <StravaDashboard

            />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  )
}
