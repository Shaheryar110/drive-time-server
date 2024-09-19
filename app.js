const express = require("express");
const cors = require("cors");
const app = express();
const stripe = require("stripe")(
  "sk_test_51P2FrVRxtMIfYHGVHsANuSOsWDyRutmSBkuEy215Q6G6htFXR9WQlmgPfejhYophKhyYZitF085nyJzO0DgK8XMa00Xc3jYIpv"
);

const port = 5001;
app.use(express.json());

var corsOptions = {
  origin: ["http://localhost:3000"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Authenticate DB connection

// Basic route
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/drive-time/create-payment-intent", async (req, res) => {
  console.log(req.body, "rq");
  const { amount, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});

// Use CORS and routes

// Start the server using HTTP
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
