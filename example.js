/****************************************
 * 
 * example.js
 * 
 * Created by Scott Robinson on 6/5/2013
 * 
 * Version 2.0b
 ****************************************
 * Note: This is an example of how you could implement
 * the pay pal plugin's interface with 2 buttons
 ****************************************/

    $('<button/>').html("Preconnect").on('click', function () {PayPalPlugin.preconnectToPaymentServers(success, fail, "Sandbox");}),
    $('<button/>').html("Make Payment").on('click', function () {PayPalPlugin.makePayment(success, fail, "Sandbox", 25.07, "USD", "This is a description", "12345", "somebuyersemail@email.com", "1", "8007775555");})

