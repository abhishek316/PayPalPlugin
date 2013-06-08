/****************************************
 *
 * PayPalPlugin.js
 * 
 * Created By Scott Robinson on 6/5/2013.
 *
 * Version: 2.0b
 ****************************************
 * See the README.md for instructions on how to use this file
 ****************************************/
var cordovaRef = window.PhoneGap || window.Cordova || window.cordova;

function success () {
    //Generic callback provided if the Cordova call to the native Objective-C should be successful
    //Note: Probably don't want to do anything here... but provided nevertheless
}

function fail () {
    //Generic callback provided if the Cordova call to the native Objective-C should fail
    
}

var PayPalPlugin = {
    preconnectToPaymentServers: function (success, fail, environment) {
        cordovaRef.exec(success, fail, "PayPalPlugin", "preconnect", [environment]);
    },
    makePayment: function (succes, fail, environment, amount, currencyCode, shortDescription, payerId, payerEmail, payerPhoneCountryCode, payerPhone) {
        cordovaRef.exec(success, fail, "PayPalPlugin", "makePayment", [environment, amount, currencyCode, shortDescription, payerId, payerEmail, payerPhoneCountryCode, payerPhone]);
    },
    payPalPaymentDidComplete: function (confirmation) {
        //Provide your successful payment implementation here!
        
    },
    payPalPaymentDidCancel: function () {
        //Provide your payment canceled implementation here!
        
    },
    NotProcessable: function () {
        //Provide your payment is not processable implementation here!
        
    }
};
