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
enum PayPalEnvironments { Production, Environment, NoNetwork }

var PayPalPlugin = {
    //User Actions and Methods
    setEnvironment: function (environment : PayPalEnvironments) {
    
    },
    initPayPal: function (clientID, receiverEmail, payerID,) {
        
    },
    pay: function () {
    
    },
    
    //Methods called back from iOS (These work like listeners)
    payPayPaymentDidComplete: function () {
        //Insert your code here that you want to execute when a payment is successful
        
    },
    payPalPaymentDidCancel: function () {
        //Insert your code here that you want to execute when a payment is canceled by the user
        
    },
    verifyCompletedPayment: function () {
        // Include your code here to call to your server to verify the payment (Optional Security Measure)
        
    },
    payPalViewWillAppear: function () {
        // Include your code here to execute when the paypal interface is going to appear
        
    }
    
};