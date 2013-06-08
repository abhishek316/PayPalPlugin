/****************************************
 *
 * PayPalPlugin By Scott Robinson
 *
 ****************************************
 *
 *
 *
 *
 ****************************************/
var cordovaRef = window.PhoneGap || window.Cordova || window.cordova;

function success () {
    
}

function fail () {
    
}

var PayPalPlugin = {
    preconnectToPaymentServers: function (success, fail, environment) {
        cordovaRef.exec(success, fail, "PayPalPlugin", "preconnect", [environment]);
    },
    makePayment: function (succes, fail, environment, amount, currencyCode, shortDescription, payerId, payerEmail, payerPhoneCountryCode, payerPhone) {
        cordovaRef.exec(success, fail, "PayPalPlugin", "makePayment", [environment, amount, currencyCode, shortDescription, payerId, payerEmail, payerPhoneCountryCode, payerPhone]);
    },
    payPalPaymentDidComplete: function (confirmation) {
        alert("Payment Completed");
    },
    payPalPaymentDidCancel: function () {
        alert("Payment Canceled");
    }
};
<<<<<<< HEAD

=======
>>>>>>> 92df5374f0d5a31cb0876d3af9fd7d02e4186636
