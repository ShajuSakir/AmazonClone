const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { request, response } = require("express");
const stripe = require("stripe")(
  "sk_test_51JmcWUBIRK8TplYNmXakqGWjuD45JyFnRS1g4n7XiRm46LceVL4z8eHJRhX4YBvnQN7HKN7KCxQPbVSWIYr32kzu00m62JAW51"
);
//API

//App config
const app = express();

//Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

//API routes
app.get("/", (request, response) => response.status(200).send("Hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment request recieved for this amount", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  //OK created
  response.status(201).send({
      clientSecret : paymentIntent.client_secret,
  })
});

//Listen command
exports.api = functions.https.onRequest(app);

//http://localhost:5001/challenge-d0cb1/us-central1/api
