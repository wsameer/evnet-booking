import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";

import "./App.scss";

const Booking = lazy(() => import("./pages/Booking"));
const Listing = lazy(() => import("./pages/Listing"));
const BusyIndicator = lazy(() => import("./components/BusyIndicator"));

const routes = [
  {
    path: ["/", "listing"],
    component: Listing
  },
  {
    path: "/booking",
    component: Booking
  }
];

const App = () => {
  const switchRoute = (
    <Switch>
      {routes.map((route, index) => (
        <Route key={index} exact {...route} />
      ))}
    </Switch>
  );

  return (
    <div className="App">
      <Router>
        <Suspense fallback={<BusyIndicator />}>
          <Container fluid>{switchRoute}</Container>
        </Suspense>
      </Router>
    </div>
  );
};

export default App;
