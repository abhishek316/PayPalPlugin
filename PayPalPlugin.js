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

var PayPalPlugin = {
    //*** Setup ***//
    
    //Required
setRequired: function (success, fail, environment, clientId, clientEMail, amount, currencyCode, shortDescription) {
    cordovaRef.exec(function () {}, function () {}, "PayPalPlugin", "setRequired", [environment, clientId, clientEMail, amount, currencyCode, shortDescription]);
    },
    //Optional
    setOptionalDefaults: function (success, fail, payerEmail, payerPhoneCountryCode, payerPhone) {
        cordovaRef.exec(success, fail, "PayPalPlugin", "setOptionalDefaults", [payerEmail, payerPhoneCountryCode, payerPhone]);
    },
    //Optional
    setOptionalPayerID: function (success, fail, payerId) {
        cordovaRef.exec(success, fail, "PayPalPlugin", "setOptionalPayerID", [payerId]);
    },
    //Optional
    prepareForPayment: function (success, fail) {
        cordovaRef.exec(success, fail, "PayPalPlugin", "prepareForPayment", []);
    },
    //Optional
    preconnectToServer: function (success, fail) {
        cordovaRef.exec(success, fail, "PayPalPlugin", "preconnectToServer", []);
    },
    //*** Payment Processing ***//
    //Required
    pay: function (success, fail)
    {
        cordovaRef.exec(success, fail, "PayPalPlugin", "pay", []);
    },
    //Required
    PaymentComplete: function(object) {
        //This is a 'listener'. Place your code here that you want to be called when a payment comes back successful.
        alert("Success");
    },
    //Required
    PaymentCanceled: function () {
        //This is a 'listener'. Place your code here that you want to be called when a payment is canceled by the user.
        alert("Cancel");
    }
