const express = require('express');
const paypal = require('@paypal/checkout-server-sdk');
require("dotenv").config();
const port = process.env.PORT;

let environment = new paypal.core.SandboxEnvironment(
  process.env.CLIENT_ID,
  process.env.SECRET_KEY
);
let client = new paypal.core.PayPalHttpClient(environment);

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'))

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/pay', async (req, res) => {
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    "intent": "CAPTURE",
    "purchase_units": [{
      "amount": {
        "currency_code": "USD",
        "value": "25.00"
      }
    }],
    "application_context": {
      "return_url": `http://localhost:${port}/success`,
      "cancel_url": `http://localhost:${port}/cancel`
    }
  });

  try {
    const order = await client.execute(request);
    for (let i = 0; i < order.result.links.length; i++) {
      console.log(order)
      if (order.result.links[i].rel === 'approve') {
        res.redirect(order.result.links[i].href);
        return;
      }
    }
  } catch (err) {
    console.error("Error details:", err);
    res.status(500).send("Error creating order: " + err.message);
  }
});

app.get('/success', async (req, res) => {
  const {
    token
  } = req.query;
  const request = new paypal.orders.OrdersCaptureRequest(token);
  request.requestBody({});

  try {
    const capture = await client.execute(request);
    res.send('Success');
  } catch (err) {
    console.error(err);
    res.status(500).send("Error capturing payment");
  }
});

app.get('/cancel', (req, res) => res.send('Cancelled'));


app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});