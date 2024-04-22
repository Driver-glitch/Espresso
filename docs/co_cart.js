"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Review Assigment

   Shopping Cart Form Script
   
   Author: Daniel Rivera
   Date:   04/21/2024
   
   Filename: co_cart.js
   
   Function List
   =============
   
   calcCart()
      Calculates the cost of the customer order
      
   formatNumber(val, decimals)
      Format a numeric value, val, using the local
      numeric format to the number of decimal
      places specified by decimals
      
   formatUSACurrency(val)
      Formats val as U.S.A. currency
   
*/ 

// Event listener for window load event
window.addEventListener('load', function() {
    // Run the calcCart() function when the page is loaded
    calcCart();

    // Run the calcCart() function when the field value is changed
    var modelQtyField = document.getElementById('modelQty');
    modelQtyField.addEventListener('change', function() {
        calcCart();
    });

    // Use a for loop to add event handlers to shipping option buttons
    var shippingOptions = document.getElementsByName('shipping');
    for (var i = 0; i < shippingOptions.length; i++) {
        shippingOptions[i].addEventListener('click', function() {
            calcCart();
        });
    }
});

// Function to calculate the cost of the customer's order
function calcCart() {
    // Get the quantity of machines ordered
    var modelQty = parseInt(document.getElementById('modelQty').value);

    // Get the cost of the espresso machine
    var modelCost = parseFloat(document.getElementById('modelCost').value);

    // Calculate the order cost
    var orderCost = modelCost * modelQty;
    document.getElementById('orderCost').value = formatUSCurrency(orderCost);

    // Get the selected shipping option
    var selectedShipping = parseFloat(document.querySelector('input[name="shipping"]:checked').value);

    // Calculate the shipping cost
    var shipCost = selectedShipping * modelQty;
    document.getElementById('shippingCost').value = formatNumber(shipCost);

    // Calculate the subtotal
    var subTotal = orderCost + shipCost;
    document.getElementById('subTotal').value = formatNumber(subTotal);

    // Calculate the sales tax
    var salesTax = 0.05 * subTotal;
    document.getElementById('salesTax').value = formatNumber(salesTax);

    // Calculate the total
    var cartTotal = subTotal + salesTax;
    document.getElementById('cartTotal').value = formatUSCurrency(cartTotal);

    // Store the label text of the selected shipping option
    var shippingType = document.querySelector('input[name="shipping"]:checked + label').innerText;
    document.getElementById('shippingType').value = shippingType;
}

// Function to format a number as U.S. currency
function formatUSCurrency(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Function to format a number with thousands separator and two decimal places
function formatNumber(number) {
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
