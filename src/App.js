import React, { useState } from "react";
import "./App.css";
import Counters from "./components/Counters";
import Movies from "./components/Movies";
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
      <Movies />
    </React.Fragment>
  );
}

export default App;
