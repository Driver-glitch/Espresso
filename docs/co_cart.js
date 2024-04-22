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
      
   formatUSCurrency(val)
      Formats val as U.S.A. currency
   
*/ 

window.addEventListener('load', function() {
   calcCart(); // Runs the calcCart() function when the page is loaded

   var modelQty = document.getElementById('modelQty');
   modelQty.addEventListener('change', function() {
      calcCart(); // Runs the calcCart() function when the field value is changed
   });

   var shippingOptions = document.querySelectorAll('input[name="shipping"]');
   for (var i = 0; i < shippingOptions.length; i++) {
      shippingOptions[i].addEventListener('click', function() {
         calcCart(); // Adds an event handler to run calcCart() function when each option button is clicked
      });
   }
});




function calcCart() {
   // Retrieve field values
   var modelCost = parseFloat(document.getElementById('modelCost').value);
   var modelQty = parseInt(document.getElementById('modelQty').value);
   var shippingOptions = document.getElementsByName('shipping');
   var shippingCost = 0;
   var shippingType = '';

   // Calculate order cost
   var orderCost = modelCost * modelQty;
   document.getElementById('orderCost').value = formatUSCurrency(orderCost);

   // Calculate shipping cost based on selected option
   for (var i = 0; i < shippingOptions.length; i++) {
      if (shippingOptions[i].checked) {
         shippingCost = parseFloat(shippingOptions[i].value) * modelQty;
         shippingType = shippingOptions[i].nextSibling.nodeValue.trim(); // Retrieve label text
         break;
      }
   }
   document.getElementById('shippingCost').value = formatNumber(shippingCost, 2);

   // Calculate subtotal
   var subTotal = orderCost + shippingCost;
   document.getElementById('subTotal').value = formatNumber(subTotal, 2);

   // Calculate sales tax
   var salesTax = 0.05 * subTotal;
   document.getElementById('salesTax').value = formatNumber(salesTax, 2);

   // Calculate total
   var cartTotal = subTotal + salesTax;
   document.getElementById('cartTotal').value = formatUSCurrency(cartTotal);

   // Store shipping type in hidden field
   document.getElementById('shippingType').value = shippingType;
}




function formatNumber(val, decimals) {
   return val.toLocaleString(undefined, {minimumFractionDigits: decimals, 
                                         maximumFractionDigits: decimals});
}

function formatUSCurrency(val) {
   return val.toLocaleString('en-US', {style: "currency", currency: "USD"} );
}
