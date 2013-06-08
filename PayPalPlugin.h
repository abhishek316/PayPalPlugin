//
//  PayPalPlugin.h
//  iOS Pay Pal Plugin
//
//  Created by Scott Robinson on 6/5/13.
//
//  Note: DO NOT MODIFY THIS FILE

#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>
#import "PayPalMobile.h"

@interface PayPalPlugin : CDVPlugin<PayPalPaymentDelegate>

- (void)preconnect:(CDVInvokedUrlCommand *)command;

- (void)makePayment:(CDVInvokedUrlCommand *)command;

- (void)payPalPaymentDidComplete:(PayPalPayment *)completedPayment;

- (void)payPalPaymentDidCancel;

@end
