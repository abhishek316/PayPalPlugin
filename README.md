# PhoneGap PayPal-Plugin #
Originally by: Shazron Abdullah  
Updated by: Scott Robinson

## Adding the Plugin to your project ##

###iOS Instructions###
Using this plugin requires [Cordova](http://github.com/apache/incubator-cordova-ios) and the PayPal Mobile Payments Library. The PayPal Mobile Payments Library can be downloaded [here](https://www.x.com/community/ppx/xspaces/mobile/mep).

1. Make sure your Cordova Xcode project has been [updated for Cordova 2.6.0](https://github.com/apache/incubator-cordova-ios/blob/master/guides/Cordova%20Plugin%20Upgrade%20Guide.md)
2. Add the "Paypal Mobile Payments" folder to your project (put in a suitable location under your project, then drag and drop it in)
3. Add the .h and .m files to your Plugins folder in your project (as a Group "yellow folder" not a Reference "blue folder")
4. Add the .js files to your "www" folder on disk, and add reference(s) to the .js files as &lt;script&gt; tags in your html file(s)
5. In **Cordova.plist** (1.5.0 or greater) or **PhoneGap.plist** (1.4.1 or lesser), under the **Plugins** section, add an idential key and value of **"PaypalPlugin"**
6. Make sure you check the **"RELEASE NOTES"** section below!

##Detailed Instructions##
This plugin can be used in two ways:

###&quot;Manual Mode&quot;:###

   There are 3 functions that need to be called for a payment to be processed:

      1. window.plugins.paypal.prepare(paymentType);
         - This method takes an enum as an argument, the available options are:
            *PayPal.PaymentType.HARD_GOODS
            *PayPal.PaymentType.SERVICE
            *PayPal.PaymentType.PERSONAL
            *PayPal.PaymentType.DONATION

      2. window.plugins.paypal.setPaymentInfo(paymentProperties);
         - This method takes an object containing the following:
            *paymentCurrency - a string value (required)
            *paymentAmount - a double value (required)
            *itemDesc - a string value (required)
            *recipient - a string value of an email address (required)
            *merchantName - a string value (required)

      3. window.plugins.paypal.pay();

   Example implementation:
      
      window.plugins.paypal.prepare(PayPal.PaymentType.HARD_GOODS);
      window.plugins.paypal.setPaymentInfo({paymentCurrency: "USD",
                                            paymentAmount: "10.00",
                                            itemDesc: "iPhone 4S Case",
                                            recipient: "support@somemakebelievecompany.com",
                                            merchantName: "Make Believe Merchant"});
      window.plugins.paypal.pay();

###&quot;Auto Mode&quot;:###

   Add the following code block to your javascript file: (an example is included, 'index.js')

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

   This will allow you to have multiple buttons on your html pages that all have the ability to send different type of payments and item details. To use this simply add an element to your html page with a onclick event of 'PayPalButtonClick(event)'

   Next add the following attributes to that element:

      * data-paymentType - The type of payment to be sent (Options are: "Hard Goods", "Service", "Personal", or "Donation")
      * data-currency - The currency for the payment (example: "USD")
      * data-amount - The amount of the payment using the above currency (example: "10.00")
      * data-description - A description of the item, service, personal payment, or donation.
      * data-recipient - The email of the payment recipient
      * data-merchant - The name of the merchant being paid

   What this does is once the button is clicked, the above code block will call all of the &quot;Manual Mode&quot; functions for you setting their values to the values you set in the element's attributes.

   Example implementation: 

      <button data-currency="USD" data-amount="10.00" data-description="Network Cable" data-recipient="name@example.com" data-merchant="Cables-R-Us" data-paymentType="Donation" onclick="PayPalButtonClick(event)">PAY</button>
      <button data-currency="USD" data-amount="10.00" data-description="IDE" data-recipient="name@example.com" data-merchant="JAVA" data-paymentType="Service" onclick="PayPalButtonClick(event)">PAY</button>

## RELEASE NOTES ##

### 20130501 ###
* Updated for Cordova 2.6.0 (backwards compatible to earlier versions as well)
* Started plans to adapt this plugin for use with Android, Windows Phone, and Blackberry. Other platforms to follow.
* Added an implementation that will allow for multiple buttons with multiple different payment information.
* Community contribution is welcome. Send a pull request to contribute.

### 20120409 ###
- Changed license to Apache 2.0 License
- Updated for Cordova 1.6.0 (backwards compatible to earlier versions as well)
- wrapped object in function closure (to prevent pollution of the global namespace)
- global constants are now namespaced under the global PayPal object

    e.g if it was **PayPalPaymentType.DONATION** before, it's **PayPal.PaymentType.Donation** now
        and it is also accessible under **window.plugins.paypal.PaymentType.Donation**


### 20101008 ###
* Initial release
* By default the PayPalPlugin-Host runs in ENV_NONE (offline) with a dummy PayPal ID. Change these in the Objective-C source (the code warns you in the Console)
* Only tested with ENV_NONE (verified payment success and cancel work, payment failure has NOT been tested)
* You are not using the PayPal native button - the native button when overlaid on the UIWebView does not scroll up and down with the UIWebView. It is hidden, and through the .pay() function, it is triggered. You can style the .pay() trigger with an official web button image from PayPal itself.
* See the .js file for API docs, and the PayPalPlugin-Host/www/index.html for sample code

## BUGS AND CONTRIBUTIONS ##

Patches welcome! Send a pull request. Since this is not a part of Cordova Core (which requires an Apache iCLA), this should be easier.

Post issues using the issue tab above. Thank you for your support.

## LICENSE ##

Copyright 2010-2012 Shazron Abdullah and 2013 Scott Robinson

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

