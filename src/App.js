import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Customer from "./components/Customer";
import Movies from "./components/Movies";
import MovieForm from "./components/MovieForm";
import Rentals from "./components/Rentals";
import NotFound from "./components/NotFound";
import NavBar from "./components/NavBar";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Logout from "./components/Logout";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    try {
      const newUser = auth.getCurrentUser();
      setUser(newUser);
    } catch (ex) {}
  }, []);

  return (
    <React.Fragment>
      <ToastContainer />
      <NavBar user={user} />
      <Switch>
        <Route path="/register" component={RegisterForm} />
        <Route path="/login" component={LoginForm} />
        <Route path="/logout" component={Logout} />
        <Route path="/movies/:id" component={MovieForm} />
        <Route path="/movies" component={Movies}></Route>
        <Route path="/customers" component={Customer}></Route>
        <Route path="/rentals" component={Rentals}></Route>
        <Route path="/not-found" component={NotFound}></Route>
        <Redirect from="/" exact to="/movies" />
        <Redirect to="/not-found" />
      </Switch>
    </React.Fragment>
  );
}

export default App;
