// //////////////////////////////////////
// Paypal Cordova Plugin
// Orginally by: Shazron Abdullah
// Updated by: Scott Robinson
//
// Oct 8th 2010
//     Initial implementation
// Apr 9th 2012
//     Updated for Cordova 1.6.0, wrapped in function closure, constants are namespaced under the global PayPal object
//     e.g if it was PayPalPaymentType.DONATION before, it's PayPal.PaymentType.Donation now
//         and it is also accessible under window.plugins.paypal.PaymentType.Donation
// Apr 23th 2013
//     Updated for Cordova 2.6.0
//
// /////////////////////////
var PayPal = (function() {
// /////////////////////////

/*
 * buttonType (unused currently)
 */
PaypalPlugin.ButtonType = {
	'BUTTON_68x24' : 0,
	'BUTTON_68x33' : 1,
	'BUTTON_118x24': 2,
	'BUTTON_152x33': 3,
	'BUTTON_194x37': 4,
	'BUTTON_278x43': 5,
	'BUTTON_294x43': 6,
	'BUTTON_TYPE_COUNT': 7
};

/*
 * PaymentType for window.plugins.prepare
 */
PaypalPlugin.PaymentType = 
{
	'HARD_GOODS': 0,
	'SERVICE'	: 1,
	'PERSONAL'	: 2,
	'DONATION'	: 3
};

/*
 * errorType for PaypalPaymentEvent.Failed
 */
PaypalPlugin.FailureType  = 
{
	'SYSTEM_ERROR' 		: 0,
	'RECIPIENT_ERROR'	: 1,
	'APPLICATION_ERROR' : 2,
	'CONSUMER_ERROR'	: 3
};

/*
 * Events to listen to after a user touches the payment button 
 */
PaypalPlugin.PaymentEvent =
{
	/**
	 * Listen for this event to signify Paypal payment success. The event object will have these properties:
	 *      transactionID - a string value
	 */
	Success : "PaypalPaymentEvent.Success",
	/**
	 * Listen for this event to signify Paypal payment canceled. The event object will have these properties:
	 *      [no properties available]
	 */
	Canceled : "PaypalPaymentEvent.Canceled",
	/**
	 * Listen for this event to signify Paypal payment failed. The event object will have these properties:
	 *      errorType - an integer value
	 */
	Failed : "PaypalPaymentEvent.Failed"
};

// get local ref to global PhoneGap/Cordova/cordova object for exec function
var cordovaRef = window.PhoneGap || window.Cordova || window.cordova; // old to new fallbacks

/**
 * Constructor
 */
function PaypalPlugin()
{
}

/**
 * Prepare payment type
 *     paymentType is from the PayPalPaymentType enum
 */
PaypalPlugin.prototype.prepare = function(paymentType)
{
	cordovaRef.exec("PaypalPlugin.prepare", paymentType);
}

/**
 * Initiate payment
 */
PaypalPlugin.prototype.pay = function()
{
	cordovaRef.exec("PaypalPlugin.pay");
}

/**
 * Sets the payment information for when the Paypal button is clicked.
 * Takes in an object (paymentProperties). Properties available to be set:
 *      paymentCurrency - a string value (required)
 *      paymentAmount - a double value (required)
 *      itemDesc - a string value (required)
 *      recipient - a string value (e-mail address, required)
 *      merchantName - a string value (required)
 */
PaypalPlugin.prototype.setPaymentInfo = function(paymentProperties)
{
	cordovaRef.exec("PaypalPlugin.setPaymentInfo", paymentProperties);
}

/**
 * Install function
 */
PaypalPlugin.install = function()
{
	if ( !window.plugins ) {
		window.plugins = {};
	} 
	if ( !window.plugins.paypal ) {
		window.plugins.paypal = new PaypalPlugin();
	}
}

/**
 * Add to Cordova constructor
 */
if (cordovaRef && cordovaRef.addConstructor) {
	cordovaRef.addConstructor(PaypalPlugin.install);
} else {
	console.log("PayPal Cordova Plugin could not be installed.");
	return null;
}

/**
 * Return constants
 */

return {
	ButtonType  : PaypalPlugin.ButtonType,
	PaymentType : PaypalPlugin.PaymentType,
	FailureType : PaypalPlugin.FailureType,
	PaymentEvent: PaypalPlugin.PaymentEvent
};

// /////////////////////////
})();
// /////////////////////////
