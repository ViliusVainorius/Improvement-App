import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "../index.css"
import Navbar from "./bars/Navbar"
import Sidebar from "./bars/Sidebar"
import TodoTasks from "../todo/TodoTasks"
import LoginForm from "./auth/LoginForm/LoginForm"
import RegisterForm from "./auth/RegisterForm/RegisterForm"
import { AuthProvider } from '../contexts/authContext';

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
            <Navbar />
            <Sidebar />
            <TodoTasks />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  )
}
