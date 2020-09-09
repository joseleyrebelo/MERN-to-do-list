import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";

// Pages & Components
import LandingPage from "./pages/LandingPage/LandingPage";
import StatsPage from "./pages/StatsPage/StatsPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import EditPage from "./pages/EditPage/EditPage"
import NavBar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer"



function App() {
  return (
    <div className="App">
      <Suspense fallback={(<div>Loading...</div>)}>
        <NavBar />
        <div className="content_wrapper" style={{ paddingTop: '75px', minHeight: 'calc(100vh - 80px)' }}>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/search" component={SearchPage} />
            <Route exact path="/edit" component={EditPage} />
            <Route exact path="/stats" component={StatsPage} />
          </Switch>
        </div>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
