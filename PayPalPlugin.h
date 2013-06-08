//
//  PayPalPlugin.h
//  paypalplugin
//
//  Created by Scott Robinson on 6/5/13.
//
//

#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>
#import "PayPalMobile.h"

@interface PayPalPlugin : CDVPlugin<PayPalPaymentDelegate>

- (void)preconnect:(CDVInvokedUrlCommand *)command;

- (void)makePayment:(CDVInvokedUrlCommand *)command;

- (void)payPalPaymentDidComplete:(PayPalPayment *)completedPayment;

- (void)payPalPaymentDidCancel;

@end
