import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";

import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import SingleSpot from "./components/SingleSpot";
import SpotForm from "./components/SpotsForm";
import ManageSpots from "./components/ManageSpots";
import UpdateSpot from "./components/UpdateSpot";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded &&
        <Switch>
          <Route exact path="/">
            <LandingPage className="spot-card-container" />
          </Route>

          <Route exact path="/spots/new">
            <SpotForm />
          </Route>

          <Route exact path="/spots/current">
            <ManageSpots/>
          </Route>

          <Route exact path="/spots/:spotId">
            <SingleSpot />
          </Route>

          <Route exact path="/spots/:spotId/edit">
            <UpdateSpot />
          </Route>


        </Switch>
      }
    </>
  );
}

export default App;
