const express = require('express');
const cors = require('cors');

const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(cors());

// ***************************************************************
let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

app.get("/", (req, res) => {
  res.send("BD-1 Assignemnt")
});



// Endpoint 1: Calculate the total price of items in the cart
app.get('/cart-total', (req, res) => {
  let cart_total = parseFloat(req.query.cartTotal);
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let sum = cart_total + newItemPrice;
  res.send(sum.toString());
});

// Endpoint 2 : Apply a discount based on membership status
app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';
  let ans = 0;
  if (isMember) ans = cartTotal - cartTotal * (discountPercentage / 100);
  else ans = cartTotal;
  res.send(ans.toString());
});

// Endpoint 3 : Calculate tax on the cart total
app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let ans = cartTotal * (taxRate / 100);
  res.send(ans.toString());
});

// Endpoint 4 : Estimate delivery time based on shipping method
app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  let ans = 0;
  if (shippingMethod === 'express') {
    ans = Math.ceil(distance / 100);
  } else if (shippingMethod === 'standard') {
    ans = Math.ceil(distance / 50);
  }
  res.send(ans.toString());
});

// Endpoint 5 : Calculate the shipping cost based on weight and distance
app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let ans = weight * distance * 0.1;
  res.send(ans.toString());
});

// Endpoint 6 : Calculate loyalty points earned from a purchase
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let ans = purchaseAmount * loyaltyRate;
  res.send(ans.toString());
});

// ***************************************************************

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
