//
//  PaypalPlugin.h
//  Paypal Plugin for PhoneGap
//
//  Originally by shazron on 10-10-08.
//  Updated by Scott Robinson 04-28-2013.
//  Copyright 2010-2012 Shazron Abdullah and 2013 Scott Robinson. All rights reserved.

#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>
#import "PayPal.h"

@interface PaypalPaymentInfo : NSObject
{
	NSString* paymentCurrency;
	NSString* paymentAmount;
	NSString* itemDesc;
	NSString* recipient;
	NSString* merchantName;
}

@property (nonatomic, copy) NSString* paymentCurrency;
@property (nonatomic, copy) NSString* paymentAmount;
@property (nonatomic, copy) NSString* itemDesc;
@property (nonatomic, copy) NSString* recipient;
@property (nonatomic, copy) NSString* merchantName;

@end


@interface PaypalPlugin : CDVPlugin<PayPalMEPDelegate> {
	UIButton* paypalButton;
	PaypalPaymentInfo* paymentInfo;
}

@property (nonatomic, retain) UIButton* paypalButton;
@property (nonatomic, retain) PaypalPaymentInfo* paymentInfo;

- (void) prepare:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
- (void) pay:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
- (void) setPaymentInfo:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;

- (void) payWithPaypal;
@end
