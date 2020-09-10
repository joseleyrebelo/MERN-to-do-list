import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";

// Pages & Components
import Home from "./pages/Home/Home";
import Todolist from "./pages/Todolist/Todolist";
import NavBar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <div class="app__center">
          <NavBar />
          <div className="app__body">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/todolist" component={Todolist} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Suspense>
    </div>
  );
}

export default App;
