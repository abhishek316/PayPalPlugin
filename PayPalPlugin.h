//
//  PayPalPlugin.h
//  paypalplugin
//
//  Created by Scott Robinson on 6/5/13.
//
//

#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>
#import "PayPalMobile/PayPalMobile.h"

@interface PayPalPlugin : CDVPlugin<PayPalPaymentDelegate>

- (IBAction)pay:(id)sender;

- (void)payPalPaymentDidComplete:(PayPalPayment *)completedPayment;

- (void)payPalPaymentDidCancel;

-(void)verifyCompletedPayment:(PayPalPayment *)completedPayment;

- (void)viewWillAppear:(BOOL)animated;
@end
