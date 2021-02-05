import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import Login from "./pages/Login";
import PrivateRoute from "./pages/PrivateRoute";
import AuthWrapper from "./pages/AuthWrapper";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <AuthWrapper>
      <Router>
        <Switch>
          <PrivateRoute path="/" exact={true}>
            <Dashboard />
          </PrivateRoute>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </Router>
    </AuthWrapper>
  );
}

export default App;
