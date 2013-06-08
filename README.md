# PhoneGap PayPal-Plugin #

by: Scott Robinson<br>
@SnareChops<br>
snare_chops@yahoo.com

###Need Support?###

Create a new issue and leave a description of your promblem or request.

## INSTALLATION INSTRUCTIONS ##

### iOS Installation ###
Using this plugin requires [Cordova](http://github.com/apache/incubator-cordova-ios) and the PayPal-iOS-SDK (included in this Repo).

1. Make sure your Cordova Xcode project has been [updated for Cordova 2.6.0](https://github.com/apache/incubator-cordova-ios/blob/master/guides/Cordova%20Plugin%20Upgrade%20Guide.md)
2. Add the "PayPalMobile" folder to your project (put in a suitable location under your project, then drag and drop it in)
3. Add the .h and .m files to your Plugins folder in your project (as a Group "yellow folder" not a Reference "blue folder")
4. Add the .js files to your "www" folder on disk, and add reference(s) to the .js files as &lt;script&gt; tags in your html file(s)
5. In **config.xml** under the **Plugins** section, add an idential key and value of **"PayPalPlugin"**
6. Make sure you check the **"RELEASE NOTES"** section below!

## USAGE INSTRUCTIONS ##

### Version 2.0b (beta release) ###
* **Note** - This is a COMPLETE re-write from the previous PayPalPlugin for iOS. If you were using the previous versions please remove all files, libraries and configuration settings and follow the instructions below.

I have tried to make this plugin as simple and as hands-off as I could so that users can spend more time developing their application and less time trying to get the dumb plugin's to work *(I've been there too)*. So with that said if you have ANY issues or need help please create an issue above and your feedback will help make this beta release a solid and working, simple to use, plugin!

#### Step-by-step instructions: ####

1. Follow the installation instructions above for your particular device
2. *(Optional)* In your javascript where you display the button or option for the user to make a payment with paypal call the following function: 
    
    `PayPalPlugin.preconnectToPaymentServers(<success>, <fail>, <environment>);`
    
    a. `<success>` - *function* - A javascript callback you would like called if Cordova successfully called the native Objective-C code *(Recommend you pass in `success` for the included generic success callback)*
    
    b. `<fail>` - *function* - A javascript callback you would like called if Cordova fails to call the native Objective-C code *(Recommend you pass in `fail` for the included generic fail callback)*
    
    c. `<environment>` - *string* - The environment you would like the plugin to run in. Options are: `"NoNetwork"`, `"Sandbox"`, and `"Production"`

3. In your javascript where you would like the PayPal interface to display *(Recommend a 'Checkout' or 'Pay Now' button)* call the following function:

    `PayPalPlugin.makePayment(<success>, <fail>, <environment>, <amount>, <currencyCode>, <shortDescription>,`
    `                                       <payerId>, <payerEmail>, <payerPhoneCountryCode>, <payerPhone>);`
    
    a. `<success>` - *function* - A javascript callback you would like called if Cordova successfully called the native Objective-C code *(Recommend you pass in `success` for the included generic success callback)*

    b. `<fail>` - *function* - A javascript callback you would like called if Cordova fails to call the native Objective-C code *(Recommend you pass in `fail` for the included generic fail callback)*

    c. `<environment>` - *string* - The environment you would like the plugin to run in. Options are: `"NoNetwork"`, `"Sandbox"`, and `"Production"`
    
    d. `<amount>` - *float* - The payment amount to be charged. *(If this is not a valid amount the plugin will call the callback function `PayPalPlugin.NotProcessable()`. See below for details)*

    e. `<currencyCode>` - *string* - The currency that the amount is in. Example `"USD"` *Note: - The PayPal Library used in this version currently only supports US Payments.*

    f. `<shortDescription>` - *string* - A description that will be displayed to the user on the payment screen.

    g. `<payerId>` - *string* or `null` - An id of any kind that you give the user. This allows the PayPal library to save the card information for easier future payments. *(Recommed an email or some other identifier you assign them, CAN be null)*

    h. `<payerEmail>` - *string* or `null` - The user's email.

    i. `<payerPhoneCountryCode>` - *string* or `null` - The customer's phone country code. *Example: `"1"` for US and Canada*

    j. `<payerPhone>` - *string* or `null` - The customer's phone number.

4. In your app's *.plist* file add the following two entries *(This file will be called __YourAppName__-Info.plist)*
    
    a. `ClientID` - *String* - *(Paste your client ID from http://sandbox.paypal.com for Sandbox testing or your Client ID from http://paypal.com for Production)*

    b. `ClientEMail` - *String* - *(Enter your email address for your mock businness from http://sandbox.paypal.com for Sandbox testing or your email address for you actuall account for Production)*
    
5. In `PayPalPlugin.js` you will find the following functions. Add any implementation to them that you see fit.

    a. `function success()` - The incuded success callback for the Cordova call to the native Objective-C code.
    
    b. `function fail()` - The included fail callback for the Cordova call to the native Objective-C code.
    
    c. `payPalPaymentDidComplete` - This gets called when the payment with the PayPal interface is complete. The JSON object `confirmation` that is returned should be sent to your server and sent to PayPal for payment validation
    
    d. `payPalPaymentDidCancel` - This gets called when the payment with the PayPal interface is cancelled.
    
    e. `NotProcessable` - This gets called when the payment amount that is sent with the `PayPalPlugin.makePayment()` method is unable to be processed.

6. You're done. Test and enjoy.

## RELEASE NOTES ##

### 20130608 ###
* Complete re-write of the plugin to use the new PayPal-iOS-SDK *(PayPal has deprecated the MPL library that this plugin used to use.)*
* Note from PayPal: *PayPal is replacing the Mobile Payments Libraries (MPL) with the PayPal iOS SDK. The PayPal iOS SDK is currently available in the US, with more country support coming soon. US developers should upgrade now for more features and a better mobile experience.*
* Existing users wishing to update to this version will need to remove all of the old PayPalPlugin files including the `PayPal_MobilePayments_Library` from their existing projects and replace it with the new files in this release.
* Due to the new Library and architecture the method names, functions, variables, enumerators, and any other old implementation code that you may have had will need to be replaced with the new functions.

## FUTURE RELEASE PLANS ##
* According to the PayPal-iOS-SDK documentation all payments should be verified by sending a call from your app to your server, then to the PayPal server for verification of a valid and genuine payment. I will be adding in the future a companion web application that will perform this validation. *(Will be in a serarate GitHub Repository and a link will be placed in this README)*
* Android support


## LEGACY RELEASE NOTES ##

These no longer apply as the plugin has undergone a COMPLETE re-write

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

Copyright 2013 Scott Robinson

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

