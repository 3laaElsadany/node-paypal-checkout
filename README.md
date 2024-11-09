# Node PayPal Checkout

A simple Node.js application that integrates PayPal's checkout system to handle payments.

## Features

- PayPal payment integration using @paypal/checkout-server-sdk.
- Ability to create and capture PayPal payments.
- Basic product purchasing flow.

## Prerequisites

Before running the application, ensure you have the following:

- [Node.js](https://nodejs.org/) installed.
- PayPal Developer account to get your client ID and secret.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/3laaElsadany/node-paypal-checkout.git
   ```

2. Navigate to the project directory:

   ```bash
   cd node-paypal-checkout
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the project root and add your PayPal credentials:

   ```bash
   PAYPAL_CLIENT_ID=your_paypal_client_id
   PAYPAL_CLIENT_SECRET=your_paypal_client_secret
   ```

## Usage

1. Start the application:

   ```bash
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000`.

3. Choose a product and proceed with the payment using PayPal.

