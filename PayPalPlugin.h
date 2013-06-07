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

//Properties
@property(nonatomic, retain)PayPalPayment *payment;
@property(nonatomic, assign)PayPalPaymentViewController *viewController;
@property(nonatomic, strong)NSString *customerEMail;
@property(nonatomic, strong)NSString *customerPhoneCountryCode;
@property(nonatomic, strong)NSString *customerPhoneNumber;
@property(nonatomic, strong)NSString *payerID;
@property(nonatomic, strong)NSString *clientID;

//*********//
//**Setup**//
//*********//



//Required
- (void)setRequired:(CDVInvokedUrlCommand *)command;

//Optional
- (void)setOptionalPayerID:(CDVInvokedUrlCommand *)command;

//Optional
- (void)setOptionalDefaults:(CDVInvokedUrlCommand *)command;

//Optional
- (void)prepareForPayment:(CDVInvokedUrlCommand *)command;

//Optional
- (void)preconnectToServer:(CDVInvokedUrlCommand *)command;

//************************//
//** Payment Processing **//
//************************//

//Required
- (void)pay:(CDVInvokedUrlCommand *)command;

//Required
- (void)payPalPaymentDidComplete:(PayPalPayment *)completedPayment;

//Required
- (void)payPalPaymentDidCancel;


@end
