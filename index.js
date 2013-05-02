/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var App = {
    // Application Constructor
    Init: function() {
        document.addEventListener('deviceready', this.DeviceReady, false);
    },
    DeviceReady: function () {
        try {
            // set-up event listeners
            document.addEventListener(PayPal.PaymentEvent.Success, onPaymentSuccess,false);
            document.addEventListener(PayPal.PaymentEvent.Canceled, onPaymentCanceled,false);
            document.addEventListener(PayPal.PaymentEvent.Failed, onPaymentFailed,false);
        } catch (e) {
            debug.error(e);
        }
    }
};

function PayPalButtonClick(event) {
    switch (event.target.getAttribute("data-paymentType")) {
        case "Hard Goods":
            window.plugins.paypal.prepare(PayPal.PaymentType.HARD_GOODS);
            break;
        case "Service":
            window.plugins.paypal.prepare(PayPal.PaymentType.SERVICE);
            break;
        case "Personal":
            window.plugins.paypal.prepare(PayPal.PaymentType.PERSONAL);
            break;
        case "Donation":
            window.plugins.paypal.prepare(PayPal.PaymentType.DONATION);
            break;
    }
    window.plugins.paypal.setPaymentInfo({paymentCurrency: event.target.getAttribute("data-currency"), paymentAmount: event.target.getAttribute("data-amount"), itemDesc: event.target.getAttribute("data-description"), recipient: event.target.getAttribute("data-recipient"), merchantName: event.target.getAttribute("data-merchant")});
    window.plugins.paypal.pay();
}

function onPaymentSuccess(evt)
{
    navigator.notification.alert("Payment success, transactionID: " + evt.transactionID);
}

function onPaymentCanceled(evt)
{
    navigator.notification.alert("Payment canceled.");
}

function onPaymentFailed(evt)
{
    navigator.notification.alert("Payment failed, errorType: " + evt.errorType);
    // compare evt.errorType to PayPalFailureType enum values
}
