import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";

const promise = loadStripe(
  "pk_test_51JmcWUBIRK8TplYNBEJyVpP5vTdtcaScaHuMGOaFxMY847kwfzu7WmffVPP6YgyNmyVHbJ9QFZbWJzOWy903xIhp009SGb0k7p"
); //this is a public key

function App() {
  const [{}, dispatch] = useStateValue();

  //to check who has signed in
  useEffect(() => {
    // as soon as the app load , we attach this listener. then it always listen for login / logout and give us the authenticated user
    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>>>", authUser);

      if (authUser) {
        //the user just logged in / the user was logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        //the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
    //this will only run once when the app component loads..., because the array is empty
  }, []); //if we put anything in the array [user,basket] , then it will run everytime when the user / basket changes

  return (
    //BEM convension - naming convension
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/">
            {/*make sure your default route at the bottom*/}
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
