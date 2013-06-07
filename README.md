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
2. Add the "PaypalMobile" folder to your project (put in a suitable location under your project, then drag and drop it in)
3. Add the .h and .m files to your Plugins folder in your project (as a Group "yellow folder" not a Reference "blue folder")
4. Add the .js files to your "www" folder on disk, and add reference(s) to the .js files as &lt;script&gt; tags in your html file(s)
5. In **Cordova.plist** (1.5.0 or greater) or **PhoneGap.plist** (1.4.1 or lesser), under the **Plugins** section, add an idential key and value of **"PaypalPlugin"**
6. Make sure you check the **"RELEASE NOTES"** section below!

## USAGE INSTRUCTIONS ##

## RELEASE NOTES ##

### 20130606 ###
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

