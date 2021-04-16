import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Counters from "./components/Counters";
import Customer from "./components/Customer";
import Movies from "./components/Movies";
import MovieForm from "./components/MovieForm";
import Rentals from "./components/Rentals";
import NotFound from "./components/NotFound";
import NavBar from "./components/NavBar";

function App() {
  // const [counters, setCounters] = useState([
  //   { id: 1, value: 0 },
  //   { id: 2, value: 0 },
  //   { id: 3, value: 0 },
  //   { id: 4, value: 4 },
  // ]);

  // function handleDelete(id) {
  //   setCounters(counters.filter((counter) => counter.id !== id));
  // }

  // function handleReset() {
  //   const counter = counters.map((c) => {
  //     c.value = 0;
  //     return c;
  //   });
  //   setCounters(counter);
  // }

  // function handleIncrement(counter) {
  //   const newCounter = [...counters];
  //   const index = newCounter.indexOf(counter);
  //   newCounter[index] = { ...counter };
  //   newCounter[index].value++;
  //   setCounters(newCounter);
  // }

  // function handleDecrement(counter) {
  //   const newCounter = [...counters];
  //   const index = newCounter.indexOf(counter);
  //   newCounter[index] = { ...counter };
  //   if (newCounter[index].value > 0) newCounter[index].value--;
  //   setCounters(newCounter);
  // }
  return (
    <React.Fragment>
      {/* <NavBar totalCounters={counters.filter((c) => c.value > 0).length} />
      <main>
        <Counters
          onReset={handleReset}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onDelete={handleDelete}
          counters={counters}
        />
      </main> */}
      <NavBar />
      <Switch>
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
